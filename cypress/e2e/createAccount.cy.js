/*
 * Author: Anusha Augustine
 * Description: cypress automation for the signup page https://magento.softwaretestingboard.com/customer/account/create/
 */

describe('Registration Page Test Cases', () => {
    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/customer/account/create/')
    })
// Generate a random string
    function generateRandomString() {
        return Math.random().toString(36).substring(2);
    }
    // Registration form
    const fillRegistrationForm = (firstName, lastName, email, password) => {
        cy.get('#firstname').type(firstName);
        cy.get('#lastname').type(lastName);
        cy.get('#email_address').type(email);
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
    }

    // Positive test case for the Registration form
    describe('Positive Test Cases', () => {

      // Pass : All inputs are valid and correct
      // Fail : Any invalid input
      it('Test 0 : Valid Registration', () => {
           const firstName = generateRandomString();
           const lastName = generateRandomString();
           const email =  generateRandomString() +'@example.com';
           const password = 'StrongPassword123!';
           fillRegistrationForm(firstName, lastName, email, password);
           cy.get('button[class*="submit"]').click();
           cy.wait(2000);
           cy.contains('Thank you for registering with Main Website Store.'); // This indicates the successful account creation
           cy.wait(2000);
       })

        // Pass : The input password matches the criteria for Strong, Very Strong
        // Fail : If the input is a weak password
       it('Test 1: Strong password', () => {
           const firstName = generateRandomString();
           const lastName = generateRandomString();
           const email = generateRandomString() + '@example.com';
           const password = '12qwasyx!"QW';
           fillRegistrationForm(firstName, lastName, email, password);
           const passwordMessage = [
               'Strong',
               'Very Strong',
               'Medium'
           ];
           cy.get("#password-strength-meter").should('exist').then(($element) => {
               const elementText = $element.text();
               const containsAnyMessage = passwordMessage.some(message => elementText.includes(message));
               expect(containsAnyMessage).to.be.true;
           });
           cy.wait(2000);
       });

        // Pass : If all the mandatory fields are filled
        // Fail : If any mandatory fields is not filled
        it('Test 2 : Error Handling for Required fields', () => {
            cy.get('button[class*="submit"]').click();
            // When mandatory fields are not filled the page should return 'This is a required field.'
            cy.contains('This is a required field.').should('exist');
            cy.wait(2000);
          })
    });

   // Negative test case for the Registration form
   describe('Negative Test Cases', () => {

       // Pass : If the Email format is wrong (Expected failure)
       // Fail : If the page doesn't return error message
       it('Test 3 : Invalid Email Format', () => {
           const firstName = generateRandomString();
           const lastName = generateRandomString();
           const email = generateRandomString();
           const password = generateRandomString();
           fillRegistrationForm(firstName, lastName, email, password);
           cy.get('button[class*="submit"]').click();
           // when the email format is wrong the page should return 'Please enter a valid email address ...'
           cy.get("div[class='mage-error']").contains('Please enter a valid email address').should('exist')
           cy.wait(2000);

       })

       // Pass : If the input password is weak
       // Fail : If the page doesn't return error message
       it('Test 4 : Weak Password', () => {
           const firstName = generateRandomString();
           const lastName = generateRandomString();
           const email = generateRandomString() + '@example.com';
           const password = 'test';
           fillRegistrationForm(firstName, lastName, email, password);
           // Error messages indicating the password is weak
           const errorMessages = [
               'Minimum length of this field must be equal or greater than 8 symbols',
               'Minimum of different classes of characters in password is 3'
           ];

           // Check if any of the error messages exist within the #password-error element
           cy.get("#password-error").should('exist').then(($element) => {
               const elementText = $element.text();
               const containsAnyMessage = errorMessages.some(message => elementText.includes(message));
               expect(containsAnyMessage).to.be.true;
               cy.wait(2000);
           })
       })

       // Pass : If the email already exists
       // Fail : If the page doesn't return error message
       it('Test 5 : Existing Email', () => {
           const firstName = 'Anusha';
           const lastName = 'Augustine';
           const email = 'anushaaugustine1@gmail.com';
           const password = '12qwasyx!"QW';
           fillRegistrationForm(firstName, lastName, email, password);
           cy.get('button[class*="submit"]').click();
           // Error message indicating the account already exists
           cy.contains('There is already an account with this email address').should('exist');
           cy.wait(2000);
       })

       // Pass : If the input(Firstname,Lastname) is invalid (long, SQL query, html code etc.)
       // Fail : If the page doesn't return error message
       it('Test 6 : Long Input , Invalid input', () => {
           const longString = '<script>alert("XSS Attack")</script>';
           const firstName = longString;
           const lastName = longString;
           const email = generateRandomString() + '@example.com';
           const password = '12qwasyx!"QW';
           fillRegistrationForm(firstName, lastName, email, password);
           cy.get('button[class*="submit"]').click();
           cy.wait(2000);
           // Error messages indicating invalid input
           const errorMessages = [
               'not valid',
               'too many characters',
               'Invalid Form Key'
           ];
           cy.get("div[data-ui-id='message-error']").should('exist').then(($element) => {
               const elementText = $element.text();
               const containsAnyMessage = errorMessages.some(message => elementText.includes(message));
               expect(containsAnyMessage).to.be.true;
           });

       });
   });
});


