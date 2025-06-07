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
  submitBtn.innerHTML = 'Logging in...';
  
  // Clear message box
  messageBox.textContent = '';
  messageBox.classList.remove('success', 'error', 'show', 'd-n');
  
  // Get form data
  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');
  
  try {
    // Show authenticating message
    messageBox.textContent = 'Authenticating...';
    messageBox.classList.add('show');
    
    // Call login API with correct endpoint
    const response = await fetch('https://new-backend-production-0da2.up.railway.app/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    // Handle potential HTML responses
    const contentType = response.headers.get('content-type') || '';
    let data;
    
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // If not JSON, read as text and try to parse manually
      const textResponse = await response.text();
      
      // Try to extract JSON if it's wrapped in HTML
      try {
        const jsonMatch = textResponse.match(/{.*}/s);
        if (jsonMatch) {
          data = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('HTML response: ' + textResponse.slice(0, 100));
        }
      } catch (parseErr) {
        throw new Error('Non-JSON response: ' + textResponse.slice(0, 100));
      }
    }
    
    // Handle API response
    if (response.ok) {
      // Verify token exists
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        
        // Show success message
        messageBox.textContent = 'Login successful! 🎉';
        messageBox.classList.add('success', 'show');
        
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = '/frontend/pages/dashboard.html';
        }, 2000);
      } else {
        throw new Error('Authentication token missing in response');
      }
    } else {
      // Handle API errors
      const errorMsg = data.message || 
                      data.error ||
                      `Login failed with status ${response.status}`;
      throw new Error(errorMsg);
    }
    
  } catch (err) {
    console.error('Login error:', err);
    
    // Show appropriate error message
    let errorMessage;
    
    if (err.message.includes('Failed to fetch')) {
      errorMessage = 'Network error: Failed to connect to server. Please check your connection.';
    } 
    else if (err.message.includes('HTML response') || 
             err.message.includes('Non-JSON response')) {
      errorMessage = 'Backend configuration issue: Received HTML instead of JSON';
    } 
    else if (err.message.includes('token missing')) {
      errorMessage = 'Authentication error: Token not provided by server';
    }
    else {
      errorMessage = err.message || 'Wrong email or password!';
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

// Toggle password visibility (if your login form has this)
document.querySelectorAll('.toggle-password').forEach(button => {
  button.addEventListener('click', (e) => {
    const input = e.target.previousElementSibling;
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    e.target.textContent = type === 'password' ? 'Show' : 'Hide';
  });
});
