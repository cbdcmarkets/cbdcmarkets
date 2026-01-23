let crossBalance = 1000000;
let tradesExecuted = 0;
let totalMoved = 0;

// Load elements
const balanceEl = document.getElementById("balance");
const logEl = document.getElementById("log");
const scoreboardEl = document.getElementById("scoreboard");

// Load AI market events
let marketEvents = [];

fetch("market-events.json")
  .then(res => res.json())
  .then(data => {
    marketEvents = data;
    log("AI Market Shock engine online.");
    triggerMarketEvents(); // start events loop
  })
  .catch(err => log("⚠ Failed to load market events."));

// Update wallet
function updateBalance() {
  if (balanceEl) balanceEl.innerText = crossBalance.toLocaleString() + " e₹";
}

// Log messages
function log(message) {
  if (logEl) {
    logEl.innerHTML += `<br>➤ ${message}`;
    logEl.scrollTop = logEl.scrollHeight;
  }
}

// Update scoreboard
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

// Execute cross-border trade
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
    }, 1000);
  } else {
    log("✖ Insufficient CBDC balance for this trade.");
  }
}

// AI Market Events Loop
function triggerMarketEvents() {
  setInterval(() => {
    if (!marketEvents.length) return;

    const event = marketEvents[Math.floor(Math.random() * marketEvents.length)];
    log(`⚡ Market Shock: ${event.event} → ${event.impact}`);

    // Apply effect on balance as demo (can expand to individual asset prices)
    if(event.impact.includes("drop")) {
      let drop = Math.floor(Math.random() * 5000);
      crossBalance -= drop;
      log(`💸 Loss due to shock: ${drop.toLocaleString()} e₹`);
    } else if(event.impact.includes("rise")) {
      let gain = Math.floor(Math.random() * 7000);
      crossBalance += gain;
      log(`💰 Gain due to rally: ${gain.toLocaleString()} e₹`);
    } else if(event.impact.includes("fluctuates")) {
      log(`🔄 FX rates have fluctuated. Adjust your trades accordingly.`);
    }

    updateBalance();
  }, 15000); // every 15 seconds
}

document.addEventListener("DOMContentLoaded", updateBalance);
