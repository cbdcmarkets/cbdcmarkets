let balance = 1000000;

function updateBalance() {
  document.getElementById("balance").innerText =
    balance.toLocaleString() + " e₹";
}

function log(msg) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += `<br>➤ ${msg}`;
  logBox.scrollTop = logBox.scrollHeight;
}

function buyAsset() {
  const price = parseInt(document.getElementById("asset").value);
  if (balance >= price) {
    log("Initiating CBDC atomic settlement...");
    setTimeout(() => {
      balance -= price;
      updateBalance();
      log("✔ Asset token acquired. T+0 settlement complete.");
    }, 800);
  } else {
    log("✖ Insufficient CBDC balance.");
  }
}

function sellAsset() {
  const price = parseInt(document.getElementById("asset").value);
  log("Redeeming token...");
  setTimeout(() => {
    balance += price;
    updateBalance();
    log("✔ CBDC credited to wallet.");
  }, 800);
}

document.addEventListener("DOMContentLoaded", updateBalance);
