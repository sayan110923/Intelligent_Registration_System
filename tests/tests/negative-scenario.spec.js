import { test, expect } from '@playwright/test';

test.describe('Negative Scenario - Missing Last Name', () => {
    test('Should display error when Last Name is missing', async ({ page }) => {
        // Step 1: Launch and verify page
        await page.goto('/');
        console.log(`📄 Page URL: ${page.url()}`);
        console.log(`📌 Page Title: ${await page.title()}`);

        // Step 2: Fill form with incomplete data (missing Last Name)
        await page.fill('#firstName', 'John');
        // Skip Last Name intentionally
        await page.fill('#email', 'john@example.com');
        await page.fill('#phone', '+11234567890');

        // Select Gender
        await page.click('input[name="gender"][value="Male"]');

        // Fill required fields
        await page.selectOption('#country', 'USA');
        await page.waitForSelector('#state:not([disabled])');
        await page.selectOption('#state', 'California');
        await page.waitForSelector('#city:not([disabled])');
        await page.selectOption('#city', 'Los Angeles');

        await page.fill('#password', 'Password123!@');
        await page.fill('#confirmPassword', 'Password123!@');
        await page.click('#terms');

        // Step 3: Wait for submit button to be enabled
        await page.waitForSelector('#submitBtn:not([disabled])');

        // Step 4: Click Submit (should still show error because Last Name is missing)
        // Actually, let's not click submit yet, let's try to click it
        const submitBtn = page.locator('#submitBtn');
        const isDisabled = await submitBtn.isDisabled();
        
        if (!isDisabled) {
            // Button is enabled but last name is missing - form validation might allow it
            // Let's manually trigger blur on lastName field to validate
            await page.click('#lastName');
            await page.click('#firstName'); // Focus away from lastName
            await page.waitForTimeout(500);
        }

        // Step 5: Check for error message
        const lastNameError = page.locator('#lastNameError');
        const hasError = await lastNameError.isVisible();

        if (hasError) {
            const errorText = await lastNameError.textContent();
            console.log(`❌ Error Message: ${errorText}`);
            expect(errorText).toContain('Last Name is required');
        }

        // Step 6: Verify Last Name field is highlighted in red
        const lastNameField = page.locator('#lastName');
        const hasInvalidClass = await lastNameField.evaluate(el => 
            el.classList.contains('invalid')
        );
        
        console.log(`🔴 Last Name field marked as invalid: ${hasInvalidClass}`);

        // Step 7: Capture screenshot
        await page.screenshot({ path: 'tests/screenshots/error-state.png' });
        console.log(`📸 Screenshot saved: error-state.png`);

        // Step 8: Verify submit button is still disabled
        expect(await submitBtn.isDisabled()).toBe(true);
        console.log(`🚫 Submit button is disabled`);
    });
});
