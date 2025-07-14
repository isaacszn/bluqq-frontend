function switchForm(formType) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleBtns = document.querySelectorAll('.toggle-btn');

    // Hide all forms
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');

    // Remove active class from all toggle buttons
    toggleBtns.forEach(btn => btn.classList.remove('active'));

    // Show selected form and activate button
    if (formType === 'login') {
        loginForm.classList.add('active');
        toggleBtns[0].classList.add('active');
    } else {
        registerForm.classList.add('active');
        toggleBtns[1].classList.add('active');
    }

    // Clear any error messages
    clearMessages();
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
}

function toggleCheckbox(checkbox) {
    checkbox.classList.toggle('checked');
}

function showMessage(type, message, formType) {
    const messageElement = document.getElementById(`${formType}-${type}`);
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

function clearMessages() {
    const messages = document.querySelectorAll('.error-message, .success-message');
    messages.forEach(msg => msg.style.display = 'none');
}

function handleLogin(event) {
    event.preventDefault();
    clearMessages();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const btn = document.getElementById('login-btn');

    // Simple validation
    if (!email || !password) {
        showMessage('error', 'Please fill in all fields', 'login');
        return;
    }

    // Simulate loading
    btn.classList.add('loading');
    btn.textContent = '';

    // Simulate API call
    setTimeout(() => {
        btn.classList.remove('loading');
        btn.textContent = 'Sign In';
        
        // Simulate successful login
        showMessage('success', 'Login successful! Redirecting...', 'login');
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = '#dashboard';
        }, 2000);
    }, 2000);
}

function handleRegister(event) {
    event.preventDefault();
    clearMessages();

    const fullname = document.getElementById('register-fullname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const termsAccepted = document.querySelector('#register-form .checkbox').classList.contains('checked');
    const btn = document.getElementById('register-btn');

    // Validation
    if (!fullname || !email || !password || !confirmPassword) {
        showMessage('error', 'Please fill in all fields', 'register');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('error', 'Passwords do not match', 'register');
        return;
    }

    if (password.length < 8) {
        showMessage('error', 'Password must be at least 8 characters long', 'register');
        return;
    }

    if (!termsAccepted) {
        showMessage('error', 'Please accept the Terms of Service and Privacy Policy', 'register');
        return;
    }

    // Simulate loading
    btn.classList.add('loading');
    btn.textContent = '';

    // Simulate API call
    setTimeout(() => {
        btn.classList.remove('loading');
        btn.textContent = 'Create Account';
        
        // Simulate successful registration
        showMessage('success', 'Account created successfully! Please check your email for verification.', 'register');
        
        // Switch to login form after 3 seconds
        setTimeout(() => {
            switchForm('login');
            showMessage('success', 'Please sign in with your new account', 'login');
        }, 3000);
    }, 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Add some nice entrance animations
    const container = document.querySelector('.auth-container');
    container.style.transform = 'translateY(50px)';
    container.style.opacity = '0';
    
    setTimeout(() => {
        container.style.transition = 'all 0.6s ease';
        container.style.transform = 'translateY(0)';
        container.style.opacity = '1';
    }, 100);
});

function handleLogin(event) {
    event.preventDefault(); // Verhindert Seitenreload
    // Hier würdest du normal eine Login-Prüfung machen
    // Wenn Login erfolgreich:
    window.location.href = "dashboard.html";
}

function handleRegister(event) {
    event.preventDefault();
    // Nach erfolgreicher Registrierung:
    window.location.href = "dashboard.html";
}
