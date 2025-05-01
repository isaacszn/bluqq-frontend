// frontend/scripts/navigation.js
window.addEventListener('DOMContentLoaded', () => {
  const goTo = (btnId, url) => {
    const btn = document.getElementById(btnId);
    if (btn) btn.addEventListener('click', () => {
      window.location.href = url;
    });
  };

  goTo('loginBtn', '/pages/login.html');
  goTo('registerBtn', '/pages/register.html');
});
