<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Block - Register for a Block account</title>
  <link rel="stylesheet" href="../../../assets/css/register.css">
  <link rel="shortcut icon" type="image/x-icon" href="../../../assets/images/block-logo.png">
</head>

<body>
<form method="POST" action="{{ route('register') }}">
        @csrf
    <figure>
      <img src="../../../assets/images/block-logo.png" alt="block-logo" width="720" height="717">
    </figure>
    <h1>Register</h1>
    <label for="country" class="large">What country do you live in?</label>
    <select name="country" id="country" class="country-field">
        <option value="">-- option --</option>
        <option value="nigeria">Nigeria 🇳🇬</option>
        <option value="ghana">Ghana 🇬🇭</option>
    </select>
    <x-input-error :messages="$errors->get('country')" class="mt-2" />

    <label for="firstname">What's your firstname?</label>
    <input type="text" name="firstname" id="firstname" placeholder="Isaac" required>
    <x-input-error :messages="$errors->get('firstname')" class="mt-2" />

    <label for="lastname">What's your lastname?</label>
    <input type="text" name="lastname" id="lastname" placeholder="Ugochukwu" required>
    <x-input-error :messages="$errors->get('lastname')" class="mt-2" />

    <label for="email">Enter your email address</label>
    <input type="email" name="email" id="email" placeholder="isaaczik9@gmail.com" required>
    <x-input-error :messages="$errors->get('email')" class="mt-2" />
    <label for="firstname">Enter phone digits</label>
    <input type="tel" name="phone" id="tel" placeholder="+2349166608124" required>
    <x-input-error :messages="$errors->get('phone')" class="mt-2" />
    <label for="gender">Gender?</label>
    <select name="gender" id="gender">
    <option value="">-- option --</option>

      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
    <x-input-error :messages="$errors->get('gender')" class="mt-2" />

    <label for="password">Create password</label>
    <input type="password" name="password" id="password" placeholder="Use a very strong password 6-8 characters long" required>
    <x-input-error :messages="$errors->get('password')" class="mt-2" />

    <label for="confirm-password">Confirm password</label>
    <input type="password" name="password_confirmation" id="confirm-password" placeholder="Use same password" required>
    <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />

    <button type="submit">Register</button>
    
    <p>Already have an account? <a href="../../../pages/login.html">Log into account</a></p>
  </form>
</body>

</html>