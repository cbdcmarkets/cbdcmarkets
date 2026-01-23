// ROLE SELECTION POPUP
const body = document.body;
const roleModal = document.createElement("div");
roleModal.id = "roleModal";
roleModal.style.position = "fixed";
roleModal.style.top = 0;
roleModal.style.left = 0;
roleModal.style.right = 0;
roleModal.style.bottom = 0;
roleModal.style.background = "rgba(0,0,0,0.85)";
roleModal.style.display = "flex";
roleModal.style.justifyContent = "center";
roleModal.style.alignItems = "center";
roleModal.style.zIndex = 1000;
roleModal.innerHTML = `
  <div style="text-align:center; color:#00f5d4;">
    <h2>Select Your Role</h2>
    <button class="role-btn" onclick="selectRole('investor')">Investor</button>
    <button class="role-btn" onclick="selectRole('centralBank')">Central Bank</button>
  </div>
`;
body.appendChild(roleModal);

let userRole = "investor"; // default

function selectRole(role) {
  userRole = role;
  roleModal.style.display = "none";
  if(role === "centralBank") {
    alert("Central Bank mode: You can influence liquidity, settlement, and shocks.");
  } else {
    alert("Investor mode: You can trade normally and react to market events.");
  }
}
