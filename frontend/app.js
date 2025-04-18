// app.js
let auth0Client = null;

// 1. Download your config and initialize the SDK
const fetchAuthConfig = () => fetch('/auth_config.json');
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();
  auth0Client = await createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  });
};

// 2. Update UI state (enable/disable buttons, show gated content)
const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();

  const btnLogin  = document.getElementById('btn-login');
  const btnLogout = document.getElementById('btn-logout');
  const btnSignup = document.getElementById('btn-signup');
  const gated     = document.getElementById('gated-content');

  if (btnLogin)  btnLogin.disabled  = isAuthenticated;
  if (btnLogout) btnLogout.disabled = !isAuthenticated;
  if (btnSignup) btnSignup.disabled = isAuthenticated;
  if (gated)     gated.classList.toggle('hidden', !isAuthenticated);

  if (isAuthenticated && gated) {
    // Optional: show tokens/profile
    document.getElementById('ipt-access-token')?.innerText = await auth0Client.getTokenSilently();
    document.getElementById('ipt-user-profile')?.textContent = JSON.stringify(await auth0Client.getUser(), null, 2);
  }
};

// 3. Wire it all up on load, plus handle callbacks
window.onload = async () => {
  // load and init
  await configureClient();
  await updateUI();

  // handle the redirect back from Auth0
  const query = window.location.search;
  if (query.includes('code=') && query.includes('state=')) {
    await auth0Client.handleRedirectCallback();
    await updateUI();
    // clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // attach event listeners
  document.getElementById('btn-login')?.addEventListener('click', () =>
    auth0Client.loginWithRedirect()
  );
  document.getElementById('btn-signup')?.addEventListener('click', () =>
    auth0Client.loginWithRedirect({ screen_hint: 'signup' })
  );
  document.getElementById('btn-logout')?.addEventListener('click', () =>
    auth0Client.logout({ logoutParams: { returnTo: window.location.origin } })
  );
};
