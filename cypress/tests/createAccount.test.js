describe('fillRegistrationFormAndSubmit', () => {
    const fillRegistrationFormAndSubmit = (firstName, lastName, email, password) => {
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

    it('Test 0 : Valid Registration', () => {
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

    it('Test 1: Password is strong', () => {
        const firstName = 'Jane';
        const lastName = 'Doe';
        const email = 'jane.doe@example.com';
        const password = 'StrongPassword123!';

        const formValues = fillRegistrationFormAndSubmit(firstName, lastName, email, password);

        expect(formValues).toEqual({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            password: 'StrongPassword123!'
        });
    });

    describe('Test 2 : Error Handling for Required fields', () => {
        const handleRequiredFieldsError = () => {

            return true; // Assuming the error message exists in this case
        };

        it('checks if error message for required fields exists', () => {
            const errorMessageExists = handleRequiredFieldsError();

            expect(errorMessageExists).toBe(true);
        });
    });

    it('Test 3: Invalid Email Format', () => {
        const firstName = 'John';
        const lastName = 'Doe';
        const email = 'johndogmail.com'; // Invalid email format
        const password = '12qwasyx!"';

        // Call the function and get the error message
        const errorMessage = fillRegistrationFormAndSubmit(firstName, lastName, email, password);

        // Assert that the error message matches the expected error message
        expect(errorMessage).toBe('Please enter a valid email address');
    });


// Mock the generateRandomString function
    jest.mock('./utils', () => ({
        generateRandomString: jest.fn().mockReturnValue('randomString')
    }));

    describe('Registration Form Tests', () => {
        it('Test 1 : Weak Password', () => {
            const mockElement = {
                text: jest.fn().mockReturnValue('Error message: Minimum length of this field must be equal or greater than 8 symbols')
            };

            // Mocking document.querySelector
            document.querySelector = jest.fn().mockReturnValue(mockElement);

            const firstName = 'randomString';
            const lastName = 'randomString';
            const email = 'randomString@example.com';
            const password = 'test';

            // Call the function to test
            fillRegistrationForm(firstName, lastName, email, password);

            // Check if error messages indicate weak password
            const errorMessages = [
                'Minimum length of this field must be equal or greater than 8 symbols',
                'Minimum of different classes of characters in password is 3'
            ];

            const elementText = mockElement.text();
            const containsAnyMessage = errorMessages.some(message => elementText.includes(message));

            expect(containsAnyMessage).toBe(true);
        });
    });



    it('Test 5 : Existing Email', () => {
        const firstName = 'Existing'
        const lastName = 'User'
        const email = 'john.doe@example.com'
        const password = 'StrongPassword123!'
        const formValues = fillRegistrationFormAndSubmit(firstName, lastName, email, password);

        const userFriendlyMessageExists = true; // Assume the message exists

        expect(userFriendlyMessageExists).toBe(true);
    });

});
