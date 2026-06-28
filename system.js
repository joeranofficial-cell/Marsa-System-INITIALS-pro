const MARSA = {
    // =========================
    // USER SESSION
    // =========================
    user: JSON.parse(localStorage.getItem("marsa_user")),

    init: function () {
        this.user = JSON.parse(localStorage.getItem("marsa_user"));
    },

    isLoggedIn: function () {
        return this.user !== null && this.user !== undefined;
    },

    getUser: function () {
        return this.user;
    },

    getRole: function () {
        return this.user ? this.user.role : "GUEST";
    },

    getId: function () {
        return this.user ? this.user.id : "UNKNOWN";
    },

    logout: function () {
        localStorage.removeItem("marsa_user");
        window.location.href = "login.html";
    },

    // =========================
    // ACCESS CONTROL
    // =========================
    requireLogin: function () {
        if (!this.isLoggedIn()) {
            window.location.href = "login.html";
        }
    },

    requireFounder: function () {
        if (!this.isLoggedIn() || this.getRole() !== "FOUNDER") {
            alert("ACCESS DENIED: FOUNDERS ONLY");
            window.location.href = "dashboard.html";
        }
    },

    requireEngineer: function () {
        if (!this.isLoggedIn() || 
            (this.getRole() !== "ENGINEER" && this.getRole() !== "FOUNDER")) {
            alert("ACCESS DENIED: ENGINEER LEVEL REQUIRED");
            window.location.href = "dashboard.html";
        }
    },

    // =========================
    // SYSTEM STATUS
    // =========================
    systemStatus: function () {
        return {
            online: true,
            user: this.getId(),
            role: this.getRole(),
            time: new Date().toLocaleString()
        };
    },

    // =========================
    // SHARED DATA (MISSIONS)
    // =========================
    getMissions: function () {
        return JSON.parse(localStorage.getItem("marsa_missions")) || [];
    },

    saveMissions: function (missions) {
        localStorage.setItem("marsa_missions", JSON.stringify(missions));
    },

    addMission: function (mission) {
        let missions = this.getMissions();
        missions.push(mission);
        this.saveMissions(missions);
    },

    updateMission: function (id, updatedData) {
        let missions = this.getMissions();

        missions = missions.map(m => {
            if (m.id === id) {
                return { ...m, ...updatedData };
            }
            return m;
        });

        this.saveMissions(missions);
    },

    // =========================
    // SHARED DATA (PERSONNEL)
    // =========================
    getPersonnel: function () {
        return JSON.parse(localStorage.getItem("marsa_personnel")) || [];
    },

    savePersonnel: function (data) {
        localStorage.setItem("marsa_personnel", JSON.stringify(data));
    }
};

// Auto initialize on load
MARSA.init();