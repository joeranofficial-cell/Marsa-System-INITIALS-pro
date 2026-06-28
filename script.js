console.log("MARSA SYSTEM INITIALIZED 🚀");

// ===== ADMIN LOGIN =====
const ADMIN_USERNAME = "marsaadmin";
const ADMIN_PASSWORD = "marsa123";

// ===== DATABASE =====
let members = JSON.parse(localStorage.getItem("marsaMembers")) || [];

// Default crew setup
if (members.length === 0) {
    members = [
        { name: "KATENDE MARVIN EINSTEIN", role: "Founder & Director General" },
        { name: "JOEL DAVID MUNJI", role: "Deputy Director" },
        { name: "ZZIWA UMAR", role: "Operations Director" }
    ];
    saveMembers();
}

// ===== LOGIN SYSTEM =====
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("system").style.display = "block";

        renderMembers();
        showSection("dashboard");
    } else {
        document.getElementById("loginMessage").innerText =
            "ACCESS DENIED ❌";
    }
}

// ===== SAVE DATA =====
function saveMembers() {
    localStorage.setItem("marsaMembers", JSON.stringify(members));
}

// ===== RENDER MEMBERS =====
function renderMembers() {
    const list = document.getElementById("memberList");
    if (!list) return;

    list.innerHTML = "";

    members.forEach((member, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${member.name}</strong><br>
            ${member.role}<br><br>
            <button onclick="deleteMember(${index})">DELETE</button>
        `;

        list.appendChild(li);
    });

    const counter = document.getElementById("memberCount");
    if (counter) counter.innerText = members.length;
}

// ===== ADD MEMBER =====
function addMember() {
    const name = document.getElementById("memberName").value;
    const role = document.getElementById("memberRole").value;

    if (!name.trim() || !role.trim()) {
        alert("Please fill all fields");
        return;
    }

    members.push({ name, role });
    saveMembers();
    renderMembers();

    document.getElementById("memberName").value = "";
    document.getElementById("memberRole").value = "";
}

// ===== DELETE MEMBER =====
function deleteMember(index) {
    if (confirm("Delete this crew member?")) {
        members.splice(index, 1);
        saveMembers();
        renderMembers();
    }
}

// ===== SEARCH =====
function searchMember() {
    const input = document
        .getElementById("searchMember")
        .value
        .toLowerCase();

    document.querySelectorAll("#memberList li").forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(input)
            ? "block"
            : "none";
    });
}

// ===== NAVIGATION =====
function showSection(id) {
    document.querySelectorAll(".page").forEach(page => {
        page.style.display = "none";
    });

    const target = document.getElementById(id);
    if (target) target.style.display = "block";
}

// ===== SYSTEM BOOT =====
window.onload = () => {
    console.log("Checking MARSA database...");

    if (document.getElementById("memberList")) {
        renderMembers();
    }

    // auto open dashboard if system already visible
    if (document.getElementById("system")) {
        showSection("dashboard");
    }
};
