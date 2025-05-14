// Add event listener to the password reset form
document.querySelector('form').addEventListener('submit', async (e) => {
  // Prevent form refresh
  e.preventDefault();
  const formData = new FormData(e.target);
  const new-password = formData.get('new-password');
  const confirm-password = formData.get('confirm-password');
  // Log the entered passwords
  console.log(`New Password: ${new-password}, Confirm: ${confirm-password}`);

  try {
    // Simulated API call (always fails without backend)
    const res = await fetch('/backend/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new-password, confirm-password })
    });

    // Simulated response - always show error
    document.querySelector('.message-box').classList.remove('d-n');
    document.querySelector('.message-box').classList.add('show');
    document.querySelector('.message-box').innerHTML = '⚠️ Invalid password, try again!';
    
    setTimeout(() => {
      document.querySelector('.message-box').classList.remove('show');
      document.querySelector('.message-box').classList.add('d-n');
    }, 6 * 1000);

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
