// Add event listener to the PIN setup form
document.querySelector('form').addEventListener('submit', async (e) => {
  // Prevent form refresh
  e.preventDefault();
  const formData = new FormData(e.target);
  const pin1 = formData.get('pin-1');
  const pin2 = formData.get('pin-2');
  const pin3 = formData.get('pin-3');
  const pin4 = formData.get('pin-4');
  // Main pin
  const pin = pin1 + pin2 + pin3 + pin4;
  // Log the entered PIN
  console.log(`PIN Attempt: ${pin}`);

  try {
    const res = await fetch('/backend/api/setup-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin })
    });

    //const data = await res.json()
    if (res.ok) {
      document.querySelector('.message-box').classList.remove('d-n');
      document.querySelector('.message-box').classList.add('show');
      document.querySelector('.message-box').innerHTML = 'PIN set successfully! 🔐';
      // redirect to verification page
      window.location.href = '/frontend/pages/verify-email.html';
      setTimeout(() => {
        document.querySelector('.message-box').classList.remove('show');
        document.querySelector('.message-box').classList.add('d-n');
      }, 6 * 1000);
    } else {
      document.querySelector('.message-box').classList.remove('d-n');
      document.querySelector('.message-box').classList.add('show');
      document.querySelector('.message-box').innerHTML = '⚠️ Pin can\'t be set yet!';
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
    document.querySelector('.message-box').innerHTML = '⚠️ Oops! Something went wrong!';
    setTimeout(() => {
      document.querySelector('.message-box').classList.remove('show');
      document.querySelector('.message-box').classList.add('d-n');
    }, 6 * 1000);
  }
});
