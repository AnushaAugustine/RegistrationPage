describe('fillRegistrationForm', () => {
    const fillRegistrationForm = (firstName, lastName, email, password) => {
        // Your implementation here
        // This function could interact with the DOM or make network requests
        // For simplicity in this example, it just returns the provided values
        return {
            firstName,
            lastName,
            email,
            password
        };
    };

    describe('Password Strength', () => {
        it('should return "Strong" or "Very Strong" for a strong password', () => {
            // Mock the function directly inside the test
            const fillRegistrationForm = jest.fn((firstName, lastName, email, password) => {
                // Check password strength and return a corresponding message
                if (password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
                    return 'Very Strong';
                } else if (password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
                    return 'Strong';
                } else {
                    return 'Weak';
                }
            });

            const password = 'Strong';
            const strength = fillRegistrationForm('John', 'Doe', 'test@example.com', password);
            expect(strength).toMatch("Strong");
        });

        it('should return null for a weak password', () => {
            // Mock the function directly inside the test
            const fillRegistrationForm = jest.fn((firstName, lastName, email, password) => {
                // Return null for weak passwords
                return null;
            });

            const password = 'weakpassword';
            const strength = fillRegistrationForm('John', 'Doe', 'test@example.com', password);
            expect(strength).toMatch("Weak");
        });
    });

});

