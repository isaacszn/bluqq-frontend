let currentBalance = 10000;
let isProcessing = false;

// Amount input handling
const amountInput = document.getElementById('topupAmount');
const topupButton = document.getElementById('topupButton');
const buttonText = document.getElementById('buttonText');

amountInput.addEventListener('input', function() {
    updateSummary();
    updateButton();
});

function selectQuickAmount(amount) {
    // Remove selected class from all quick amount buttons
    document.querySelectorAll('.quick-amount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    event.target.classList.add('selected');
    
    // Set the amount
    amountInput.value = amount;
    updateSummary();
    updateButton();
}

function selectPaymentMethod(element) {
    // Remove selected class from all payment methods
    document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('selected');
    });
    
    // Add selected class to clicked method
    element.classList.add('selected');
    
    updateSummary();
}

function updateSummary() {
    const amount = parseFloat(amountInput.value) || 0;
    const fee = amount * 0.02; // 2% processing fee
    const total = amount + fee;
    
    document.getElementById('summaryAmount').textContent = amount.toFixed(2);
    document.getElementById('summaryFee').textContent = fee.toFixed(2);
    document.getElementById('summaryTotal').textContent = total.toFixed(2);
}

function updateButton() {
    const amount = parseFloat(amountInput.value) || 0;
    
    if (amount > 0) {
        topupButton.disabled = false;
        buttonText.textContent = `Top Up $${amount.toFixed(2)}`;
    } else {
        topupButton.disabled = true;
        buttonText.textContent = 'Enter Amount to Continue';
    }
}

function processTopUp() {
    if (isProcessing) return;
    
    const amount = parseFloat(amountInput.value) || 0;
    if (amount <= 0) return;
    
    isProcessing = true;
    topupButton.disabled = true;
    buttonText.innerHTML = '<div class="loading"></div> Processing...';
    
    // Simulate processing
    setTimeout(() => {
        // Update balance
        currentBalance += amount;
        document.getElementById('currentBalance').textContent = currentBalance.toLocaleString();
        
        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('show');
        
        // Reset form
        amountInput.value = '';
        document.querySelectorAll('.quick-amount-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        updateSummary();
        updateButton();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
        
        isProcessing = false;
    }, 2000);
}

function goBack() {
    if (confirm('Are you sure you want to go back? Any unsaved changes will be lost.')) {
        // In a real app, this would navigate back to the dashboard
        alert('Returning to dashboard...');
    }
}

// Initialize
updateSummary();
updateButton();
