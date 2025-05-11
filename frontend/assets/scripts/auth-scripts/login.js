// Add event listener to the form to collect data when it submits 
// I used an asynchronous function
document.querySelector('form').addEventListener('submit', async (e) => {
  // This prevents the form from refreshing everytime the submit button is clicked
  e.preventDefault();
  const formData = new FormData(e.target)
  const email = formData.get('email')
  const password = formData.get('password')
  // Logs the collected user data on console
  console.log(`${email} ${password}`)

  try {
    const res = await fetch('/backend/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    //const data = await res.json()
    if (res.ok) {
      document.querySelector('.message-box').classList.remove('d-n')
      document.querySelector('.message-box').classList.add('show')
      document.querySelector('.message-box').innerHTML = 'Login successful! 🎉'
      // redirect to dashboard
      window.location.href = '/frontend/pages/dashboard.html'
      // Later: maybe save token, redirect, etc.
      setTimeout(() => {
        document.querySelector('.message-box').classList.remove('show')
        document.querySelector('.message-box').classList.add('d-n')
      }, 3.5 * 1000)
    } else {
      document.querySelector('.message-box').classList.remove('d-n')
      document.querySelector('.message-box').classList.add('show')
      document.querySelector('.message-box').innerHTML = '⚠️ Wrong email or password!'
      setTimeout(() => {
        document.querySelector('.message-box').classList.remove('show')
        document.querySelector('.message-box').classList.add('d-n')
      }, 3.5 * 1000)
    }
  }
  catch (err) {
    console.log('Error: ' + err)
  }
})