from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Admin config
ADMIN_PASSWORD = os.environ['ADMIN_PASSWORD']
JWT_SECRET = os.environ['JWT_SECRET']

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

security = HTTPBearer()


# --- Auth helpers ---
def create_token():
    payload = {
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=["HS256"])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Forbidden")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# --- Models ---
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = Field(default="new")


class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)


class ContactSubmissionResponse(BaseModel):
    id: str
    name: str
    email: str
    company: Optional[str]
    message: str
    created_at: str
    status: str


class WhitepaperDownload(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    name: Optional[str] = Field(None, max_length=100)
    company: Optional[str] = Field(None, max_length=200)
    whitepaper: str = Field(default="architektur-der-effizienz")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    source: str = Field(default="website")


class WhitepaperDownloadCreate(BaseModel):
    email: EmailStr
    name: Optional[str] = Field(None, max_length=100)
    company: Optional[str] = Field(None, max_length=200)


class WhitepaperDownloadResponse(BaseModel):
    success: bool
    download_url: str
    message: str


class AdminLoginRequest(BaseModel):
    password: str


class StatusUpdateRequest(BaseModel):
    status: str = Field(..., pattern="^(new|in_progress|done)$")


# --- Public Routes ---
@api_router.get("/")
async def root():
    return {"message": "Henry Wilke API - AI System Architect"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "henry-wilke-api"}


@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(input: ContactSubmissionCreate):
    try:
        submission = ContactSubmission(**input.model_dump())
        doc = {
            "id": submission.id,
            "name": submission.name,
            "email": submission.email,
            "company": submission.company,
            "message": submission.message,
            "created_at": submission.created_at.isoformat(),
            "status": submission.status,
        }
        await db.contact_submissions.insert_one(doc)
        return ContactSubmissionResponse(
            id=doc["id"], name=doc["name"], email=doc["email"],
            company=doc["company"], message=doc["message"],
            created_at=doc["created_at"], status=doc["status"],
        )
    except Exception as e:
        logging.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Fehler beim Senden der Anfrage")


@api_router.post("/whitepaper/download", response_model=WhitepaperDownloadResponse)
async def request_whitepaper_download(input: WhitepaperDownloadCreate):
    try:
        download = WhitepaperDownload(**input.model_dump())
        doc = {
            "id": download.id,
            "email": download.email,
            "name": download.name,
            "company": download.company,
            "whitepaper": download.whitepaper,
            "created_at": download.created_at.isoformat(),
            "source": download.source,
        }
        await db.whitepaper_downloads.insert_one(doc)
        download_url = os.environ['WHITEPAPER_DOWNLOAD_URL']
        return WhitepaperDownloadResponse(
            success=True, download_url=download_url,
            message="Vielen Dank! Ihr Download startet gleich.",
        )
    except Exception as e:
        logging.error(f"Error processing whitepaper download: {e}")
        raise HTTPException(status_code=500, detail="Fehler bei der Anfrage")


# --- Admin Routes ---
@api_router.post("/admin/login")
async def admin_login(req: AdminLoginRequest):
    if req.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Falsches Passwort")
    return {"token": create_token()}


@api_router.get("/admin/contacts", response_model=List[ContactSubmissionResponse])
async def admin_get_contacts(_=Depends(verify_token)):
    docs = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.patch("/admin/contacts/{contact_id}")
async def admin_update_contact_status(contact_id: str, req: StatusUpdateRequest, _=Depends(verify_token)):
    result = await db.contact_submissions.update_one(
        {"id": contact_id}, {"$set": {"status": req.status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Kontakt nicht gefunden")
    return {"success": True, "id": contact_id, "status": req.status}


@api_router.get("/admin/leads")
async def admin_get_leads(_=Depends(verify_token)):
    docs = await db.whitepaper_downloads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.get("/admin/stats")
async def admin_get_stats(_=Depends(verify_token)):
    total_contacts = await db.contact_submissions.count_documents({})
    new_contacts = await db.contact_submissions.count_documents({"status": "new"})
    in_progress = await db.contact_submissions.count_documents({"status": "in_progress"})
    done_contacts = await db.contact_submissions.count_documents({"status": "done"})
    total_leads = await db.whitepaper_downloads.count_documents({})

    # Last 30 days contacts
    thirty_days_ago = (datetime.now(timezone.utc) - timedelta(days=30)).isoformat()
    recent_contacts = await db.contact_submissions.count_documents(
        {"created_at": {"$gte": thirty_days_ago}}
    )
    recent_leads = await db.whitepaper_downloads.count_documents(
        {"created_at": {"$gte": thirty_days_ago}}
    )

    return {
        "contacts": {"total": total_contacts, "new": new_contacts, "in_progress": in_progress, "done": done_contacts},
        "leads": {"total": total_leads},
        "last_30_days": {"contacts": recent_contacts, "leads": recent_leads},
    }


# Include router and middleware
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
