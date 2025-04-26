<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../../assets/css/dashboard.css">
    <link rel="shortcut icon" href="../../../assets/images/block-logo.png" type="image/x-icon">
    <title>Block - Wallet Dashboard</title>
</head>
<body>
    <!-- Nav-top section: Where you get your user profile/account — that links to other section, and also notifications -->
    <nav>
        <button class="profile-btn"><img src="../../../assets/icons/user-icon-circled.svg" alt="user-icon" width="45" height="45"><br><span class="user-name">{{ auth()->user()->firstname." ".auth()->user()->lastname }}</span></button>
        <button class="notifications-btn"><img src="../../../assets/icons/notifications-icon.svg" alt="notifications-button" width="45" height="45"></button>
    </nav>
    <!-- Wallet* -->
    <main class="wallet">
      <!-- Balance section: Comprises of account balance and a hide or show account button -->
      <section class="balance-section">
          <div>
            <span>Active Balance:</span> <button class="eye-btn"><img src="../../../assets/icons/eye-icon.svg" alt="eye-button" width="20" height="20"></button>
          </div>
          <div>
            <span class="balance">
              <span>$</span><span>5000</span><span>.00</span>
            </span>
          </div>
      </section>
      <!-- Quick action section: Section filled with quick actions like — withdraw, top up account, create contract-->
      <section class="quick-action">
        <p>Quick Action:</p>
        <div>
          <button><img src="../../../assets/icons/attach-money-icon.svg" alt="top-up-icon" width="35" height="35">Top Up</button>
          <button><img src="../../../assets/icons/money-bag-icon.svg" alt="withdraw-icon" width="35" height="35">Withdraw</button>
          <button><img src="../../../assets/icons/add-icon.svg" alt="create-contract-icon" width="35" height="35">Create Contract</button>
        </div>
      </section>
      <!-- Recent transactions section-->
      <section class="recent-transactions">
        <p>Recent Transactions:</p>
        <div class="recent-transactions-section">
          <p>No recent transaction...</p>
        </div>
      </section>
      <!-- Activities section: A section that records recent activities like — active contracts, disputed contracts and so on-->
      <!--<section class="activities">
        <p>Activities</p>
        <article>
          <div>
            <span>Active Contact(s)</span><span>0</span>
          </div>
          <div>
            <span>Completed Contact(s)</span><span>0</span>
          </div>
          <div>
            <span>Disputed</span><span>0</span>
          </div>
          <div>
            <span>Total Action(s)</span><span>0</span>
          </div>
        </article>
      </section>-->
    </main>
    <footer>
      <a href="#"><img src="../../../assets/icons/home-icon.svg" alt="home-icon" width="40" height="40"></a>
      <a href="#"><img src="../../../assets/icons/money-bag-icon.svg" alt="shop-icon" width="40" height="40"></a>
      <a href="#"><img src="../../../assets/icons/local-atm-icon.svg" alt="currency-icon" width="40" height="40"></a>
      <a href="#"><img src="../../../assets/icons/settings-icon.svg" alt="settings-icon" width="40" height="40"></a>
      <a href="#"><img src="../../../assets/icons/user-icon.svg" alt="user-icon" width="40" height="40"></a>
    </footer>
</body>
</html>