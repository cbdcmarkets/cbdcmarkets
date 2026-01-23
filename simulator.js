let balance = 1000000;
const balanceEl = document.getElementById("balance");
const logEl = document.getElementById("log");

function buyAsset() {
  const price = parseInt(document.getElementById("asset").value);

  if (balance >= price) {
    log(`Initiating CBDC atomic swap...`);
    setTimeout(() => {
      balance -= price;
      updateBalance();
      log(`✔ Bond token acquired. Settlement completed (T+0).`);
    }, 800);
  } else {
    log(`✖ Insufficient CBDC balance.`);
  }
}

function sellAsset() {
  const price = parseInt(document.getElementById("asset").value);

  log(`Processing token redemption...`);
  setTimeout(() => {
    balance += price;
    updateBalance();
    log(`✔ CBDC credited. Asset redeemed successfully.`);
  }, 800);
}

function updateBalance() {
  balanceEl.innerText = balance.toLocaleString();
}

function log(message) {
  logEl.innerHTML += `<br>➤ ${message}`;
  logEl.scrollTop = logEl.scrollHeight;
}
