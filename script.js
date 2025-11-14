function showSideBar() {
    const sideBar = document.querySelector('.sideBar')
    sideBar.style.display='block'
} 
function hideSideBar(){
    const sideBar = document.querySelector('.sideBar')
    sideBar.style.display="none"
}

document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('contact-form');
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const comment = document.getElementById('comment');

    form.addEventListener('submit', function(e) {
        
        e.preventDefault(); 
        
        let isValid = validateForm();
        
        if (isValid) {
            console.log('Form is valid and would be submitted.');
            alert('Thank you for your message!');
            form.reset(); 
            clearErrors(); 
        } else {
            console.log('Form is invalid. Please correct the errors.');
        }
    });

    function validateForm() {
        clearErrors();
        
        let valid = true; 

        const nameValue = name.value.trim();
        const emailValue = email.value.trim();
        const phoneValue = phone.value.trim();
        const commentValue = comment.value.trim();


        if (nameValue === '') {
            setError(name, 'Full name is required.');
            valid = false;
        }

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