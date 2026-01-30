// Disposable Email Domains
const DISPOSABLE_DOMAINS = [
    'tempmail.com',
    'temp-mail.org',
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com',
    'throwaway.email',
    'yopmail.com',
    'maildrop.cc',
    'spam4.me',
    'fakeinbox.com'
];

// Country Phone Codes
const COUNTRY_PHONE_CODES = {
    'USA': '+1',
    'Canada': '+1',
    'India': '+91',
    'UK': '+44',
    'Australia': '+61'
};

// Validation Functions
const Validator = {
    /**
     * Validate First Name
     */
    validateFirstName: function(value) {
        if (value.trim() === '') {
            return { valid: false, message: 'First Name is required' };
        }
        if (value.length < 2) {
            return { valid: false, message: 'First Name must be at least 2 characters' };
        }
        if (!/^[a-zA-Z\s'-]+$/.test(value)) {
            return { valid: false, message: 'First Name can only contain letters, spaces, hyphens, and apostrophes' };
        }
        return { valid: true, message: '' };
    },

    /**
     * Validate Last Name
     */
    validateLastName: function(value) {
        if (value.trim() === '') {
            return { valid: false, message: 'Last Name is required' };
        }
        if (value.length < 2) {
            return { valid: false, message: 'Last Name must be at least 2 characters' };
        }
        if (!/^[a-zA-Z\s'-]+$/.test(value)) {
            return { valid: false, message: 'Last Name can only contain letters, spaces, hyphens, and apostrophes' };
        }
        return { valid: true, message: '' };
    },

    /**
     * Validate Email
     */
    validateEmail: function(value) {
        if (value.trim() === '') {
            return { valid: false, message: 'Email is required' };
        }

        // Basic email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }

        // Check for disposable domain
        const domain = value.split('@')[1].toLowerCase();
        if (DISPOSABLE_DOMAINS.includes(domain)) {
            return { valid: false, message: 'Disposable email domains are not allowed' };
        }

        return { valid: true, message: '' };
    },

    /**
     * Validate Phone Number
     */
    validatePhone: function(value, countryCode = null) {
        if (value.trim() === '') {
            return { valid: false, message: 'Phone Number is required' };
        }

        // Remove spaces, dashes, and + symbol to count only digits
        const cleanPhone = value.replace(/[\s\-+]/g, '');

        // Check if it's numeric and has valid length (7-15 digits)
        if (!/^\d{7,15}$/.test(cleanPhone)) {
            return { valid: false, message: 'Phone number must be between 7-15 digits' };
        }

        // If country is selected, validate phone code
        if (countryCode) {
            const expectedCode = COUNTRY_PHONE_CODES[countryCode];
            if (expectedCode && !value.startsWith(expectedCode) && !cleanPhone.match(/^1/)) {
                // Allow both with and without country code
                return { valid: false, message: `Phone should start with ${expectedCode} for ${countryCode}` };
            }
        }

        return { valid: true, message: '' };
    },

    /**
     * Validate Age
     */
    validateAge: function(value) {
        if (value === '') {
            return { valid: true, message: '' }; // Age is optional
        }
        if (isNaN(value) || value < 18 || value > 120) {
            return { valid: false, message: 'Age must be between 18 and 120' };
        }
        return { valid: true, message: '' };
    },

    /**
     * Validate Gender
     */
    validateGender: function() {
        const selected = document.querySelector('input[name="gender"]:checked');
        if (!selected) {
            return { valid: false, message: 'Please select a gender' };
        }
        return { valid: true, message: '' };
    },

    /**
     * Validate Country
     */
    validateCountry: function(value) {
        if (value === '') {
            return { valid: false, message: 'Country is required' };
        }
        return { valid: true, message: '' };
    },

    /**
     * Validate State
     */
    validateState: function(value) {
        if (value === '') {
            return { valid: false, message: 'State/Province is required' };
        }
        return { valid: true, message: '' };
    },

    /**
     * Validate City
     */
    validateCity: function(value) {
        if (value === '') {
            return { valid: false, message: 'City is required' };
        }
        return { valid: true, message: '' };
    },

    /**
     * Validate Password
     */
    validatePassword: function(value) {
        if (value === '') {
            return { valid: false, message: 'Password is required' };
        }
        if (value.length < 8) {
            return { valid: false, message: 'Password must be at least 8 characters' };
        }
        return { valid: true, message: '' };
    },

    /**
     * Validate Confirm Password
     */
    validateConfirmPassword: function(value, password) {
        if (value === '') {
            return { valid: false, message: 'Confirm Password is required' };
        }
        if (value !== password) {
            return { valid: false, message: 'Passwords do not match' };
        }
        return { valid: true, message: '' };
    },

    /**
     * Validate Terms & Conditions
     */
    validateTerms: function() {
        const checked = document.getElementById('terms').checked;
        if (!checked) {
            return { valid: false, message: 'You must agree to Terms & Conditions' };
        }
        return { valid: true, message: '' };
    }
};

/**
 * Display Error Message
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');

    if (field) {
        field.classList.add('invalid');
        field.classList.remove('valid');
    }

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

/**
 * Clear Error Message
 */
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');

    if (field) {
        field.classList.remove('invalid');
    }

    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

/**
 * Mark Field as Valid
 */
function markFieldValid(fieldId) {
    const field = document.getElementById(fieldId);
    if (field && field.value !== '') {
        field.classList.add('valid');
        field.classList.remove('invalid');
        clearError(fieldId);
    }
}

/**
 * Real-time Validation on Input
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');

    // Do not show errors on initial load. Errors will show only after user interaction.

    // First Name
    const firstNameInput = document.getElementById('firstName');
    if (firstNameInput) {
        firstNameInput.addEventListener('blur', function() {
            const result = Validator.validateFirstName(this.value);
            if (!result.valid) {
                showError('firstName', result.message);
            } else {
                clearError('firstName');
                markFieldValid('firstName');
            }
            validateForm();
        });

        firstNameInput.addEventListener('input', function() {
            if (this.value !== '') {
                clearError('firstName');
            }
        });
    }

    // Last Name
    const lastNameInput = document.getElementById('lastName');
    if (lastNameInput) {
        lastNameInput.addEventListener('blur', function() {
            const result = Validator.validateLastName(this.value);
            if (!result.valid) {
                showError('lastName', result.message);
            } else {
                clearError('lastName');
                markFieldValid('lastName');
            }
            validateForm();
        });

        lastNameInput.addEventListener('input', function() {
            if (this.value !== '') {
                clearError('lastName');
            }
        });
    }

    // Email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const result = Validator.validateEmail(this.value);
            if (!result.valid) {
                showError('email', result.message);
            } else {
                clearError('email');
                markFieldValid('email');
            }
            validateForm();
        });

        emailInput.addEventListener('input', function() {
            if (this.value !== '') {
                clearError('email');
            }
        });
    }

    // Phone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            const countrySelect = document.getElementById('country');
            const country = countrySelect ? countrySelect.value : null;
            const result = Validator.validatePhone(this.value, country);
            if (!result.valid) {
                showError('phone', result.message);
            } else {
                clearError('phone');
                markFieldValid('phone');
            }
            validateForm();
        });

        phoneInput.addEventListener('input', function() {
            if (this.value !== '') {
                clearError('phone');
            }
        });
    }

    // Age
    const ageInput = document.getElementById('age');
    if (ageInput) {
        ageInput.addEventListener('blur', function() {
            const result = Validator.validateAge(this.value);
            if (!result.valid) {
                showError('age', result.message);
            } else {
                clearError('age');
                markFieldValid('age');
            }
            validateForm();
        });

        ageInput.addEventListener('input', function() {
            if (this.value !== '') {
                clearError('age');
            }
        });
    }

    // Gender
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    genderInputs.forEach(input => {
        input.addEventListener('change', function() {
            const result = Validator.validateGender();
            if (!result.valid) {
                showError('gender', result.message);
            } else {
                clearError('gender');
            }
            validateForm();
        });
    });

    // Country
    const countrySelect = document.getElementById('country');
    if (countrySelect) {
        countrySelect.addEventListener('change', function() {
            const result = Validator.validateCountry(this.value);
            if (!result.valid) {
                showError('country', result.message);
            } else {
                clearError('country');
                markFieldValid('country');
            }
            validateForm();
        });
    }

    // State
    const stateSelect = document.getElementById('state');
    if (stateSelect) {
        stateSelect.addEventListener('change', function() {
            if (this.value === '') {
                showError('state', 'State/Province is required');
            } else {
                clearError('state');
                markFieldValid('state');
            }
            validateForm();
        });
    }

    // City
    const citySelect = document.getElementById('city');
    if (citySelect) {
        citySelect.addEventListener('change', function() {
            if (this.value === '') {
                showError('city', 'City is required');
            } else {
                clearError('city');
                markFieldValid('city');
            }
            validateForm();
        });
    }

    // Password
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            const result = Validator.validatePassword(this.value);
            if (!result.valid) {
                showError('password', result.message);
            } else {
                clearError('password');
                markFieldValid('password');
            }
            validateForm();
        });

        passwordInput.addEventListener('input', function() {
            if (this.value !== '') {
                clearError('password');
            }
            // Validate confirm password when password changes
            const confirmPassword = document.getElementById('confirmPassword');
            if (confirmPassword.value !== '') {
                const result = Validator.validateConfirmPassword(confirmPassword.value, this.value);
                if (!result.valid) {
                    showError('confirmPassword', result.message);
                } else {
                    clearError('confirmPassword');
                }
            }
            validateForm();
        });
    }

    // Confirm Password
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            const password = document.getElementById('password').value;
            const result = Validator.validateConfirmPassword(this.value, password);
            if (!result.valid) {
                showError('confirmPassword', result.message);
            } else {
                clearError('confirmPassword');
                markFieldValid('confirmPassword');
            }
            validateForm();
        });

        confirmPasswordInput.addEventListener('input', function() {
            if (this.value !== '') {
                clearError('confirmPassword');
            }
        });
    }

    // Terms & Conditions
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', function() {
            const result = Validator.validateTerms();
            if (!result.valid) {
                showError('terms', result.message);
            } else {
                clearError('terms');
            }
            validateForm();
        });
    }

    // Form Submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        validateFormFull();
    });

    // Form Reset
    form.addEventListener('reset', function() {
        setTimeout(() => {
            const allInputs = form.querySelectorAll('input, select, textarea');
            allInputs.forEach(input => {
                input.classList.remove('valid', 'invalid');
                const errorElement = input.id + 'Error';
                const error = document.getElementById(errorElement);
                if (error) {
                    error.textContent = '';
                    error.classList.remove('show');
                }
            });
            document.getElementById('globalError').style.display = 'none';
            document.getElementById('globalSuccess').style.display = 'none';
            submitBtn.disabled = true;

            // Reset state and city selects
            const stateSelect = document.getElementById('state');
            const citySelect = document.getElementById('city');
            if (stateSelect) {
                stateSelect.innerHTML = '<option value="">Select State</option>';
                stateSelect.disabled = true;
            }
            if (citySelect) {
                citySelect.innerHTML = '<option value="">Select City</option>';
                citySelect.disabled = true;
            }
        }, 0);
    });
});

/**
 * Validate Single Field
 */
function validateField(fieldName) {
    let result;

    switch (fieldName) {
        case 'firstName':
            result = Validator.validateFirstName(document.getElementById('firstName').value);
            break;
        case 'lastName':
            result = Validator.validateLastName(document.getElementById('lastName').value);
            break;
        case 'email':
            result = Validator.validateEmail(document.getElementById('email').value);
            break;
        case 'phone':
            const country = document.getElementById('country').value;
            result = Validator.validatePhone(document.getElementById('phone').value, country);
            break;
        case 'age':
            result = Validator.validateAge(document.getElementById('age').value);
            break;
        case 'gender':
            result = Validator.validateGender();
            break;
        case 'country':
            result = Validator.validateCountry(document.getElementById('country').value);
            break;
        case 'state':
            result = Validator.validateState(document.getElementById('state').value);
            break;
        case 'city':
            result = Validator.validateCity(document.getElementById('city').value);
            break;
        case 'password':
            result = Validator.validatePassword(document.getElementById('password').value);
            break;
        case 'confirmPassword':
            result = Validator.validateConfirmPassword(
                document.getElementById('confirmPassword').value,
                document.getElementById('password').value
            );
            break;
        case 'terms':
            result = Validator.validateTerms();
            break;
        default:
            return true;
    }

    if (!result.valid) {
        showError(fieldName, result.message);
        return false;
    } else {
        clearError(fieldName);
        return true;
    }
}

/**
 * Validate Entire Form (Live)
 */
function validateForm() {
    const fields = [
        'firstName', 'lastName', 'email', 'phone', 'gender',
        'country', 'state', 'city', 'password', 'confirmPassword', 'terms'
    ];

    let allValid = true;

    fields.forEach(field => {
        const fieldElement = document.getElementById(field) || document.querySelector(`input[name="${field}"]`);

        // Skip validation for optional fields that are empty
        if (!fieldElement) return;

        let isValid = true;

        if (field === 'gender') {
            isValid = document.querySelector('input[name="gender"]:checked') !== null;
        } else if (field === 'terms') {
            isValid = document.getElementById('terms').checked;
        } else if (fieldElement.value.trim() !== '') {
            isValid = validateField(field);
        } else if (field === 'firstName' || field === 'lastName' || field === 'email' ||
            field === 'phone' || field === 'gender' || field === 'country' ||
            field === 'state' || field === 'city' || field === 'password' ||
            field === 'confirmPassword' || field === 'terms') {
            isValid = false;
        }

        if (!isValid) {
            allValid = false;
        }
    });

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = !allValid;
    return allValid;
}

/**
 * Full Form Validation (On Submit)
 */
function validateFormFull() {
    const fields = [
        'firstName', 'lastName', 'email', 'phone', 'gender',
        'country', 'state', 'city', 'password', 'confirmPassword', 'terms'
    ];

    let allValid = true;
    const errors = [];

    fields.forEach(field => {
        if (!validateField(field)) {
            allValid = false;
            const fieldElement = document.getElementById(field) || document.querySelector(`input[name="${field}"]`);
            if (fieldElement && fieldElement.id) {
                errors.push(document.getElementById(fieldElement.id + 'Error')?.textContent || field);
            }
        }
    });

    const globalError = document.getElementById('globalError');
    if (!allValid) {
        globalError.style.display = 'block';
        document.getElementById('errorMessage').textContent = 'Please correct the following errors: ' + errors.join(', ');
        globalError.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
    }

    // All validations passed, submit form
    submitForm();
}

/**
 * Submit Form
 */
function submitForm() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);

    // Log form data (for debugging)
    console.log('Form Data Submitted:', Object.fromEntries(formData));

    // Hide error message
    document.getElementById('globalError').style.display = 'none';

    // Show success message
    const globalSuccess = document.getElementById('globalSuccess');
    document.getElementById('successMessage').textContent = 'Registration Successful! Your profile has been submitted successfully.';
    globalSuccess.style.display = 'block';
    globalSuccess.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Reset form after 2 seconds
    setTimeout(() => {
        form.reset();
        globalSuccess.style.display = 'none';
        const allInputs = form.querySelectorAll('input, select, textarea');
        allInputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
    }, 2000);
}
