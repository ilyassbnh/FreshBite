function showSideBar() {
    const sideBar = document.querySelector('.sideBar')
    sideBar.style.display='block'
} 
function hideSideBar(){
    const sideBar = document.querySelector('.sideBar')
    sideBar.style.display="none"
}
// Wait for the page to load before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Select the form and its inputs
    const form = document.getElementById('contact-form');
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const comment = document.getElementById('comment');

    // Attach an event listener to the form's 'submit' event
    form.addEventListener('submit', function(e) {
        
        // Prevent the form from actually submitting
        e.preventDefault(); 
        
        // Run the validation
        let isValid = validateForm();
        
        if (isValid) {
            // If everything is valid, you would submit the form here.
            // For now, we'll just show an alert.
            console.log('Form is valid and would be submitted.');
            alert('Thank you for your message!');
            form.reset(); // Clear the form fields
            clearErrors(); // Clear any lingering error styles
        } else {
            console.log('Form is invalid. Please correct the errors.');
        }
    });

    function validateForm() {
        // Clear all previous errors before checking again
        clearErrors();
        
        let valid = true; // Assume the form is valid to start

        // Get the values from the form fields
        const nameValue = name.value.trim();
        const emailValue = email.value.trim();
        const phoneValue = phone.value.trim();
        const commentValue = comment.value.trim();

        // --- Validation Checks ---

        // 1. Check Full Name
        if (nameValue === '') {
            setError(name, 'Full name is required.');
            valid = false;
        }

        // 2. Check Email
        if (emailValue === '') {
            setError(email, 'Email is required.');
            valid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Please enter a valid email address.');
            valid = false;
        }
        
        if (phoneValue !== '' && !isValidPhone(phoneValue)) {
            setError(phone, 'Please enter a valid phone number (at least 8 digits).');
            valid = false;
        }

        if (commentValue === '') {
            setError(comment, 'A message is required.');
            valid = false;
        } else if (commentValue.length < 5) {
            setError(comment, 'Message must be at least 10 characters long.');
            valid = false;
        }
        
        return valid;
    }

    function setError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message');
        
        input.classList.add('error'); 
        errorDiv.innerText = message;
        errorDiv.style.display = 'block';
    }

    function clearErrors() {
        const errorInputs = document.querySelectorAll('.form-group .error');
        errorInputs.forEach(input => input.classList.remove('error'));
        
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.innerText = '';
            msg.style.display = 'none';
        });
    }

    function isValidEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }
    
    function isValidPhone(phone) {
        const re = /^\d{8,}$/; 
        return re.test(String(phone).replace(/\s/g, '')); 
    }

});