<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  @vite(['resources/css/app.css', 'resources/js/app.js'])

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Block - Login</title>
  <link rel="stylesheet" href="../../../assets/css/login.css">
  <link rel="shortcut icon" type="image/x-icon" href="../../../assets/images/block-logo.png">
</head>

<body>
  <div class="max-w-xl mx-auto ">
    <form method="POST" action="{{ route('login') }}">
      @csrf

      <!-- Email Address -->
      <div>
        <!-- <x-input-label for="email" :value="__('Email')" /> -->
        <!-- <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" /> -->
        <!-- <x-input-error :messages="$errors->get('email')" class="mt-2" /> -->
        <x-auth-session-status class="mb-4" :status="session('status')" />

      </div>
      <figure>
        <img src="../../../assets/images/block-logo.png" alt="block-logo">
      </figure>
      <h1>Log in</h1>
      <label for="email">Email address</label>
      <input type="email" name="email" id="email" placeholder="example@block.com" required>
      <x-input-error :messages="$errors->get('email')" class="mt-2" />
      <label for="password">Your password</label>
      <input type="password" name="password" id="password" placeholder="Password" required><br><br>
      <a href="/frontend/pages/recover-password.html">Forgotten password?</a>
      <button type="submit">Log in</button>

      <p>Don't have an account? <a href="{{ route('register') }}">Create account</a></p>
    </form>
    </div>
</body>

</html>