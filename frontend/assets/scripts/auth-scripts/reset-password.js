// Add event listener to the password reset form
document.querySelector('form').addEventListener('submit', async (e) => {
  // Prevent form refresh
  e.preventDefault();
  const formData = new FormData(e.target);
  const newPassword = formData.get('new-password');
  const confirmPassword = formData.get('confirm-password');
  // Log the entered passwords
  console.log(`New Password: ${new-password}, Confirm: ${confirm-password}`);

  try {
    // Simulated API call (replace with real endpoint later)
    const res = await fetch('/backend/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new-password, confirm-password })
    });

    //const data = await res.json()
    if (res.ok) {
      document.querySelector('.message-box').classList.remove('d-n');
      document.querySelector('.message-box').classList.add('show');
      document.querySelector('.message-box').innerHTML = 'Password reset successful! 🔑';
      // redirect to login page
      window.location.href = '/frontend/pages/login.html';
      setTimeout(() => {
        document.querySelector('.message-box').classList.remove('show');
        document.querySelector('.message-box').classList.add('d-n');
      }, 6 * 1000);
    } else {
      document.querySelector('.message-box').classList.remove('d-n');
      document.querySelector('.message-box').classList.add('show');
      document.querySelector('.message-box').innerHTML = '⚠️ Invalid password, try again!';
      setTimeout(() => {
        document.querySelector('.message-box').classList.remove('show');
        document.querySelector('.message-box').classList.add('d-n');
      }, 6 * 1000);
    }
  }
  catch (err) {
    console.log('Error: ' + err);
    document.querySelector('.message-box').classList.remove('d-n');
    document.querySelector('.message-box').classList.add('show');
    document.querySelector('.message-box').innerHTML = '⚠️ Service unavailable!';
    setTimeout(() => {
      document.querySelector('.message-box').classList.remove('show');
      document.querySelector('.message-box').classList.add('d-n');
    }, 6 * 1000);
  }
});
