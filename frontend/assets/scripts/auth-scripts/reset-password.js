// Add event listener to the password reset form
document.querySelector('form').addEventListener('submit', async (e) => {
  // Prevent form refresh
  e.preventDefault();

  if (checkPassword() && checkConfirmPassword()) {
    const formData = new FormData(e.target);
    const newPassword = formData.get('new-password');
    const confirmPassword = formData.get('confirm-password');
    // Log the entered passwords
    console.log(`New Password: ${newPassword}, Confirm: ${confirmPassword}`);

    try {
      // Simulated API call (replace with real endpoint later)
      const res = await fetch('/backend/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword, confirmPassword })
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
        document.querySelector('.message-box').innerHTML = '⚠️ Oops! Something went wrong, try again!';
        setTimeout(() => {
          document.querySelector('.message-box').classList.remove('show');
          document.querySelector('.message-box').classList.add('d-n');
        }, 6 * 1000);
      }
    }
    catch (err) {
      console.log('Error: ' + err);
    }
  } else {
    console.log('Won\'t do any shit')
  }
});

const checkPassword = () => {
  if (document.querySelector('#new-password').value.length < 6) {
    document.querySelector('.error-message').classList.remove('d-n')
    document.querySelector('.error-message').classList.add('show')
    return false
  } else {
    document.querySelector('.error-message').classList.remove('show')
    document.querySelector('.error-message').classList.add('d-n')
    return true
  }
}

const checkConfirmPassword = () => {
  if (document.querySelector('#confirm-password').value !== document.querySelector('#new-password').value) {
    document.querySelector('.error-message-2').classList.remove('d-n')
    document.querySelector('.error-message-2').classList.add('show')
    return false
  } else {
    document.querySelector('.error-message-2').classList.remove('show')
    document.querySelector('.error-message-2').classList.add('d-n')
    return true
  }
}