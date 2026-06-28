window.addEventListener("load", function () {

    // Ensure system is initialized
    if (!MARSA.isLoggedIn()) {
        window.location.href = "login.html";
        return;
    }

    // =========================
    // USER INFO DISPLAY
    // =========================
    const user = MARSA.getUser();

    const header = document.querySelector(".header p");
    if (header) {
        header.innerText = `WELCOME ${user.id} (${user.role}) - MARSA ACTIVE`;
    }

    // =========================
    // SYSTEM STATUS
    // =========================
    const status = document.getElementById("sysStatus");
    if (status) {
        status.innerText = "ONLINE";
    }

    // =========================
    // SECURITY LEVEL
    // =========================
    const security = document.getElementById("security");
    if (security) {
        let level = "LOW";

        if (user.role === "FOUNDER") {
            level = "MAXIMUM";
        } else if (user.role === "ENGINEER") {
            level = "MEDIUM";
        }

        security.innerText = level;
    }

    // =========================
    // LIVE MISSION COUNT
    // =========================
    const missions = MARSA.getMissions();

    const missionCard = document.querySelectorAll(".card")[2]; 
    if (missionCard) {
        missionCard.innerHTML = `
            <h3>Engineering Projects</h3>
            <br>
            ${missions.length} Active Missions
        `;
    }

    // =========================
    // LIVE PERSONNEL COUNT
    // =========================
    const personnel = MARSA.getPersonnel();

    const personnelCard = document.querySelectorAll(".card")[1];
    if (personnelCard) {
        personnelCard.innerHTML = `
            <h3>Personnel Count</h3>
            <br>
            ${personnel.length} Members
        `;
    }

    // =========================
    // SYSTEM HEALTH (SIMULATED)
    // =========================
    const healthIndex = Math.floor(Math.random() * 100);

    const healthCard = document.createElement("div");
    healthCard.className = "card";
    healthCard.innerHTML = `
        <h3>System Health</h3>
        <br>
        ${healthIndex}% Stable
    `;

    document.querySelector(".cards").appendChild(healthCard);

});