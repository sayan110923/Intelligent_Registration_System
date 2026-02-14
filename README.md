# Intelligent Registration System

A comprehensive, modern registration form with client-side validation, responsive design, and automated testing.

## Project Overview

This project implements a complete registration system with:
- **Interactive HTML5 Form** with professional UI/UX
- **Real-time Client-Side Validation** with visual feedback
- **Smart Validation Rules** (email domains, phone codes, password strength)
- **Responsive Design** (mobile, tablet, desktop)
- **Password Strength Meter** with dynamic feedback
- **Dependent Dropdowns** (Country → State → City)
- **Node.js/Express Backend** (optional) for form submission
- **Automated Testing** using Playwright

## Project Structure

```
Intelligent-Registration-System/
├── frontend/
│   ├── index.html                 # Main HTML form
│   ├── css/
│   │   ├── styles.css            # Core styling
│   │   └── responsive.css        # Mobile-first responsive design
│   └── js/
│       ├── form-validation.js    # Form validation logic
│       ├── form-handler.js       # Dropdown logic & form handling
│       └── password-strength.js  # Password strength meter
├── backend/
│   ├── server.js                 # Express.js backend server
│   ├── package.json              # Node dependencies
│   └── registrations.json        # Data storage (auto-created)
├── tests/
│   ├── playwright.config.js      # Playwright configuration
│   ├── tests/
│   │   ├── negative-scenario.spec.js    # Test missing fields
│   │   ├── positive-scenario.spec.js    # Test successful submission
│   │   └── form-logic.spec.js           # Test form logic
│   └── screenshots/              # Test screenshots
└── README.md                      # Documentation
```

## Features

### 1. Form Fields

#### Required Fields:
- **First Name** - Text input, 2+ characters, letters only
- **Last Name** - Text input, 2+ characters, letters only
- **Email** - Email input with disposable domain check
- **Phone** - Tel input with country code validation
- **Gender** - Radio buttons (Male, Female, Other)
- **Country** - Dropdown (USA, Canada, India, UK, Australia)
- **State** - Dynamic dropdown (updates based on country)
- **City** - Dynamic dropdown (updates based on state)
- **Password** - Password input with strength meter
- **Confirm Password** - Must match password
- **Terms & Conditions** - Checkbox

#### Optional Fields:
- **Age** - Number input (18-120)
- **Address** - Text input

### 2. Validation Features

#### Client-Side Validation:
- ✅ Real-time field validation on blur/input
- ✅ Red highlighting for invalid fields
- ✅ Inline error messages
- ✅ Submit button disabled until all required fields valid
- ✅ Global error message display
- ✅ Success message on submission

#### Smart Validation Rules:
```javascript
// Disposable Email Check
DISPOSABLE_DOMAINS = [
    'tempmail.com', '10minutemail.com', 'guerrillamail.com', etc.
]

// Phone Code Validation
COUNTRY_PHONE_CODES = {
    'USA': '+1',
    'Canada': '+1',
    'India': '+91',
    'UK': '+44',
    'Australia': '+61'
}

// Password Requirements
- Minimum 8 characters
- Strength indicator (Weak/Medium/Strong)
- Must contain uppercase, lowercase, numbers, special characters for strong
```

### 3. User Experience

#### Visual Feedback:
- Green borders for valid fields
- Red borders for invalid fields
- Color-coded password strength meter
- Eye icon to toggle password visibility
- Smooth animations and transitions
- Loading state on form submission

#### Responsive Design:
- Mobile-first approach
- Tablet layout optimization
- Desktop enhancement
- Landscape mode support
- Dark mode support

### 4. Form Logic

#### Dropdown Dependencies:
```
Country Change → States dropdown populated & enabled
State Change → Cities dropdown populated & enabled
```

Example Data:
```javascript
locationData = {
    'USA': {
        'California': ['Los Angeles', 'San Francisco', 'San Diego', ...],
        'Texas': ['Houston', 'Dallas', ...],
        ...
    },
    'Canada': {
        'Ontario': ['Toronto', 'Ottawa', ...],
        ...
    },
    ...
}
```

#### Password Strength Algorithm:
- 0-2 points = Weak (Red)
- 3-4 points = Medium (Orange)
- 5+ points = Strong (Green)

Points awarded for:
- 8+ characters: +1
- 12+ characters: +1
- 16+ characters: +1
- Lowercase letters: +1
- Uppercase letters: +1
- Numbers: +1
- Special characters: +1

## Installation & Setup

### Prerequisites:
- Node.js 14+ (for backend)
- npm or yarn
- Modern web browser
- Python/Command line tools

### Step 1: Clone/Download Project

```bash
cd Intelligent-Registration-System
```

### Step 2: Setup Frontend (HTML/CSS/JS)

No installation needed! Just open the HTML file:

**Option A: Direct File**
```bash
# Navigate to frontend folder and open index.html in browser
# File → Open or drag into browser
```

**Option B: HTTP Server (Recommended for testing)**
```bash
# Use Python built-in server
cd frontend
python -m http.server 5500

# OR use Node http-server
npx http-server frontend -p 5500
```

Then open: `http://localhost:5500`

### Step 3: Setup Backend (Optional)

```bash
# Install dependencies
cd backend
npm install

# Start server
npm start
# Server runs on http://localhost:3000

# For development (auto-reload)
npm install -g nodemon
npm run dev
```

### Step 4: Setup Automated Testing

```bash
# Install Playwright
npm install -D @playwright/test

# Install http-server globally (if not already)
npm install -g http-server

# Run tests
npx playwright test

# Run specific test file
npx playwright test tests/tests/negative-scenario.spec.js

# Run with UI
npx playwright test --ui

# Run with headed browser
npx playwright test --headed
```

## How It Works

### Frontend - Client-Side Validation Flow

```
User Input Event
     ↓
Form Validation Functions (Validator object)
     ↓
Validate Field Type (Email, Phone, etc.)
     ↓
Check Against Rules
     ↓
Display Error Message OR Mark Field Valid
     ↓
Update Submit Button State
     ↓
Enable Submit Only If All Fields Valid
```

### Backend - Form Submission Flow

```
User Clicks Submit
     ↓
Client-Side Validation Passes
     ↓
Form Data Serialized
     ↓
POST Request to /api/register
     ↓
Server-Side Validation (Double Check)
     ↓
Check Duplicate Email
     ↓
Save to registrations.json
     ↓
Return Success/Error Response
     ↓
Display Success Message & Reset Form
```

### Dropdown Chain Flow

```
User Selects Country
     ↓
onChange Event Triggered
     ↓
Fetch States for Selected Country
     ↓
Populate State Dropdown
     ↓
Enable State Dropdown
     ↓
Clear City Dropdown
     ↓
User Selects State
     ↓
Fetch Cities for Selected State
     ↓
Populate City Dropdown
     ↓
Enable City Dropdown
```

## Automation Testing Explained

### Test Scenarios

#### Test A: Negative Scenario (negative-scenario.spec.js)
```
1. Launch page and verify URL + Title
2. Fill form with incomplete data (missing Last Name)
3. Try to submit (or check validation state)
4. Verify error message displays for Last Name
5. Verify Last Name field is highlighted red
6. Verify submit button is disabled
7. Capture error-state.png screenshot
```

#### Test B: Positive Scenario (positive-scenario.spec.js)
```
1. Launch page
2. Fill ALL required fields with valid data
3. Ensure password and confirm password match
4. Check Terms & Conditions
5. Click Submit
6. Verify success message appears
7. Verify form fields are reset
8. Capture success-state.png screenshot
```

#### Test C: Form Logic (form-logic.spec.js)
```
Multiple sub-tests:

Test 1: Dropdown Chain
- Change country → verify states update
- Change state → verify cities update
- Change country again → verify dropdown resets

Test 2: Password Strength
- Weak password → shows "Weak"
- Medium password → shows "Medium"
- Strong password → shows "Strong"

Test 3: Password Mismatch
- Fill different passwords in password & confirm fields
- Verify error message appears
- Verify submit button disabled
- Fix password → error clears

Test 4: Submit Button State
- Initially disabled
- Becomes enabled only when ALL required fields valid
- Goes back to disabled if any field becomes invalid

Test 5: Disposable Email
- Try tempmail.com domain → rejected with error
- Try valid gmail.com domain → accepted
```

## Running Automation Tests

### Basic Test Execution

```bash
# Install Playwright globally
npm install -g @playwright/test

# Install dependencies in tests folder
cd tests
npm install

# Run all tests
npx playwright test

# Run specific test file
npx playwright test negative-scenario.spec.js

# Run with UI mode (interactive)
npx playwright test --ui

# Run with headed browser (see browser)
npx playwright test --headed

# Generate HTML report
npx playwright test
npx playwright show-report
```

### Password Strength (password-strength.js)

```javascript
calculatePasswordStrength(password)  // Returns 'weak', 'medium', or 'strong'
```

## CSS Classes

### Form States

```css
.invalid      /* Red border, background highlight */
.valid        /* Green border, background highlight */
.success      /* Success styling */

/* Applied to input fields dynamically */
```

## API Endpoints (Backend)

### GET /api/health
Check if server is running
```
Response: { "status": "Server is running", "timestamp": "..." }
```

### POST /api/register
Submit registration form
```
Request: { firstName, lastName, email, phone, ... }
Response: { success: true/false, message: "...", data: { id, email, registeredAt } }
```

### GET /api/registrations
Get all registrations (admin)
```
Response: { success: true, count: N, data: [...] }
```

### GET /api/registrations/:id
Get single registration
```
Response: { success: true, data: { ... } }
```

### DELETE /api/registrations/:id
Delete registration
```
Response: { success: true, message: "..." }
```

## Error Handling

### Client-Side Errors
- Display inline error messages under each field
- Red highlighting on invalid fields
- Global error alert at top of form
- Submit button disabled

### Server-Side Errors
- Validate all fields again (double validation)
- Check for duplicate emails
- Return specific error messages
- 4xx status codes for client errors
- 5xx status codes for server errors

