"""
Public API Tests for Henry Wilke Portfolio
Tests for: GET /api/health, POST /api/contact, POST /api/whitepaper/download
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestHealthEndpoint:
    """Health check endpoint tests"""
    
    def test_health_returns_200(self):
        """GET /api/health returns 200 with healthy status"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("status") == "healthy", "Status should be 'healthy'"
        assert "service" in data, "Response should contain 'service'"
    
    def test_root_endpoint(self):
        """GET /api/ returns welcome message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "message" in data, "Response should contain 'message'"


class TestContactForm:
    """Contact form submission tests"""
    
    def test_contact_submission_success(self):
        """POST /api/contact with valid data returns 200"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"TEST_Contact_{unique_id}",
            "email": f"test_{unique_id}@example.com",
            "message": "This is a test message with at least 10 characters for validation"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data, "Response should contain 'id'"
        assert data["name"] == payload["name"], "Name should match"
        assert data["email"] == payload["email"], "Email should match"
        assert data["status"] == "new", "Status should be 'new'"
        assert "created_at" in data, "Response should contain 'created_at'"
    
    def test_contact_with_company(self):
        """POST /api/contact with optional company field"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"TEST_Contact_Company_{unique_id}",
            "email": f"test_company_{unique_id}@example.com",
            "company": "Test Company GmbH",
            "message": "This is a test message with company information included"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data["company"] == payload["company"], "Company should match"
    
    def test_contact_missing_name(self):
        """POST /api/contact without name returns 422"""
        payload = {
            "email": "test@example.com",
            "message": "This is a test message"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
    
    def test_contact_invalid_email(self):
        """POST /api/contact with invalid email returns 422"""
        payload = {
            "name": "Test User",
            "email": "invalid-email",
            "message": "This is a test message"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
    
    def test_contact_short_message(self):
        """POST /api/contact with message < 10 chars returns 422"""
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "Short"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
    
    def test_contact_short_name(self):
        """POST /api/contact with name < 2 chars returns 422"""
        payload = {
            "name": "A",
            "email": "test@example.com",
            "message": "This is a valid test message"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"


class TestWhitepaperDownload:
    """Whitepaper download form tests"""
    
    def test_whitepaper_download_success(self):
        """POST /api/whitepaper/download with valid data returns download URL"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "email": f"test_wp_{unique_id}@example.com",
            "name": f"TEST_Whitepaper_{unique_id}",
            "company": "Test Company"
        }
        
        response = requests.post(f"{BASE_URL}/api/whitepaper/download", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data.get("success") == True, "Response should indicate success"
        assert "download_url" in data, "Response should contain 'download_url'"
        assert "message" in data, "Response should contain 'message'"
        assert data["download_url"].startswith("https://"), "Download URL should be HTTPS"
    
    def test_whitepaper_download_email_only(self):
        """POST /api/whitepaper/download with only email (name/company optional)"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "email": f"test_wp_minimal_{unique_id}@example.com"
        }
        
        response = requests.post(f"{BASE_URL}/api/whitepaper/download", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data.get("success") == True, "Response should indicate success"
    
    def test_whitepaper_download_invalid_email(self):
        """POST /api/whitepaper/download with invalid email returns 422"""
        payload = {
            "email": "not-an-email"
        }
        
        response = requests.post(f"{BASE_URL}/api/whitepaper/download", json=payload)
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
    
    def test_whitepaper_download_missing_email(self):
        """POST /api/whitepaper/download without email returns 422"""
        payload = {
            "name": "Test User"
        }
        
        response = requests.post(f"{BASE_URL}/api/whitepaper/download", json=payload)
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
