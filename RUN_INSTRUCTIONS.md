# HOW TO RUN THIS PROJECT

## Quick Start (2 minutes)

### View the Form Immediately
```bash
# Just open this file in any web browser:
frontend/index.html

# Double-click it or drag it into your browser
# The form works instantly with no server needed!
```

---

## Run With Local Server (5 minutes)

### Option A: Python (Already Installed on Windows)
```bash
# In Command Prompt or PowerShell:
cd e:\Intelligent_registration_system\frontend
python -m http.server 5500

# Open browser: http://localhost:5500
```

### Option B: Node.js HTTP Server
```bash
# In Command Prompt:
cd e:\Intelligent_registration_system
npx http-server frontend -p 5500

# Open browser: http://localhost:5500
```

---

## Run Automated Tests (10 minutes)

### Step 1: Start the Server
```bash
# In Terminal/Command Prompt:
cd e:\Intelligent_registration_system
npx http-server frontend -p 5500

# Keep this terminal open!
```

### Step 2: Install Test Dependencies
```bash
# In a NEW terminal/command prompt:
cd e:\Intelligent_registration_system\tests
npm install -D @playwright/test
```

### Step 3: Run Tests
```bash
# In same terminal (tests folder):
npx playwright test

# You'll see:
# ✅ negative-scenario.spec.js
# ✅ positive-scenario.spec.js  
# ✅ form-logic.spec.js
# Total: 7 passed
```

### Step 4: View Test Report
```bash
# Still in tests folder:
npx playwright show-report

# Opens interactive HTML report in browser
```

---

## Run With Backend Server (15 minutes)

### Step 1: Install Backend Dependencies
```bash
cd e:\Intelligent_registration_system\backend
npm install
```

### Step 2: Start Backend
```bash
# In Terminal 1:
cd e:\Intelligent_registration_system\backend
npm start

# Output: ✅ Server running at http://localhost:3000
```

### Step 3: Start Frontend
```bash
# In Terminal 2:
cd e:\Intelligent_registration_system
npx http-server frontend -p 5500

# Open: http://localhost:5500
```

### Step 4: Test Form Submission
```bash
# In browser:
1. Fill all fields
2. Click Submit
3. Check: backend/registrations.json (data saved!)
```

---

## Run Everything Together (Full Stack)

### Terminal 1: Backend Server
```bash
cd e:\Intelligent_registration_system\backend
npm install
npm start
```

### Terminal 2: Frontend Server
```bash
cd e:\Intelligent_registration_system
npx http-server frontend -p 5500
```

### Terminal 3: Run Tests
```bash
cd e:\Intelligent_registration_system\tests
npm install -D @playwright/test
npx playwright test
```

### Access Points:
- **Form:** http://localhost:5500
- **Backend API:** http://localhost:3000
- **Test Report:** Run `npx playwright show-report`

---

## Test Results You'll See

### Successful Test Output:
```
 negative-scenario.spec.js (1 passed) 65ms
   ✓ Should display error when Last Name is missing
     Console Output:
     📄 Page URL: http://localhost:5500/
     📌 Page Title: Intelligent Registration System
     ❌ Error Message: Last Name is required
     🔴 Last Name field marked as invalid: true
     📸 Screenshot saved: error-state.png
     🚫 Submit button is disabled

 positive-scenario.spec.js (1 passed) 120ms
   ✓ Should successfully submit form with all valid data
     Console Output:
     📄 Page URL: http://localhost:5500/
     📌 Page Title: Intelligent Registration System
     📝 Filling form with valid data...
     ✅ First Name: John
     ✅ Last Name: Doe
     ... (more fields)
     🔘 Clicking Submit button...
     ✅ Success Message: Registration Successful!
     🔄 Verifying form reset...
     📸 Screenshot saved: success-state.png

 form-logic.spec.js (5 passed) 250ms
   ✓ Should update dropdowns when country changes
   ✓ Should validate password strength
   ✓ Should show error when passwords do not match
   ✓ Should disable submit button until all required fields are valid
   ✓ Should prevent disposable email addresses

========================== 7 passed (435ms) ==========================
```

---

## Test Artifacts

### Screenshots Generated:
```
tests/screenshots/
├── error-state.png          ← Form showing validation error
└── success-state.png        ← Form after successful submission
```

### Test Report:
```
tests/playwright-report/
├── index.html              ← Open in browser
├── data/
│   ├── test-results.json
│   └── screenshots/
```

### Open Report:
```bash
npx playwright show-report
```

---

## Verification Checklist

### ✅ Frontend Works:
- [ ] Open `frontend/index.html` - form displays
- [ ] Fill in fields - validation works
- [ ] Red errors show - green success shows
- [ ] Submit button enables/disables correctly

### ✅ Validation Works:
- [ ] Required fields validated
- [ ] Email rejects tempmail.com
- [ ] Password strength shows
- [ ] Country/State/City dropdowns update

### ✅ Tests Pass:
- [ ] All 7 test cases pass
- [ ] Screenshots captured
- [ ] Test report generates
- [ ] No errors in console

### ✅ Backend Works (if using):
- [ ] Server starts on :3000
- [ ] Frontend sends data on submit
- [ ] registrations.json file created
- [ ] Data persists

---

## Common Commands Reference

```bash
# View the form
firefox frontend/index.html

# Start frontend server
npx http-server frontend -p 5500

# Start backend server
cd backend && npm install && npm start

# Install test dependencies
cd tests && npm install -D @playwright/test

# Run all tests
npx playwright test

# Run specific test
npx playwright test negative-scenario

# Run tests with UI (interactive)
npx playwright test --ui

# Run tests with browser visible
npx playwright test --headed

# View test report
npx playwright show-report

# View test videos
npx playwright test --video=on
```

---

## Troubleshooting

### Issue: "npm command not found"
**Solution:** Install Node.js from https://nodejs.org
- Download and install
- Restart terminal
- Try again: `npx --version`

### Issue: "Port already in use"
**Solution:** 
```bash
# Use different port:
npx http-server frontend -p 8080
# Then visit: http://localhost:8080
```

### Issue: "Module not found"
**Solution:**
```bash
# Reinstall dependencies:
cd tests
npm install -D @playwright/test
```

### Issue: "Tests timeout"
**Solution:**
```bash
# Make sure server is running on :5500
npx http-server frontend -p 5500
# Keep it running while tests execute
```

### Issue: "Form not working"
**Solution:**
1. Open browser console (F12)
2. Check for red errors
3. Reload page (Ctrl+R)
4. Check file paths are correct

---

## What Happens When You Run Tests

### Before Tests:
1. HTTP server starts (http://localhost:5500)
2. Playwright launches browser (headless)
3. Navigates to form page

### During Tests:
1. **Negative Test** - Tries to submit incomplete form
2. **Positive Test** - Submits complete form
3. **Logic Tests** - Tests dropdowns, password strength, etc.
4. Captures screenshots at key moments
5. Logs detailed output to console

### After Tests:
1. Browser closes
2. Test report generated
3. Screenshots saved
4. Results summarized in terminal

---

## Expected File Structure

After running everything, you should have:

```
Intelligent-Registration-System/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── styles.css
│   │   └── responsive.css
│   └── js/
│       ├── form-validation.js
│       ├── form-handler.js
│       └── password-strength.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── registrations.json         ← Created when form submitted
│
├── tests/
│   ├── playwright.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── tests/
│   │   ├── negative-scenario.spec.js
│   │   ├── positive-scenario.spec.js
│   │   └── form-logic.spec.js
│   ├── screenshots/               ← Generated by tests
│   │   ├── error-state.png
│   │   └── success-state.png
│   ├── playwright-report/         ← Generated by tests
│   │   └── index.html
│   └── node_modules/              ← npm install
│
├── README.md
├── QUICKSTART.md
├── PROCEDURE.md
└── PROJECT_SUMMARY.md
```

---

## Development Workflow

### When Making Changes:

#### To JavaScript/CSS:
1. Edit file
2. Save
3. Reload browser page (F5)
4. Test manually

#### To HTML:
1. Edit file
2. Reload browser
3. Test form

#### To Tests:
1. Edit test file
2. Run: `npx playwright test`
3. View report: `npx playwright show-report`

#### To Backend:
1. Edit `backend/server.js`
2. Restart server (Ctrl+C, then npm start)
3. Test API with browser

---

## Advanced Testing Options

### Debug Tests (Step Through):
```bash
npx playwright test --debug
```

### Record Test Actions:
```bash
# Record new test (shows Playwright inspector)
npx playwright codegen http://localhost:5500
```

### Test Only Specific Tests:
```bash
# Run only negative scenario
npx playwright test negative-scenario.spec.js

# Run only positive scenario
npx playwright test positive-scenario.spec.js

# Run only form-logic tests
npx playwright test form-logic.spec.js
```

### Generate Video of Tests:
```bash
# Update playwright.config.js:
# video: 'retain-on-failure'

npx playwright test
# Videos saved in test-results/ folder
```

---

## Performance Tips

### Faster Testing:
```bash
# Run tests in parallel
npx playwright test --workers=4
```

### Faster Server:
```bash
# Use Node http-server (faster than Python)
npx http-server frontend -p 5500 -c-1
```

### Smaller Downloads:
```bash
# Install minimal dependencies
npm install --omit=dev
```

---

## Deployment Quick Reference

### Deploy Frontend (Free Options):
1. **GitHub Pages** - Push to GitHub, enable Pages
2. **Netlify** - Connect repo, auto-deploys
3. **Vercel** - Similar to Netlify, very fast
4. **Surge.sh** - `npm install -g surge && surge frontend`

### Deploy Backend (Free Options):
1. **Replit** - Free Node.js hosting
2. **Railway.app** - Easy deployment
3. **Fly.io** - Docker-based
4. **Heroku** - (now paid, but good option)

---

## Getting Help

### If Something Doesn't Work:

1. **Check Documentation:**
   - Read `README.md` (comprehensive)
   - Check `QUICKSTART.md` (common questions)
   - Review `PROCEDURE.md` (detailed steps)

2. **Check Browser Console:**
   - Press F12
   - Click Console tab
   - Look for red error messages

3. **Check Test Output:**
   - Run: `npx playwright test`
   - Read console output
   - Check `playwright-report/`

4. **Check Network:**
   - Press F12
   - Click Network tab
   - Look for failed requests
   - Check response codes

---

## Summary of Commands

| Goal | Command |
|------|---------|
| View form | `firefox frontend/index.html` |
| Start server | `npx http-server frontend -p 5500` |
| Install tests | `cd tests && npm install -D @playwright/test` |
| Run tests | `npx playwright test` |
| View report | `npx playwright show-report` |
| Start backend | `cd backend && npm start` |
| Test in UI mode | `npx playwright test --ui` |
| Debug tests | `npx playwright test --debug` |

---

## Next Steps

1. **Run the form:** Open `frontend/index.html`
2. **Test manually:** Fill form and check validation
3. **Run automation:** `npx playwright test`
4. **View results:** `npx playwright show-report`
5. **Read docs:** Check `README.md` for details

---

**You're all set! Start with the form and enjoy testing! 🚀**
