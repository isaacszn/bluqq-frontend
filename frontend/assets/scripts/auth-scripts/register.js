// Add event listener to the form to collect data when it submits 
document.querySelector('form').addEventListener('submit', async (e) => {
  // Prevent default form behavior
  e.preventDefault();

  // Get form elements
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const messageBox = document.querySelector('.message-box');
  
  // Show loading state
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Creating Account...';
  
  // Clear message box
  messageBox.textContent = '';
  messageBox.classList.remove('success', 'error', 'show', 'd-n');

  const formData = new FormData(form);
  const country = formData.get('country');
  const firstName = formData.get('firstname');
  const lastName = formData.get('lastname');
  const phoneNumber = formData.get('tel');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm-password'); // Added for password_confirmation
  const gender = formData.get('gender');

  // Validate the form fields
  const isPasswordValid = checkPassword();
  const isConfirmPasswordValid = checkConfirmPassword();
  const isPhoneValid = checkPhoneNumber();
  
  if (!isPasswordValid || !isConfirmPasswordValid || !isPhoneValid) {
    messageBox.textContent = 'Please fix the form errors';
    messageBox.classList.add('error', 'show');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    return;
  }

  try {
    // Show processing message
    messageBox.textContent = 'Creating your account...';
    messageBox.classList.add('show');
    
    // Send the data to the backend with proper field names
    const response = await fetch('https://new-backend-production-0da2.up.railway.app/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`, // Combine first and last name
        email: email,
        password: password,
        password_confirmation: confirmPassword, // Match Laravel's expected field name
        country: country,
        phone_number: phoneNumber, // Use snake_case for Laravel
        gender: gender
      })
    });

    // Handle potential HTML responses
    const contentType = response.headers.get('content-type') || '';
    let data;
    
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Unexpected response format: ${text.slice(0, 100)}...`);
    }
    
    // Show appropriate message based on response
    messageBox.classList.remove('error');
    messageBox.classList.add('show');
    
    if (response.ok) {
      messageBox.textContent = 'Account created successfully! 🎉';
      messageBox.classList.add('success');
      
      // Save token if provided
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '/frontend/pages/dashboard.html';
      }, 2000);
    } else {
      // Handle validation errors
      if (response.status === 422 && data.errors) {
        const errorMessages = Object.values(data.errors).flat().join(', ');
        throw new Error(`Validation errors: ${errorMessages}`);
      } else {
        throw new Error(data.message || `Registration failed with status ${response.status}`);
      }
    }
    
  } catch (err) {
    console.error('Registration error:', err);
    
    // Show appropriate error message
    let errorMessage = 'Registration failed';
    
    if (err.message.includes('Unexpected response format')) {
      errorMessage = 'Backend returned invalid response. Check API configuration.';
    } else if (err.message.includes('Validation errors')) {
      errorMessage = err.message;
    } else if (err.message.includes('Failed to fetch')) {
      errorMessage = 'Network error. Please check your connection.';
    } else {
      errorMessage = err.message;
    }
    
    messageBox.textContent = `⚠️ ${errorMessage}`;
    messageBox.classList.add('error', 'show');
    
  } finally {
    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    
    // Auto-hide message after 6 seconds
    setTimeout(() => {
      messageBox.classList.remove('show');
      messageBox.classList.add('d-n');
    }, 6000);
  }
});
// Ensure RegexJS is defined (add this if not already in your code)
const RegexJS = RegexJS || {
  validatePassword: (password) => {
    // At least 8 chars, 1 uppercase, 1 number, 1 special char
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  },
  validatePhoneNumber: (phone) => {
    // Basic phone validation
    const regex = /^(\+\d{1,3})?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
    return regex.test(phone);
  }
};

// Validation functions
const checkPassword = () => {
  const password = document.querySelector('#password').value;
  const errorElement = document.querySelector('.error-message-2');
  
  if (!RegexJS.validatePassword(password)) {
    errorElement.classList.remove('d-n');
    errorElement.classList.add('show');
    return false;
  } else {
    errorElement.classList.remove('show');
    errorElement.classList.add('d-n');
    return true;
  }
};

const checkConfirmPassword = () => {
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirm-password').value;
  const errorElement = document.querySelector('.error-message-3');
  
  if (password !== confirmPassword) {
    errorElement.classList.remove('d-n');
    errorElement.classList.add('show');
    return false;
  } else {
    errorElement.classList.remove('show');
    errorElement.classList.add('d-n');
    return true;
  }
};

const checkPhoneNumber = () => {
  const phone = document.querySelector('#tel').value;
  const errorElement = document.querySelector('.error-message');
  
  if (!RegexJS.validatePhoneNumber(phone)) {
    errorElement.classList.remove('d-n');
    errorElement.classList.add('show');
    return false;
  } else {
    errorElement.classList.remove('show');
    errorElement.classList.add('d-n');
    return true;
  }
};
