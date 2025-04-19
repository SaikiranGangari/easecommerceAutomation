import requests
import pytest
import os

WAREHOUSE_URL = "https://easecommerce.in/api/v2/manage/warehouse/master/all"

@pytest.fixture(scope="session")
def valid_token():
    assert os.path.exists("token.txt"), "Run login test first to generate token.txt"
    with open("token.txt", "r") as f:
        return f.read().strip()

def test_invalid_token():
    headers = {"Authorization": "Bearer invalidtoken"}
    response = requests.get(WAREHOUSE_URL, headers=headers, params={"group": "default"})
    assert response.status_code in [401, 403], f"Expected 401/403 but got {response.status_code}"

def test_missing_group_param(valid_token):
    headers = {"Authorization": f"Bearer {valid_token}"}
    response = requests.get(WAREHOUSE_URL, headers=headers)

    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"

    # Check if empty or error message
    if response.headers.get("Content-Type", "").lower().startswith("application/json"):
        data = response.json()
        assert isinstance(data, dict)
        assert "data" in data or data == {}, "Expected 'data' key or empty JSON"
    else:
        assert response.text.strip() == "", "Expected empty body or JSON"

def test_invalid_group_param(valid_token):
    headers = {"Authorization": f"Bearer {valid_token}"}
    response = requests.get(WAREHOUSE_URL, headers=headers, params={"group": "%%%invalid"})

    assert response.status_code in [200, 400], f"Unexpected status code: {response.status_code}"

def test_nonexistent_group(valid_token):
    headers = {"Authorization": f"Bearer {valid_token}"}
    response = requests.get(WAREHOUSE_URL, headers=headers, params={"group": "nonexistent123"})

    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"

    # Handle empty response gracefully
    if not response.text.strip():
        print("Response is empty as expected for nonexistent group.")
        return

    if "application/json" in response.headers.get("Content-Type", "").lower():
        data = response.json()
        assert isinstance(data, dict)
        assert "data" in data
        assert isinstance(data["data"], list)
        assert len(data["data"]) == 0, "Expected empty list for nonexistent group"
    else:
        pytest.fail("Expected JSON response but got something else.")
