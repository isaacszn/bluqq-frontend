// Add event listener to the form to collect data when it submits 
// I used an asynchronous function
document.querySelector('form').addEventListener('submit', async (e) => {
  // This prevents the form from refreshing everytime the submit button is clicked
  e.preventDefault();

  const formData = new FormData(e.target)

  const country = formData.get('country')
  const firstName = formData.get('firstname')
  const lastName = formData.get('lastname')
  const phoneNumber = formData.get('tel')
  const email = formData.get('email')
  const password = formData.get('password')
  const gender = formData.get('gender')

  // Logs the collected user data on console
  console.log(`${country} ${firstName} ${lastName} ${phoneNumber} ${email} ${password} ${gender}`)

  try {
    const res = await fetch('backend/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country, firstName, lastName, email, phoneNumber, password, gender })
    })
    //const data = await res.json()
    if (res.ok) {
      document.querySelector('.message-box').classList.remove('d-n')
      document.querySelector('.message-box').classList.add('show')
      document.querySelector('.message-box').innerHTML = 'Account created succesfully! 🎉'
      // Later: maybe save token, redirect, etc.
      setTimeout(() => {
        document.querySelector('.message-box').classList.remove('show')
        document.querySelector('.message-box').classList.add('d-n')
      }, 3.5 * 1000)
    } else {
      document.querySelector('.message-box').classList.remove('d-n')
      document.querySelector('.message-box').classList.add('show')
      document.querySelector('.message-box').innerHTML = '⚠️ Oops! Failed to create account!'
    }
    setTimeout(() => {
      document.querySelector('.message-box').classList.remove('show')
      document.querySelector('.message-box').classList.add('d-n')
    }, 3.5 * 1000)
  } catch (err) {
    console.log('Error: ' + err)
  }
})