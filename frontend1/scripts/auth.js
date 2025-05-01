// scripts/auth.js
import { createAuth0Client } from '../node_modules/@auth0/auth0-spa-js';
import '../auth_config.json';

export async function getAuth0Client() {
  if (auth0) return auth0;
  auth0 = await createAuth0Client({
    domain:       'domain',
    client_id:    'client_id',
    redirect_uri: window.location.origin,
    cacheLocation: 'localstorage',
    useRefreshTokens: true
  });
  return auth0;
}
