// Add event listener to the form to collect data when it submits 
document.querySelector('form').addEventListener('submit', async (e) => {
  // Prevent default form behavior
  e.preventDefault();
  
  // Disable button and show loading state
  const submitBtn = document.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Logging in...';
  
  const formData = new FormData(e.target);
  const email = formData.get('email');
  const password = formData.get('password');
  
  // Get message box element
  const messageBox = document.querySelector('.message-box');
  messageBox.textContent = '';
  messageBox.classList.remove('success', 'error', 'show', 'd-n');

  try {
    // Show loading message
    messageBox.textContent = 'Authenticating...';
    messageBox.classList.add('show');
    
    // Replace with your actual login endpoint
    const response = await fetch('https://new-backend-production-0da2.up.railway.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' 'Accept': 'application/json'},
      body: JSON.stringify({ email, password })
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Server responded with status ${response.status}`);
    }

    const data = await response.json();
    
    // Show success message
    messageBox.textContent = 'Login successful! 🎉';
    messageBox.classList.add('success', 'show');
    
    // Save token to localStorage (if provided)
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      window.location.href = '/frontend/pages/dashboard.html';
    }, 2000);
    
  } catch (err) {
    console.error('Login error:', err);
    
    // Enhanced error messages
    if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
      messageBox.innerHTML = '❌ Network error: Failed to connect to server<br>Please check your connection';
    } else {
      messageBox.textContent = `⚠️ ${err.message || 'Wrong email or password!'}`;
    }
    
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

// Toggle password visibility (if your login form has this)
document.querySelectorAll('.toggle-password').forEach(button => {
  button.addEventListener('click', (e) => {
    const input = e.target.previousElementSibling;
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    e.target.textContent = type === 'password' ? 'Show' : 'Hide';
  });
});
