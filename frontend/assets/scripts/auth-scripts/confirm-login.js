// Add event listener to the PIN form
document.querySelector('form').addEventListener('submit', async (e) => {
  // Prevent form refresh
  e.preventDefault();
  const formData = new FormData(e.target);
  const pin = formData.get('pin');
  // Log the entered PIN
  console.log(`Entered PIN: ${pin}`);

  try {
    // Simulated API call (replace with real endpoint later)
    const res = await fetch('/backend/api/confirm-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin })
    });

    // Simulated response handling
    if (res.ok) {
      document.querySelector('.message-box').classList.remove('d-n');
      document.querySelector('.message-box').classList.add('show');
      document.querySelector('.message-box').innerHTML = 'Login successful! ✅';
      // Redirect to account page
      window.location.href = '/frontend/pages/login.html';
      setTimeout(() => {
        document.querySelector('.message-box').classList.remove('show');
        document.querySelector('.message-box').classList.add('d-n');
      }, 6000);
    } else {
      document.querySelector('.message-box').classList.remove('d-n');
      document.querySelector('.message-box').classList.add('show');
      document.querySelector('.message-box').innerHTML = '⚠️ PIN not valid!';
      setTimeout(() => {
        document.querySelector('.message-box').classList.remove('show');
        document.querySelector('.message-box').classList.add('d-n');
      }, 6000);
    }
  }
  catch (err) {
    console.log('Error: ' + err);
    document.querySelector('.message-box').classList.remove('d-n');
    document.querySelector('.message-box').classList.add('show');
    document.querySelector('.message-box').innerHTML = '⚠️ Verification service unavailable!';
    setTimeout(() => {
      document.querySelector('.message-box').classList.remove('show');
      document.querySelector('.message-box').classList.add('d-n');
    }, 6000);
  }
});
