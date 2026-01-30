/**
 * Password Strength Meter
 * Evaluates password strength and displays real-time feedback
 */

function calculatePasswordStrength(password) {
    let strength = 0;

    // Length checks
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;

    // Character variety checks
    if (/[a-z]/.test(password)) strength += 1; // lowercase
    if (/[A-Z]/.test(password)) strength += 1; // uppercase
    if (/[0-9]/.test(password)) strength += 1; // numbers
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1; // special characters

    // Return strength level
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
}

// Initialize password strength meter
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            if (this.value.length === 0) {
                // Reset
                strengthMeter.className = 'strength-meter';
                strengthMeter.innerHTML = '';
                strengthText.textContent = 'Strength: Weak';
                strengthText.className = 'strength-text';
                return;
            }

            const strength = calculatePasswordStrength(this.value);

            // Clear previous fill
            strengthMeter.innerHTML = '';

            // Create fill element
            const fill = document.createElement('div');
            fill.className = `strength-meter-fill ${strength}`;
            strengthMeter.appendChild(fill);

            // Update text
            strengthText.textContent = `Strength: ${strength.charAt(0).toUpperCase() + strength.slice(1)}`;
            strengthText.className = `strength-text ${strength}`;
        });
    }

    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function(e) {
            e.preventDefault();
            const passwordInput = document.getElementById('password');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.textContent = '🚫';
            } else {
                passwordInput.type = 'password';
                this.textContent = '👁️';
            }
        });
    }

    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function(e) {
            e.preventDefault();
            const confirmPasswordInput = document.getElementById('confirmPassword');
            if (confirmPasswordInput.type === 'password') {
                confirmPasswordInput.type = 'text';
                this.textContent = '🚫';
            } else {
                confirmPasswordInput.type = 'password';
                this.textContent = '👁️';
            }
        });
    }
});
