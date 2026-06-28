let missions = [];

function createMission() {
    const name = document.getElementById("missionName").value;
    const priority = document.getElementById("missionPriority").value;

    if (!name) {
        alert("Mission name required");
        return;
    }

    const mission = {
        id: "MS-" + Math.floor(Math.random() * 10000),
        name: name,
        priority: priority,
        status: "ACTIVE",
        time: new Date().toLocaleString()
    };

    missions.push(mission);

    document.getElementById("missionName").value = "";

    renderMissions();
}

function renderMissions() {
    const list = document.getElementById("missionList");
    list.innerHTML = "";

    missions.forEach(m => {
        const div = document.createElement("div");
        div.style.border = "1px solid #00f7ff";
        div.style.margin = "10px";
        div.style.padding = "10px";
        div.style.boxShadow = "0 0 5px #00f7ff";

        div.innerHTML = `
            <b>${m.name}</b><br>
            ID: ${m.id}<br>
            Priority: ${m.priority}<br>
            Status: ${m.status}<br>
            Time: ${m.time}<br><br>
            <button onclick="completeMission('${m.id}')">MARK COMPLETE</button>
        `;

        list.appendChild(div);
    });
}

function completeMission(id) {
    missions = missions.map(m => {
        if (m.id === id) {
            m.status = "COMPLETED";
        }
        return m;
    });

    renderMissions();
}