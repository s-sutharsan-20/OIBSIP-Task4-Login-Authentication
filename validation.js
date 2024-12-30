const form = document.getElementById('form');
const name_input = document.getElementById('name-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const rpassword_input = document.getElementById('repeat-password');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    let errors = [];
    const isSignup = name_input !== null;

    if (isSignup) {
        errors = getSignupFormErrors(name_input.value, email_input.value, password_input.value, rpassword_input.value);
    } else {
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }

    if (errors.length > 0) {
        e.preventDefault();
        error_message.innerText = errors.join(". ");
    }

    if (errors.length === 0) {
        e.preventDefault();
        if (isSignup) {
            storedata(email_input.value, password_input.value);
        } else {
            getdata(email_input.value, password_input.value);
        }
    }
});


function getSignupFormErrors(firstname, email, password, repeatpassword){
    let errors = [];

    if(firstname === '' || firstname == null){
        errors.push('Firstname is required');
        name_input.parentElement.classList.add('incorrect');
    }
    if(email === '' || email == null){
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if(password === '' || password == null){
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    if(password.length < 8){
        errors.push('Password must have atleast 8 Characters');
        password_input.parentElement.classList.add('incorrect');
    }
    if( password !== repeatpassword){
        errors.push('Password does not match');
        password_input.parentElement.classList.add('incorrect');
        rpassword_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

function getLoginFormErrors(email, password){
    let errors = [];
    if(email === '' || email == null){
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if(password === '' || password == null){
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    return errors;
}

function storedata(username, password) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
}

function getdata(username, password) {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem('loggedIn', 'true');
        alert('Login successful!');
        window.location.href = 'secured.html';
    } else {
        alert('Invalid username or password!');
    }
}

document.querySelectorAll('.wrapper input').forEach((input) => {
    input.addEventListener('input', () => {
        input.parentElement.classList.remove('incorrect');
        error_message.innerText = '';
    });
});