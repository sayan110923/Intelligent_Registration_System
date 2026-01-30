/**
 * Registration System - Backend Server
 * Express.js server to handle form submissions
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data storage file
const dataFile = path.join(__dirname, 'registrations.json');

// Ensure data file exists
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
}

/**
 * GET - Health Check
 */
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

/**
 * POST - Register User
 */
app.post('/api/register', (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            age,
            gender,
            address,
            country,
            state,
            city,
            password,
            confirmPassword,
            terms
        } = req.body;

        // Validation (Server-side - Double check)
        const errors = [];

        if (!firstName || firstName.trim() === '') {
            errors.push('First Name is required');
        }
        if (!lastName || lastName.trim() === '') {
            errors.push('Last Name is required');
        }
        if (!email || email.trim() === '') {
            errors.push('Email is required');
        }
        if (!phone || phone.trim() === '') {
            errors.push('Phone Number is required');
        }
        if (!gender) {
            errors.push('Gender is required');
        }
        if (!country) {
            errors.push('Country is required');
        }
        if (!state) {
            errors.push('State is required');
        }
        if (!city) {
            errors.push('City is required');
        }
        if (!password || password.trim() === '') {
            errors.push('Password is required');
        }
        if (!confirmPassword || confirmPassword.trim() === '') {
            errors.push('Confirm Password is required');
        }
        if (password !== confirmPassword) {
            errors.push('Passwords do not match');
        }
        if (!terms) {
            errors.push('Terms & Conditions must be accepted');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }

        // Create registration object
        const registration = {
            id: Date.now(),
            firstName,
            lastName,
            email,
            phone,
            age: age || null,
            gender,
            address: address || null,
            country,
            state,
            city,
            password: password, // In production, hash this!
            registeredAt: new Date().toISOString()
        };

        // Read existing data
        let registrations = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

        // Check for duplicate email
        if (registrations.some(r => r.email === email)) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Add new registration
        registrations.push(registration);

        // Save to file
        fs.writeFileSync(dataFile, JSON.stringify(registrations, null, 2));

        // Return success response
        res.status(201).json({
            success: true,
            message: 'Registration Successful! Your profile has been submitted successfully.',
            data: {
                id: registration.id,
                email: registration.email,
                registeredAt: registration.registeredAt
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
            error: error.message
        });
    }
});

/**
 * GET - Retrieve all registrations (for admin)
 */
app.get('/api/registrations', (req, res) => {
    try {
        const registrations = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        res.json({
            success: true,
            count: registrations.length,
            data: registrations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving registrations'
        });
    }
});

/**
 * GET - Retrieve single registration by ID
 */
app.get('/api/registrations/:id', (req, res) => {
    try {
        const registrations = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        const registration = registrations.find(r => r.id === parseInt(req.params.id));

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: 'Registration not found'
            });
        }

        res.json({
            success: true,
            data: registration
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving registration'
        });
    }
});

/**
 * DELETE - Delete registration by ID
 */
app.delete('/api/registrations/:id', (req, res) => {
    try {
        let registrations = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        const initialLength = registrations.length;

        registrations = registrations.filter(r => r.id !== parseInt(req.params.id));

        if (registrations.length === initialLength) {
            return res.status(404).json({
                success: false,
                message: 'Registration not found'
            });
        }

        fs.writeFileSync(dataFile, JSON.stringify(registrations, null, 2));

        res.json({
            success: true,
            message: 'Registration deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting registration'
        });
    }
});

/**
 * Static Files (Serve frontend)
 */
app.use(express.static(path.join(__dirname, '../frontend')));

/**
 * Root Route
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

/**
 * 404 Handler
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log(`📝 Registration data stored in: ${dataFile}`);
});
