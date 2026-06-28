// ===== MARSA SYSTEM =====

// Default Admin Account
const ADMIN_USERNAME = "marsaadmin";
const ADMIN_PASSWORD = "marsa123";

// Load saved members
let members = JSON.parse(localStorage.getItem("marsaMembers")) || [];

// Default members
if (members.length === 0) {
members = [
{
name: "KATENDE MARVIN EINSTEIN",
role: "Founder & Director General"
},
{
name: "JOEL DAVID MUNJI",
role: "Deputy Director"
},
{
name: "ZZIWA UMAR",
role: "Operations Director"
}
];

saveMembers();

}

// Login
function login() {

let username =  
    document.getElementById("username").value;  

let password =  
    document.getElementById("password").value;  

if (  
    username === ADMIN_USERNAME &&  
    password === ADMIN_PASSWORD  
) {  

    document.getElementById("loginScreen")  
        .style.display = "none";  

    document.getElementById("system")  
        .style.display = "block";  

    renderMembers();  

} else {  

    document.getElementById("loginMessage")  
        .innerHTML = "Invalid username or password";  

}

}

// Save Data
function saveMembers() {

localStorage.setItem(  
    "marsaMembers",  
    JSON.stringify(members)  
);

}

// Render Members
function renderMembers() {

const list =  
    document.getElementById("memberList");  

list.innerHTML = "";  

members.forEach((member, index) => {  

    const li =  
        document.createElement("li");  

    li.innerHTML = `  
        <strong>${member.name}</strong>  
        <br>  
        ${member.role}  
        <br><br>  
        <button onclick="deleteMember(${index})">  
            Delete  
        </button>  
    `;  

    list.appendChild(li);  

});  

document.getElementById("memberCount")  
    .innerText = members.length;

}

// Add Member
function addMember() {

let name =  
    document.getElementById("memberName").value;  

let role =  
    document.getElementById("memberRole").value;  

if (  
    name.trim() === "" ||  
    role.trim() === ""  
) {  
    alert("Fill all fields");  
    return;  
}  

members.push({  
    name,  
    role  
});  

saveMembers();  

renderMembers();  

document.getElementById("memberName").value = "";  
document.getElementById("memberRole").value = "";

}

// Delete Member
function deleteMember(index) {

if (  
    confirm(  
        "Delete this member?"  
    )  
) {  

    members.splice(index, 1);  

    saveMembers();  

    renderMembers();  

}

}

// Search Member
function searchMember() {

let input =  
    document.getElementById("searchMember")  
        .value  
        .toLowerCase();  

let items =  
    document.querySelectorAll(  
        "#memberList li"  
    );  

items.forEach(item => {  

    let text =  
        item.innerText.toLowerCase();  

    if (  
        text.includes(input)  
    ) {  

        item.style.display = "block";  

    } else {  

        item.style.display = "none";  

    }  

});

}

// Navigation
function showSection(id) {

let pages =  
    document.querySelectorAll(".page");  

pages.forEach(page => {  

    page.style.display = "none";  

});  

document.getElementById(id)  
    .style.display = "block";

}

// Auto Render
window.onload = function () {

if (  
    document.getElementById("memberList")  
) {  

    renderMembers();  

}

};