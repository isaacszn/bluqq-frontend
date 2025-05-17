// Verify Email Form Handler
document.querySelector('form').addEventListener('submit', async (e) => {
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
    const res = await fetch('/backend/api/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin })
    });

    // EXACT login script conditional structure
    if (res.ok) {
      document.querySelector('.message-box').classList.remove('d-n');
      document.querySelector('.message-box').classList.add('show');
      document.querySelector('.message-box').innerHTML = 'Verification successful! ✅';
      window.location.href = '/frontend/pages/dashboard.html';
      setTimeout(() => {
        document.querySelector('.message-box').classList.remove('show');
        document.querySelector('.message-box').classList.add('d-n');
      }, 6 * 1000);
    } else {
      document.querySelector('.message-box').classList.remove('d-n');
      document.querySelector('.message-box').classList.add('show');
      document.querySelector('.message-box').innerHTML = '⚠️ Invalid code, try again!';
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
    document.querySelector('.message-box').innerHTML = '⚠️ Verification service unavailable!';
    setTimeout(() => {
      document.querySelector('.message-box').classList.remove('show');
      document.querySelector('.message-box').classList.add('d-n');
    }, 6 * 1000);
  }
});

/*// Resend Code Button Handler
document.getElementById('resend-code').addEventListener('click', async (e) => {
  e.preventDefault();
  console.log('Resend code requested');

  try {
    const res = await fetch('/backend/api/resend-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    // EXACT login script conditional structure
    if (res.ok) {
      document.querySelector('.message-box').classList.remove('d-n');
      document.querySelector('.message-box').classList.add('show');
      document.querySelector('.message-box').innerHTML = 'New code sent! 📧';
      setTimeout(() => {
        document.querySelector('.message-box').classList.remove('show');
        document.querySelector('.message-box').classList.add('d-n');
      }, 6 * 1000);
    } else {
      document.querySelector('.message-box').classList.remove('d-n');
      document.querySelector('.message-box').classList.add('show');
      document.querySelector('.message-box').innerHTML = '⚠️ Error: Code not sent!';
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
});*/