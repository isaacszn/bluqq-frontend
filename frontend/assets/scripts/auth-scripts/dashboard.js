let balanceVisible = true;
let isLoading = false;

function toggleBalance() {
    const balanceAmount = document.getElementById('balanceAmount');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (balanceVisible) {
        balanceAmount.textContent = '••••';
        eyeIcon.textContent = '👁️‍🗨️';
        balanceVisible = false;
    } else {
        balanceAmount.textContent = '10,000';
        eyeIcon.textContent = '👁️';
        balanceVisible = true;
    }
}

function toggleProfile() {
    if (isLoading) return;
    
    isLoading = true;
    const btn = document.querySelector('.profile-btn');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<div class="loading"></div>';
    
    setTimeout(() => {
        btn.innerHTML = originalContent;
        isLoading = false;
        alert('Profile menu opened!');
    }, 1000);
}

function toggleNotifications() {
    alert('Notifications: You have 3 new notifications!');
}

function topUp() {
    if (isLoading) return;
    
    isLoading = true;
    const btn = event.target.closest('.action-btn');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<div class="loading"></div>';
    
    setTimeout(() => {
        btn.innerHTML = originalContent;
        isLoading = false;
        alert('Top Up functionality coming soon!');
    }, 1000);
}

function withdraw() {
    if (isLoading) return;
    
    isLoading = true;
    const btn = event.target.closest('.action-btn');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<div class="loading"></div>';
    
    setTimeout(() => {
        btn.innerHTML = originalContent;
        isLoading = false;
        alert('Withdraw functionality coming soon!');
    }, 1000);
}

function createContract() {
    if (isLoading) return;
    
    isLoading = true;
    const btn = event.target.closest('.action-btn');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<div class="loading"></div>';
    
    setTimeout(() => {
        btn.innerHTML = originalContent;
        isLoading = false;
        alert('Create Contract functionality coming soon!');
    }, 1000);
}

// Add smooth scrolling behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add touch feedback for mobile
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    element.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});
