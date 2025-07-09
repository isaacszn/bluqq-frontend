let currentBalance = 10000;
let isProcessing = false;
const dailyLimit = 2000;
const minAmount = 10;

// Withdrawal fees by method
const withdrawalFees = {
    'Bank Transfer': 0,
    'Debit Card': 1.50,
    'PayPal': 2.00,
    'Bitcoin': 5.00
};

// Amount input handling
const amountInput = document.getElementById('withdrawAmount');
const withdrawButton = document.getElementById('withdrawButton');
const buttonText = document.getElementById('buttonText');
const errorMessage = document.getElementById('errorMessage');

amountInput.addEventListener('input', function() {
    validateAmount();
    updateSummary();
    updateButton();
});

function validateAmount() {
    const amount = parseFloat(amountInput.value) || 0;
    const isValid = amount >= minAmount && amount <= dailyLimit && amount <= currentBalance;
    
    if (amount > 0 && !isValid) {
        amountInput.classList.add('error');
        errorMessage.style.display = 'block';
        
        if (amount < minAmount) {
            errorMessage.textContent = `Minimum amount: €${minAmount}`;
        } else if (amount > dailyLimit) {
            errorMessage.textContent = `Daily maximum: €${dailyLimit}`;
        } else if (amount > currentBalance) {
            errorMessage.textContent = 'Insufficient balance';
        }
    } else {
        amountInput.classList.remove('error');
        errorMessage.style.display = 'none';
    }
    
    return isValid;
}

function selectQuickAmount(amount) {
    if (amount > currentBalance) {
        return;
    }
    document.querySelectorAll('.quick-amount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    amountInput.value = amount;
    validateAmount();
    updateSummary();
    updateButton();
}

function selectWithdrawalMethod(element) {
    document.querySelectorAll('.withdrawal-method').forEach(method => {
        method.classList.remove('selected');
    });
    element.classList.add('selected');
    updateSummary();
}

function updateSummary() {
    const amount = parseFloat(amountInput.value) || 0;
    const selectedMethod = document.querySelector('.withdrawal-method.selected');
    const methodName = selectedMethod ? selectedMethod.querySelector('.method-name').textContent : 'Bank Transfer';
    const fee = withdrawalFees[methodName] || 0;
    const total = amount + fee;
    const receive = amount;

    document.getElementById('summaryAmount').textContent = amount.toFixed(2);
    document.getElementById('summaryFee').textContent = fee.toFixed(2);
    document.getElementById('summaryTotal').textContent = total.toFixed(2);
    document.getElementById('summaryReceive').textContent = receive.toFixed(2);
}

function updateButton() {
    const amount = parseFloat(amountInput.value) || 0;
    const isValid = validateAmount();

    if (amount > 0 && isValid) {
        withdrawButton.disabled = false;
        buttonText.textContent = `Withdraw €${amount.toFixed(2)}`;
    } else {
        withdrawButton.disabled = true;
        buttonText.textContent = amount > 0 ? 'Invalid amount' : 'Enter amount';
    }
}

function processWithdrawal() {
    if (isProcessing) return;

    const amount = parseFloat(amountInput.value) || 0;
    if (!validateAmount()) return;

    const selectedMethod = document.querySelector('.withdrawal-method.selected');
    const methodName = selectedMethod ? selectedMethod.querySelector('.method-name').textContent : 'Bank Transfer';
    const fee = withdrawalFees[methodName] || 0;
    const total = amount + fee;

    isProcessing = true;
    withdrawButton.disabled = true;
    buttonText.innerHTML = '<div class="loading"></div> Processing...';

    setTimeout(() => {
        currentBalance -= total;
        document.getElementById('currentBalance').textContent = currentBalance.toLocaleString();

        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('show');

        amountInput.value = '';
        document.querySelectorAll('.quick-amount-btn').forEach(btn => {
            btn.classList.remove('selected');
            const btnAmount = parseInt(btn.textContent.replace('€', '').replace(',', ''));
            if (btnAmount > currentBalance) {
                btn.disabled = true;
            }
        });

        document.querySelectorAll('.withdrawal-method').forEach(method => {
            method.classList.remove('selected');
        });
        document.querySelector('.withdrawal-method').classList.add('selected');

        updateSummary();
        updateButton();

        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

        isProcessing = false;
    }, 3000);
}

function goBack() {
    // Removed confirm popup - just direct navigation
    window.location.href = 'dashboard.html';
}

document.querySelectorAll('.quick-amount-btn').forEach(btn => {
    const amount = parseInt(btn.textContent.replace('€', '').replace(',', ''));
    if (amount > currentBalance) {
        btn.disabled = true;
    }
});

updateSummary();
updateButton();
