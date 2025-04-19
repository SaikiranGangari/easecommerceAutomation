import requests
import pytest
import os

WAREHOUSE_URL = "https://easecommerce.in/api/v2/manage/warehouse/master/all"

@pytest.fixture(scope="session")
def token():
    assert os.path.exists("token.txt"), "Run login test first to generate token.txt"
    with open("token.txt", "r") as f:
        return f.read().strip()

def test_get_warehouse_list(token):
    headers = {"Authorization": f"Bearer {token}"}
    params = {"group": "default"}

    response = requests.get(WAREHOUSE_URL, headers=headers, params=params)
    print("Response status:", response.status_code)
    print("Response headers:", response.headers)
    print("Response text:\n", response.text)

    assert response.status_code == 200, f"Expected 200 but got {response.status_code}: {response.text}"

    content_type = response.headers.get("Content-Type", "")
    if "application/json" not in content_type.lower():
        print("Warning: Response is not JSON. It might be an empty body or plain text.")
        assert response.text.strip() == "", "Expected empty response body for no warehouses"
        return  # Test passes with empty body

    # Parse JSON only if Content-Type is correct
    try:
        data = response.json()
        assert "data" in data and isinstance(data["data"], list), "Warehouse list missing or not a list"
        print("Warehouse List:", data["data"])
    except Exception as e:
        pytest.fail(f"Failed to parse JSON: {e}")
