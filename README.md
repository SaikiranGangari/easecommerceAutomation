# EaseCommerce Automation Suite

This repository contains automated test scripts for the [EaseCommerce](https://easecommerce.in) platform, covering both **API testing** and **UI testing**.

---

## Tech Stack

- **API Tests** – Python 3.11+, [Pytest](https://docs.pytest.org/), [Requests](https://requests.readthedocs.io/)
- **UI Tests** – [Node.js](https://nodejs.org/), [TestCafe](https://testcafe.io/)

## Setup Instructions

### Prerequisites

- Python 3.11+
- Node.js 16+ and npm
- Chrome (or any supported browser)

---

## API Tests

### Step 1: Setup Python Environment

```bash
cd api-tests
python3 -m venv venv
source venv/bin/activate   # For Mac/Linux
# venv\Scripts\activate    # For Windows
pip install pytest requests
```

### Step 2: Run API Tests

#### 1. Login Test (Generates `token.txt`)

```bash
pytest test_login_api.py -s
```

#### 2. Warehouse API Test

```bash
pytest test_warehouse_api.py -s
```

#### 3️. Negative Test Cases

```bash
pytest test_warehouse_negative.py -s
```

---

## UI Tests (TestCafe)

### Step 1: Install Dependencies

```bash
cd ui-tests
npm install
```

> Ensure `package.json` contains:

```json
{
  "scripts": {
    "test": "testcafe chrome ui-tests/*.js"
  }
}
```

### Step 2: Run Tests

```bash
npm test
```

This will run all UI tests in the `ui-tests/` folder on **Chrome** browser.

---

## Test Coverage

### Task-1: API Automation

1. **Login API Test**
   - Sends POST request and extracts token into `token.txt`
2. **Warehouse API Test**
   - Uses token to fetch warehouse list (`group=default`)
3. **Negative Test Cases**
   - Invalid token (401/403)
   - Missing/invalid query param
   - Non-existent group

### Task-2: UI Automation (TestCafe)

1. Login test
2. Switch to Employee View
3. Task Creation with valid data
4. Form Validation for required fields
5. Negative test for missing task name/description
