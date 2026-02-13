import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class HenryWilkeAPITester:
    def __init__(self, base_url="https://ai-strategist-12.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, data: Dict[Any, Any] = None, headers: Dict[str, str] = None) -> tuple:
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                print(f"❌ Unsupported method: {method}")
                return False, {}

            success = response.status_code == expected_status
            response_data = {}
            
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text}

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response_data:
                    print(f"   Response: {json.dumps(response_data, indent=2, default=str)[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:300]}...")

            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": response_data
            })

            return success, response_data

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout after 10 seconds")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "TIMEOUT",
                "success": False,
                "error": "Request timeout"
            })
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "CONNECTION_ERROR",
                "success": False,
                "error": "Connection error"
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e)
            })
            return False, {}

    def test_health_check(self):
        """Test health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )

    def test_contact_form_submission_valid(self):
        """Test valid contact form submission"""
        test_data = {
            "name": "Max Mustermann",
            "email": "max.mustermann@test-company.de",
            "company": "Test Company GmbH",
            "message": "Hallo Henry, ich interessiere mich für eine strategische KI-Architektur für unser Unternehmen. Können wir ein Gespräch vereinbaren?"
        }
        
        return self.run_test(
            "Contact Form - Valid Submission",
            "POST",
            "contact",
            200,
            data=test_data
        )

    def test_contact_form_submission_minimal(self):
        """Test contact form submission with minimal data (no company)"""
        test_data = {
            "name": "Anna Schmidt",
            "email": "anna@beispiel.de",
            "message": "Ich würde gerne mehr über Ihre Arbeitsweise erfahren."
        }
        
        return self.run_test(
            "Contact Form - Minimal Data",
            "POST",
            "contact",
            200,
            data=test_data
        )

    def test_contact_form_validation_empty_name(self):
        """Test contact form validation - empty name"""
        test_data = {
            "name": "",
            "email": "test@example.com",
            "message": "This should fail due to empty name"
        }
        
        return self.run_test(
            "Contact Form - Empty Name Validation",
            "POST",
            "contact",
            422,  # Validation error
            data=test_data
        )

    def test_contact_form_validation_invalid_email(self):
        """Test contact form validation - invalid email"""
        test_data = {
            "name": "Test User",
            "email": "invalid-email",
            "message": "This should fail due to invalid email format"
        }
        
        return self.run_test(
            "Contact Form - Invalid Email Validation",
            "POST",
            "contact",
            422,  # Validation error
            data=test_data
        )

    def test_contact_form_validation_short_message(self):
        """Test contact form validation - message too short"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "Short"  # Less than 10 characters
        }
        
        return self.run_test(
            "Contact Form - Short Message Validation",
            "POST",
            "contact",
            422,  # Validation error
            data=test_data
        )

    def test_get_contact_submissions(self):
        """Test retrieving contact submissions (admin endpoint)"""
        return self.run_test(
            "Get Contact Submissions",
            "GET",
            "contact",
            200
        )

def main():
    print("🚀 Starting Henry Wilke API Backend Tests")
    print("=" * 60)
    
    # Setup
    tester = HenryWilkeAPITester()
    
    # Run basic connectivity tests
    print("\n📡 BASIC CONNECTIVITY TESTS")
    tester.test_health_check()
    tester.test_root_endpoint()
    
    # Run contact form tests
    print("\n📝 CONTACT FORM TESTS")
    tester.test_contact_form_submission_valid()
    tester.test_contact_form_submission_minimal()
    
    # Run validation tests
    print("\n🔒 VALIDATION TESTS")
    tester.test_contact_form_validation_empty_name()
    tester.test_contact_form_validation_invalid_email()
    tester.test_contact_form_validation_short_message()
    
    # Run admin endpoint test
    print("\n👨‍💼 ADMIN ENDPOINT TESTS")
    tester.test_get_contact_submissions()
    
    # Print final results
    print("\n" + "=" * 60)
    print("📊 FINAL RESULTS")
    print("=" * 60)
    print(f"Tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Tests failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%")
    
    # Print failed tests details
    failed_tests = [test for test in tester.test_results if not test['success']]
    if failed_tests:
        print(f"\n❌ FAILED TESTS ({len(failed_tests)}):")
        for test in failed_tests:
            print(f"   • {test['name']}: Expected {test['expected_status']}, got {test['actual_status']}")
    else:
        print(f"\n✅ ALL TESTS PASSED!")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())