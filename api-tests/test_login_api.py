import requests
import pytest

BASE_URL = "https://easecommerce.in/api/v2/login"
CREDENTIALS = {
    "username": "demouser@easecommerce.in",
    "password": "cE7iQPP^"
}

def test_login_and_extract_token():
    response = requests.post(BASE_URL, json=CREDENTIALS)
    assert response.status_code == 201, f"Login failed: {response.status_code} - {response.text}"

    data = response.json()
    print("Login response:", data)

    # Look for the token at the top level if not inside "data"
    token = data.get("token") or (data.get("data", {}).get("token"))

    assert token, "Token not found in login response"

    with open("token.txt", "w") as f:
        f.write(token)

    print(f"Token saved: {token}")
