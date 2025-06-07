// Add event listener to the form to collect data when it submits 
document.querySelector('form').addEventListener('submit', async (e) => {
  // This prevents the form from refreshing everytime the submit button is clicked
  e.preventDefault();

  const formData = new FormData(e.target);

  const country = formData.get('country');
  const firstName = formData.get('firstname');
  const lastName = formData.get('lastname');
  const phoneNumber = formData.get('tel');
  const email = formData.get('email');
  const password = formData.get('password');
  const gender = formData.get('gender');

  // Validate the form fields
  if (!checkPassword() || !checkConfirmPassword() || !checkPhoneNumber()) {
    console.log('Validation failed');
    return; // Exit early if validation fails
  }

  // Logs the collected user data on console
  console.log(`User country: ${country}, First name: ${firstName}, Last name: ${lastName}, Phone number: ${phoneNumber}, User email: ${email}, Password: ${password}, Gender: ${gender}`);

  // Get the message box element
  const messageBox = document.querySelector('.message-box');

  try {
    // Send the data to the backend
    const response = await fetch('https://new-backend-production-0da2.up.railway.app/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ country, firstName, lastName, phoneNumber, email, password, gender })
    });

    // Parse the JSON response
    const data = await response.json();
    console.log(data);

    // Show the message box
    messageBox.classList.remove('d-n');
    messageBox.classList.add('show');

    if (response.ok) {
      messageBox.innerHTML = 'Account created successfully! 🎉';
      // Later: maybe save token, redirect, etc.
    } else {
      // If the server responds with an error (4xx, 5xx)
      messageBox.innerHTML = '⚠️ Oops! Failed to create account!';
    }

    // Hide the message box after 6 seconds
    setTimeout(() => {
      messageBox.classList.remove('show');
      messageBox.classList.add('d-n');
    }, 6000);

  } catch (err) {
    // This catches network errors or errors in the fetch call
    console.error('Error:', err);
    messageBox.classList.remove('d-n');
    messageBox.classList.add('show');
    messageBox.innerHTML = '⚠️ Network error! Please try again.';
    setTimeout(() => {
      messageBox.classList.remove('show');
      messageBox.classList.add('d-n');
    }, 6000);
  }
});

// Validation functions remain the same
const checkPassword = () => {
  if (!RegexJS.validatePassword(document.querySelector('#password').value)) {
    document.querySelector('.error-message-2').classList.remove('d-n');
    document.querySelector('.error-message-2').classList.add('show');
    return false;
  } else {
    document.querySelector('.error-message-2').classList.remove('show');
    document.querySelector('.error-message-2').classList.add('d-n');
    return true;
  }
};

const checkConfirmPassword = () => {
  if (document.querySelector('#confirm-password').value !== document.querySelector('#password').value) {
    document.querySelector('.error-message-3').classList.remove('d-n');
    document.querySelector('.error-message-3').classList.add('show');
    return false;
  } else {
    document.querySelector('.error-message-3').classList.remove('show');
    document.querySelector('.error-message-3').classList.add('d-n');
    return true;
  }
};

const checkPhoneNumber = () => {
  if (!RegexJS.validatePhoneNumber(document.querySelector('#tel').value)) {
    document.querySelector('.error-message').classList.remove('d-n');
    document.querySelector('.error-message').classList.add('show');
    return false;
  } else {
    document.querySelector('.error-message').classList.remove('show');
    document.querySelector('.error-message').classList.add('d-n');
    return true;
  }
};
