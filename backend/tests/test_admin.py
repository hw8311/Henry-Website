"""
Admin Dashboard API Tests
Tests for: POST /api/admin/login, GET /api/admin/stats, GET /api/admin/contacts, 
PATCH /api/admin/contacts/{id}, GET /api/admin/leads
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_PASSWORD = "5U7I35H3XC"


class TestAdminLogin:
    """Admin login endpoint tests"""
    
    def test_admin_login_success(self):
        """POST /api/admin/login with correct password returns token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "token" in data, "Response should contain 'token'"
        assert isinstance(data["token"], str), "Token should be a string"
        assert len(data["token"]) > 0, "Token should not be empty"
    
    def test_admin_login_wrong_password(self):
        """POST /api/admin/login with wrong password returns 401"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "wrongpassword123"
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        
        data = response.json()
        assert "detail" in data, "Error response should contain 'detail'"
    
    def test_admin_login_empty_password(self):
        """POST /api/admin/login with empty password returns 401"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": ""
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"


@pytest.fixture
def auth_token():
    """Get valid admin token"""
    response = requests.post(f"{BASE_URL}/api/admin/login", json={
        "password": ADMIN_PASSWORD
    })
    if response.status_code == 200:
        return response.json().get("token")
    pytest.skip("Authentication failed - skipping authenticated tests")


@pytest.fixture
def auth_headers(auth_token):
    """Headers with Bearer token"""
    return {"Authorization": f"Bearer {auth_token}"}


class TestAdminStats:
    """Admin stats endpoint tests"""
    
    def test_get_stats_authenticated(self, auth_headers):
        """GET /api/admin/stats with valid token returns stats"""
        response = requests.get(f"{BASE_URL}/api/admin/stats", headers=auth_headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        # Verify structure
        assert "contacts" in data, "Stats should contain 'contacts'"
        assert "leads" in data, "Stats should contain 'leads'"
        assert "last_30_days" in data, "Stats should contain 'last_30_days'"
        
        # Verify contacts structure
        contacts = data["contacts"]
        assert "total" in contacts, "Contacts should have 'total'"
        assert "new" in contacts, "Contacts should have 'new'"
        assert "in_progress" in contacts, "Contacts should have 'in_progress'"
        assert "done" in contacts, "Contacts should have 'done'"
        
        # Verify leads structure
        assert "total" in data["leads"], "Leads should have 'total'"
        
        # Verify last_30_days structure
        assert "contacts" in data["last_30_days"], "last_30_days should have 'contacts'"
        assert "leads" in data["last_30_days"], "last_30_days should have 'leads'"
    
    def test_get_stats_unauthenticated(self):
        """GET /api/admin/stats without token returns 401/403"""
        response = requests.get(f"{BASE_URL}/api/admin/stats")
        assert response.status_code in [401, 403], f"Expected 401/403, got {response.status_code}"
    
    def test_get_stats_invalid_token(self):
        """GET /api/admin/stats with invalid token returns 401"""
        headers = {"Authorization": "Bearer invalid_token_here"}
        response = requests.get(f"{BASE_URL}/api/admin/stats", headers=headers)
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"


class TestAdminContacts:
    """Admin contacts endpoint tests"""
    
    def test_get_contacts_authenticated(self, auth_headers):
        """GET /api/admin/contacts with valid token returns contacts list"""
        response = requests.get(f"{BASE_URL}/api/admin/contacts", headers=auth_headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        
        # If there are contacts, verify structure
        if len(data) > 0:
            contact = data[0]
            assert "id" in contact, "Contact should have 'id'"
            assert "name" in contact, "Contact should have 'name'"
            assert "email" in contact, "Contact should have 'email'"
            assert "message" in contact, "Contact should have 'message'"
            assert "status" in contact, "Contact should have 'status'"
            assert "created_at" in contact, "Contact should have 'created_at'"
            # Verify status is valid
            assert contact["status"] in ["new", "in_progress", "done"], f"Invalid status: {contact['status']}"
    
    def test_get_contacts_unauthenticated(self):
        """GET /api/admin/contacts without token returns 401/403"""
        response = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert response.status_code in [401, 403], f"Expected 401/403, got {response.status_code}"


class TestAdminUpdateContactStatus:
    """Admin contact status update tests"""
    
    def test_update_contact_status(self, auth_headers):
        """PATCH /api/admin/contacts/{id} updates status"""
        # First get contacts to find an ID
        contacts_response = requests.get(f"{BASE_URL}/api/admin/contacts", headers=auth_headers)
        assert contacts_response.status_code == 200
        contacts = contacts_response.json()
        
        if len(contacts) == 0:
            pytest.skip("No contacts available to test status update")
        
        contact_id = contacts[0]["id"]
        original_status = contacts[0]["status"]
        
        # Determine new status (cycle through statuses)
        status_cycle = {"new": "in_progress", "in_progress": "done", "done": "new"}
        new_status = status_cycle.get(original_status, "in_progress")
        
        # Update status
        response = requests.patch(
            f"{BASE_URL}/api/admin/contacts/{contact_id}",
            json={"status": new_status},
            headers=auth_headers
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data.get("success") == True, "Response should indicate success"
        assert data.get("status") == new_status, f"Status should be {new_status}"
        
        # Verify by fetching contacts again
        verify_response = requests.get(f"{BASE_URL}/api/admin/contacts", headers=auth_headers)
        updated_contacts = verify_response.json()
        updated_contact = next((c for c in updated_contacts if c["id"] == contact_id), None)
        assert updated_contact is not None, "Contact should still exist"
        assert updated_contact["status"] == new_status, "Status should be persisted"
        
        # Restore original status
        requests.patch(
            f"{BASE_URL}/api/admin/contacts/{contact_id}",
            json={"status": original_status},
            headers=auth_headers
        )
    
    def test_update_contact_invalid_status(self, auth_headers):
        """PATCH /api/admin/contacts/{id} with invalid status returns 422"""
        # Get a contact ID
        contacts_response = requests.get(f"{BASE_URL}/api/admin/contacts", headers=auth_headers)
        contacts = contacts_response.json()
        
        if len(contacts) == 0:
            pytest.skip("No contacts available")
        
        contact_id = contacts[0]["id"]
        
        response = requests.patch(
            f"{BASE_URL}/api/admin/contacts/{contact_id}",
            json={"status": "invalid_status"},
            headers=auth_headers
        )
        assert response.status_code == 422, f"Expected 422, got {response.status_code}"
    
    def test_update_contact_not_found(self, auth_headers):
        """PATCH /api/admin/contacts/{id} with non-existent ID returns 404"""
        response = requests.patch(
            f"{BASE_URL}/api/admin/contacts/nonexistent-id-12345",
            json={"status": "done"},
            headers=auth_headers
        )
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
    
    def test_update_contact_unauthenticated(self):
        """PATCH /api/admin/contacts/{id} without token returns 401/403"""
        response = requests.patch(
            f"{BASE_URL}/api/admin/contacts/some-id",
            json={"status": "done"}
        )
        assert response.status_code in [401, 403], f"Expected 401/403, got {response.status_code}"


class TestAdminLeads:
    """Admin leads (whitepaper downloads) endpoint tests"""
    
    def test_get_leads_authenticated(self, auth_headers):
        """GET /api/admin/leads with valid token returns leads list"""
        response = requests.get(f"{BASE_URL}/api/admin/leads", headers=auth_headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        
        # If there are leads, verify structure
        if len(data) > 0:
            lead = data[0]
            assert "id" in lead, "Lead should have 'id'"
            assert "email" in lead, "Lead should have 'email'"
            assert "created_at" in lead, "Lead should have 'created_at'"
    
    def test_get_leads_unauthenticated(self):
        """GET /api/admin/leads without token returns 401/403"""
        response = requests.get(f"{BASE_URL}/api/admin/leads")
        assert response.status_code in [401, 403], f"Expected 401/403, got {response.status_code}"


class TestPublicEndpoints:
    """Verify public endpoints still work (regression test)"""
    
    def test_health_endpoint(self):
        """GET /api/health returns 200"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
    
    def test_contact_form_submission(self):
        """POST /api/contact still works"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Admin_Test_User",
            "email": "test_admin@example.com",
            "message": "This is a test message from admin testing iteration"
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data, "Response should contain 'id'"
        assert data["status"] == "new", "New contact should have 'new' status"
