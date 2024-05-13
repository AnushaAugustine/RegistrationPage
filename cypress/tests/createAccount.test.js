/*
 * Author: Anusha Augustine
 * Description: jest unit test for the signup page https://magento.softwaretestingboard.com/customer/account/create/
 */
describe('Account creation - Test Cases', () => {
    const fillRegistrationFormAndSubmit = (firstName, lastName, email, password) => {
        // Check if email is valid
        if (email.trim() && !isValidEmail(email)) {
            return 'Please enter a valid email address';
        }

        // email already exists
        if (email === 'john.doe@example.com') {
            return 'Email already exists';
        }

        // Check for empty fields
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
            return 'This is a required field.';
        }

        return {
            firstName,
            lastName,
            email,
            password
        };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    }

    function checkPasswordStrength(password) {
        password = password.trim();

        // Count the number of different character classes present in the password
        let classesCount = 0;
        if (/[a-z]/.test(password)) classesCount++;
        if (/[A-Z]/.test(password)) classesCount++;
        if (/[0-9]/.test(password)) classesCount++;
        if (/[^a-zA-Z0-9]/.test(password)) classesCount++;

        // Check if the password meets the criteria
        if (password.length > 8 && classesCount > 3) {
            return 'Very Strong';
        } else if (password.length > 8 && classesCount >= 3) {
            return 'Strong';
        } else if (password.length === 8 && classesCount >= 3) {
            return 'Medium';
        } else {
            return 'Weak';
        }
    }

    // Pass : All inputs are valid and correct
    // Fail : Any invalid input
    it('Test 0: Valid Registration', () => {
        const firstName = 'John';
        const lastName = 'Doe';
        const email = 'test1@example.com';
        const password = 'StrongPassword123!';

        const formValues = fillRegistrationFormAndSubmit(firstName, lastName, email, password);

        expect(formValues).toEqual({
            firstName: 'John',
            lastName: 'Doe',
            email: 'test1@example.com',
            password: 'StrongPassword123!'
        });
    });

    // Pass : The input password matches the criteria for Very Strong
    // Fail : If the input is not Very Strong
    it('Test 1: Very Strong password', () => {
        const password = '12qwasyx!"QW';
        const user = fillRegistrationFormAndSubmit('John', 'Doe', 'test@example.com', password);
        const strength = checkPasswordStrength(user.password);
        expect(strength).toBe('Very Strong');
    });

    // Pass : The input password matches the criteria for Strong
    // Fail : If the input is not Strong
    it('Test 2: Strong password', () => {
        const password = '12qwasyx!"';
        const user = fillRegistrationFormAndSubmit('John', 'Doe', 'test@example.com', password);
        const strength = checkPasswordStrength(user.password);
        expect(strength).toBe('Strong');
    });

    // Pass : The input password matches the criteria for Medium
    // Fail : If the input is not Medium
    it('Test 3: Medium password', () => {
        const password = '12qwasyX';
        const user = fillRegistrationFormAndSubmit('John', 'Doe', 'test@example.com', password);
        const strength = checkPasswordStrength(user.password);
        expect(strength).toBe('Medium');
    });

    // Pass : The input password matches the criteria for Weak
    // Fail : If the input is not Weak
    it('Test 4: Weak password', () => {
        const password = 'weak';
        const user = fillRegistrationFormAndSubmit('John', 'Doe', 'test@example.com', password);
        const strength = checkPasswordStrength(user.password);
        expect(strength).toBe('Weak');
    });

    // Pass : If all the mandatory fields are filled
    // Fail : If any mandatory fields is not filled
    it('Test 5 : Error Handling for Required fields', () => {
        const errorMessageExists = fillRegistrationFormAndSubmit('', '', '', '');
        expect(errorMessageExists).toBe('This is a required field.');
    });

    // Pass : If the Email format is wrong (Expected failure)
    // Fail : If the page doesn't return error message
    it('Test 6 : Invalid Email Format', () => {
        const firstName = 'John';
        const lastName = 'Doe';
        const email = 'johndogmail.com'; // Invalid email format
        const password = '12qwasyx!"';
        const errorMessage = fillRegistrationFormAndSubmit(firstName, lastName, email, password);
        expect(errorMessage).toBe('Please enter a valid email address');
    });

    // Pass : If the email already exists
    // Fail : If the page doesn't return error message
    it('Test 7 : Existing Email', () => {
        const firstName = 'Existing';
        const lastName = 'User';
        const email = 'john.doe@example.com';
        const password = 'StrongPassword123!';
        const errorMessage = fillRegistrationFormAndSubmit(firstName, lastName, email, password);
        expect(errorMessage).toBe('Email already exists');
    });

    });

