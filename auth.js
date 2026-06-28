// MARSA CORE SECURITY SYSTEM

const USERS = [

{
username:"KATENDE MARVIN EINSTEIN",
role:"FOUNDER",
passwordHash:"marsa_founder_001",
protected:true
},


{
username:"ZZIWA UMAR",
role:"MEMBER",
passwordHash:"marsa_user_002",
protected:true
},


{
username:"JOEL DAVID MUNJI",
role:"MEMBER",
passwordHash:"marsa_user_003",
protected:true
}

];



// LOGIN CHECK

function loginUser(name,password){


let user = USERS.find(

u => u.username === name

);



if(!user){

return false;

}



if(password === user.passwordHash){

localStorage.setItem(
"ACTIVE_USER",
JSON.stringify(user)
);


return true;

}


return false;

}





// CHANGE PASSWORD

function changePassword(name,newPassword){


let user = USERS.find(

u=>u.username===name

);



if(user){


user.passwordHash=newPassword;


localStorage.setItem(
"USERS",
JSON.stringify(USERS)
);


return "PASSWORD UPDATED";


}


return "USER NOT FOUND";


}