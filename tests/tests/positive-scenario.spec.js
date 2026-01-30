import { test, expect } from '@playwright/test';

test.describe('Positive Scenario - Complete Form Submission', () => {
    test('Should successfully submit form with all valid data', async ({ page }) => {
        // Step 1: Launch and verify page
        await page.goto('/');
        console.log(`📄 Page URL: ${page.url()}`);
        console.log(`📌 Page Title: ${await page.title()}`);

        // Step 2: Fill all form fields with valid data
        console.log('\n📝 Filling form with valid data...');

        // First and Last Name
        await page.fill('#firstName', 'John');
        console.log('✅ First Name: John');

        await page.fill('#lastName', 'Doe');
        console.log('✅ Last Name: Doe');

        // Email
        await page.fill('#email', 'john.doe@example.com');
        console.log('✅ Email: john.doe@example.com');

        // Phone
        await page.fill('#phone', '+11234567890');
        console.log('✅ Phone: +11234567890');

        // Age
        await page.fill('#age', '28');
        console.log('✅ Age: 28');

        // Gender
        await page.click('input[name="gender"][value="Male"]');
        console.log('✅ Gender: Male');

        // Address
        await page.fill('#address', '123 Main Street');
        console.log('✅ Address: 123 Main Street');

        // Country, State, City
        await page.selectOption('#country', 'USA');
        console.log('✅ Country: USA');

        await page.waitForSelector('#state:not([disabled])');
        await page.selectOption('#state', 'California');
        console.log('✅ State: California');

        await page.waitForSelector('#city:not([disabled])');
        await page.selectOption('#city', 'Los Angeles');
        console.log('✅ City: Los Angeles');

        // Password and Confirm Password (must match)
        const password = 'SecurePassword123!@';
        await page.fill('#password', password);
        console.log('✅ Password: Set');

        await page.fill('#confirmPassword', password);
        console.log('✅ Confirm Password: Matches');

        // Terms & Conditions
        await page.click('#terms');
        console.log('✅ Terms & Conditions: Checked');

        // Step 3: Verify submit button is enabled
        const submitBtn = page.locator('#submitBtn');
        await submitBtn.waitFor({ state: 'enabled' });
        console.log('✅ Submit button is enabled');

        // Step 4: Click Submit
        console.log('\n🔘 Clicking Submit button...');
        await submitBtn.click();

        // Step 5: Wait for success message
        const successAlert = page.locator('#globalSuccess');
        await successAlert.waitFor({ state: 'visible' });
        const successMessage = await successAlert.locator('#successMessage').textContent();
        console.log(`✅ Success Message: ${successMessage}`);
        expect(successMessage).toContain('Registration Successful');

        // Step 6: Verify form is reset
        console.log('\n🔄 Verifying form reset...');
        await page.waitForTimeout(2500); // Wait for form reset timeout

        const firstNameValue = await page.inputValue('#firstName');
        const lastNameValue = await page.inputValue('#lastName');
        const emailValue = await page.inputValue('#email');

        console.log(`First Name reset: ${firstNameValue === ''}`);
        console.log(`Last Name reset: ${lastNameValue === ''}`);
        console.log(`Email reset: ${emailValue === ''}`);

        expect(firstNameValue).toBe('');
        expect(lastNameValue).toBe('');
        expect(emailValue).toBe('');

        // Step 7: Capture success screenshot
        await page.screenshot({ path: 'tests/screenshots/success-state.png' });
        console.log(`\n📸 Screenshot saved: success-state.png`);
    });
});
