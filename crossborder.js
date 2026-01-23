let crossBalance = 1000000;
let tradesExecuted = 0;
let totalMoved = 0;

const balanceEl = document.getElementById("balance");
const logEl = document.getElementById("log");
const scoreboardEl = document.getElementById("scoreboard");

function updateBalance() {
  if (balanceEl) balanceEl.innerText = crossBalance.toLocaleString() + " e₹";
}

function log(message) {
  if (logEl) {
    logEl.innerHTML += `<br>➤ ${message}`;
    logEl.scrollTop = logEl.scrollHeight;
  }
}

function updateScoreboard(amount) {
  tradesExecuted++;
  totalMoved += amount;
  if (scoreboardEl) {
    scoreboardEl.innerHTML = `
      <h3>Settlement Scoreboard</h3>
      <p>Trades executed: ${tradesExecuted}</p>
      <p>Total CBDC moved: ${totalMoved.toLocaleString()} e₹</p>
    `;
  }
}

function simulateCrossBorder() {
  const price = parseInt(document.getElementById("asset").value);
  const rate = parseFloat(document.getElementById("cbdcPair").value);

  if (crossBalance >= price) {
    log(`Initiating cross-border settlement at FX rate ${rate}...`);
    setTimeout(() => {
      const settledAmount = price * rate;
      crossBalance -= price;
      updateBalance();
      log(`✔ Cross-border trade complete. Received ${settledAmount.toLocaleString()} in foreign CBDC.`);
      updateScoreboard(price);
    }, 1200);
  } else {
    log("✖ Insufficient CBDC balance for this trade.");
  }
}

document.addEventListener("DOMContentLoaded", updateBalance);
