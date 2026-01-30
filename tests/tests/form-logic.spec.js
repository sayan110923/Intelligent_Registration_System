import { test, expect } from '@playwright/test';

test.describe('Form Logic Validation', () => {
    test('Should update dropdowns when country changes', async ({ page }) => {
        await page.goto('/');
        console.log('🌍 Testing Country → State → City dropdown chain\n');

        // Test 1: Change to USA and verify states populate
        await page.selectOption('#country', 'USA');
        await page.waitForSelector('#state:not([disabled])');
        
        const usaStates = await page.locator('#state option').count();
        console.log(`✅ USA selected: ${usaStates} states available`);
        expect(usaStates).toBeGreaterThan(1);

        // Test 2: Select state and verify cities populate
        await page.selectOption('#state', 'California');
        await page.waitForSelector('#city:not([disabled])');
        
        const caCities = await page.locator('#city option').count();
        console.log(`✅ California selected: ${caCities} cities available`);
        expect(caCities).toBeGreaterThan(1);

        // Test 3: Change country to Canada and verify states update
        await page.selectOption('#country', 'Canada');
        await page.waitForTimeout(500);

        const canadaStates = await page.locator('#state option').count();
        console.log(`✅ Canada selected: ${canadaStates} states available`);
        
        // Verify California option is gone
        const californiaOption = await page.locator('#state option[value="California"]').count();
        console.log(`✅ California option removed from Canada states: ${californiaOption === 0}`);

        // Test 4: Select Canadian state and verify cities
        await page.selectOption('#state', 'Ontario');
        await page.waitForSelector('#city:not([disabled])');
        
        const ontarioCities = await page.locator('#city option').count();
        console.log(`✅ Ontario selected: ${ontarioCities} cities available`);
    });

    test('Should validate password strength', async ({ page }) => {
        await page.goto('/');
        console.log('\n🔐 Testing Password Strength Meter\n');

        const passwordInput = page.locator('#password');
        const strengthText = page.locator('#strengthText');

        // Test 1: Weak password
        await passwordInput.fill('weak');
        await page.waitForTimeout(300);
        
        let strength = await strengthText.textContent();
        console.log(`✅ Weak password: ${strength}`);
        expect(strength).toContain('Weak');

        // Test 2: Medium password
        await passwordInput.fill('Medium123!');
        await page.waitForTimeout(300);
        
        strength = await strengthText.textContent();
        console.log(`✅ Medium password: ${strength}`);
        expect(strength).toContain('Medium');

        // Test 3: Strong password
        await passwordInput.fill('VeryStrong123!@#');
        await page.waitForTimeout(300);
        
        strength = await strengthText.textContent();
        console.log(`✅ Strong password: ${strength}`);
        expect(strength).toContain('Strong');
    });

    test('Should show error when passwords do not match', async ({ page }) => {
        await page.goto('/');
        console.log('\n❌ Testing Password Mismatch Validation\n');

        // Fill all required fields first
        await page.fill('#firstName', 'John');
        await page.fill('#lastName', 'Doe');
        await page.fill('#email', 'john@example.com');
        await page.fill('#phone', '+11234567890');
        await page.click('input[name="gender"][value="Male"]');
        await page.selectOption('#country', 'USA');
        await page.waitForSelector('#state:not([disabled])');
        await page.selectOption('#state', 'California');
        await page.waitForSelector('#city:not([disabled])');
        await page.selectOption('#city', 'Los Angeles');

        // Test: Different passwords
        await page.fill('#password', 'Password123!');
        await page.fill('#confirmPassword', 'DifferentPassword456!');

        // Trigger validation
        await page.click('#terms'); // This should trigger form validation check
        await page.waitForTimeout(500);

        // Check for error
        const confirmPasswordError = page.locator('#confirmPasswordError');
        const isVisible = await confirmPasswordError.isVisible();
        console.log(`✅ Confirm Password error visible: ${isVisible}`);

        // Verify submit button is disabled
        const submitBtn = page.locator('#submitBtn');
        expect(await submitBtn.isDisabled()).toBe(true);
        console.log('✅ Submit button is disabled due to password mismatch');

        // Now fix the password
        await page.fill('#confirmPassword', 'Password123!');
        await page.waitForTimeout(500);

        const errorVisible = await confirmPasswordError.isVisible();
        console.log(`✅ Error cleared after password match: ${!errorVisible}`);
    });

    test('Should disable submit button until all required fields are valid', async ({ page }) => {
        await page.goto('/');
        console.log('\n🚫 Testing Submit Button State\n');

        const submitBtn = page.locator('#submitBtn');

        // Initially disabled
        console.log(`✅ Button initially disabled: ${await submitBtn.isDisabled()}`);
        expect(await submitBtn.isDisabled()).toBe(true);

        // Fill fields one by one and check button state
        await page.fill('#firstName', 'John');
        await page.waitForTimeout(300);
        console.log(`Submit button after First Name: ${await submitBtn.isDisabled()}`);

        await page.fill('#lastName', 'Doe');
        await page.waitForTimeout(300);
        console.log(`Submit button after Last Name: ${await submitBtn.isDisabled()}`);

        await page.fill('#email', 'john@example.com');
        await page.waitForTimeout(300);
        console.log(`Submit button after Email: ${await submitBtn.isDisabled()}`);

        await page.fill('#phone', '+11234567890');
        await page.waitForTimeout(300);
        console.log(`Submit button after Phone: ${await submitBtn.isDisabled()}`);

        await page.click('input[name="gender"][value="Male"]');
        await page.waitForTimeout(300);
        console.log(`Submit button after Gender: ${await submitBtn.isDisabled()}`);

        await page.selectOption('#country', 'USA');
        await page.waitForSelector('#state:not([disabled])');
        await page.selectOption('#state', 'California');
        await page.waitForSelector('#city:not([disabled])');
        await page.selectOption('#city', 'Los Angeles');
        await page.waitForTimeout(300);
        console.log(`Submit button after Location: ${await submitBtn.isDisabled()}`);

        await page.fill('#password', 'Password123!@');
        await page.fill('#confirmPassword', 'Password123!@');
        await page.waitForTimeout(300);
        console.log(`Submit button after Password: ${await submitBtn.isDisabled()}`);

        await page.click('#terms');
        await page.waitForTimeout(300);
        console.log(`✅ Submit button finally enabled: ${!await submitBtn.isDisabled()}`);
        expect(await submitBtn.isDisabled()).toBe(false);
    });

    test('Should prevent disposable email addresses', async ({ page }) => {
        await page.goto('/');
        console.log('\n📧 Testing Disposable Email Validation\n');

        const emailInput = page.locator('#email');
        
        // Try disposable email
        await emailInput.fill('test@tempmail.com');
        await page.click('#firstName'); // Trigger blur
        await page.waitForTimeout(300);

        const emailError = page.locator('#emailError');
        const isVisible = await emailError.isVisible();
        console.log(`✅ Disposable email rejected: ${isVisible}`);
        expect(isVisible).toBe(true);

        const errorText = await emailError.textContent();
        console.log(`Error message: ${errorText}`);
        expect(errorText).toContain('Disposable');

        // Try valid email
        await emailInput.fill('valid@gmail.com');
        await page.click('#firstName');
        await page.waitForTimeout(300);

        const errorVisible = await emailError.isVisible();
        console.log(`✅ Valid email accepted: ${!errorVisible}`);
        expect(errorVisible).toBe(false);
    });
});
