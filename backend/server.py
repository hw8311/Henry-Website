from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Contact Form Model
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


# Whitepaper Download Model
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


# Routes
@api_router.get("/")
async def root():
    return {"message": "Henry Wilke API - AI System Architect"}


@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(input: ContactSubmissionCreate):
    """Submit a contact form inquiry"""
    try:
        submission = ContactSubmission(**input.model_dump())
        
        # Prepare document for MongoDB
        doc = {
            "id": submission.id,
            "name": submission.name,
            "email": submission.email,
            "company": submission.company,
            "message": submission.message,
            "created_at": submission.created_at.isoformat(),
            "status": submission.status
        }
        
        await db.contact_submissions.insert_one(doc)
        
        return ContactSubmissionResponse(
            id=doc["id"],
            name=doc["name"],
            email=doc["email"],
            company=doc["company"],
            message=doc["message"],
            created_at=doc["created_at"],
            status=doc["status"]
        )
    except Exception as e:
        logging.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Fehler beim Senden der Anfrage")


@api_router.get("/contact", response_model=List[ContactSubmissionResponse])
async def get_contact_submissions():
    """Get all contact submissions (admin endpoint)"""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    return submissions


@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "henry-wilke-api"}


@api_router.post("/whitepaper/download", response_model=WhitepaperDownloadResponse)
async def request_whitepaper_download(input: WhitepaperDownloadCreate):
    """Request whitepaper download - captures email for lead generation"""
    try:
        download = WhitepaperDownload(**input.model_dump())
        
        # Prepare document for MongoDB
        doc = {
            "id": download.id,
            "email": download.email,
            "name": download.name,
            "company": download.company,
            "whitepaper": download.whitepaper,
            "created_at": download.created_at.isoformat(),
            "source": download.source
        }
        
        await db.whitepaper_downloads.insert_one(doc)
        
        # Return the download URL
        download_url = "https://customer-assets.emergentagent.com/job_e9028209-13f7-4abf-a23f-2045f44b0be4/artifacts/p885d60c_Die%20Architektur%20der%20Effizienz.pdf"
        
        return WhitepaperDownloadResponse(
            success=True,
            download_url=download_url,
            message="Vielen Dank! Ihr Download startet gleich."
        )
    except Exception as e:
        logging.error(f"Error processing whitepaper download: {e}")
        raise HTTPException(status_code=500, detail="Fehler bei der Anfrage")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
