// Add event listener to the form to collect data when it submits 
// I used an asynchronous function
document.querySelector('form').addEventListener('submit', (e) => {
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

  if (checkPassword() && checkConfirmPassword() && checkPhoneNumber()) {
    // Logs the collected user data on console
    console.log(`User country: ${country}, First name: ${firstName}, Last name: ${lastName}, Phone number: ${phoneNumber}, User email: ${email}, Password: ${password}, Gender: ${gender}`)

    try {
      fetch('https://new-backend-production-0da2.up.railway.app/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ country, firstName, lastName, phoneNumber, email, password, gender })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));

      if (res.ok) {
        document.querySelector('.message-box').classList.remove('d-n')
        document.querySelector('.message-box').classList.add('show')
        document.querySelector('.message-box').innerHTML = 'Account created succesfully! 🎉'
        // Later: maybe save token, redirect, etc.
        setTimeout(() => {
          document.querySelector('.message-box').classList.remove('show')
          document.querySelector('.message-box').classList.add('d-n')
        }, 6 * 1000)
      } else {
        document.querySelector('.message-box').classList.remove('d-n')
        document.querySelector('.message-box').classList.add('show')
        document.querySelector('.message-box').innerHTML = '⚠️ Oops! Failed to create account!'
      }
      setTimeout(() => {
        document.querySelector('.message-box').classList.remove('show')
        document.querySelector('.message-box').classList.add('d-n')
      }, 6 * 1000)
    } catch (err) {
      console.log('Error: ' + err)
    }
  } else {
    console.log('Won\'t do any shit')
  }
})

const checkPassword = () => {
  if (!RegexJS.validatePassword(document.querySelector('#password').value)) {
    document.querySelector('.error-message-2').classList.remove('d-n')
    document.querySelector('.error-message-2').classList.add('show')
    return false
  } else {
    document.querySelector('.error-message-2').classList.remove('show')
    document.querySelector('.error-message-2').classList.add('d-n')
    return true
  }
}

const checkConfirmPassword = () => {
  if (document.querySelector('#confirm-password').value !== document.querySelector('#password').value) {
    document.querySelector('.error-message-3').classList.remove('d-n')
    document.querySelector('.error-message-3').classList.add('show')
    return false
  } else {
    document.querySelector('.error-message-3').classList.remove('show')
    document.querySelector('.error-message-3').classList.add('d-n')
    return true
  }
}

const checkPhoneNumber = () => {
  if (!RegexJS.validatePhoneNumber(document.querySelector('#tel').value)) {
    document.querySelector('.error-message').classList.remove('d-n')
    document.querySelector('.error-message').classList.add('show')
    return false
  } else {
    document.querySelector('.error-message').classList.remove('show')
    document.querySelector('.error-message').classList.add('d-n')
    return true
  }
}