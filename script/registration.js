
// Get the form data
const form =  document.forms['form'];

const nameErr = document.getElementById("err");
const regErr = document.getElementById('regErr')

const fullName = form["fullName"];
const username = form["username"];
const email = form["email"];
const phone = form["phone"];
const password = form["password"];
const confirmPassword = form["confirm-password"];
console.log(nameErr)




form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const errMessage = validateInput(fullName,   username, email, phone, password, confirmPassword)


    if(errMessage== false){

        const data = new FormData();
        data.append("Name", fullName.value);
        data.append('username', username.value);
        data.append("email",email.value);
        data.append("phone",phone.value);
        data.append('password', password.value)
        
        fetch('http://localhost/googleapi/postUsers.php', {
            method: "post",
            body: data,
        })
        .then(res=>res.json())
        .then(data=>
            {
                console.log(data.use)
               if(data.errcode.code==="00"){
                   sessionStorage.setItem('login',JSON.stringify(data.user))
                   location.href="../index.html";
               }
               else{
                   regErr.innerHTML =` ${data.errcode.user}`;
               }
                
            }
            )
        .catch(err=>console.log(err.message))
 
    }
    else{
       
            nameErr.innerHTML=` <span> ${errMessage[1]} </span>`
       
    }
})


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Validation Functions

function validateInput(Name,   usern, ema, phone, password, confirmPassword){
    let errMessage = [];

    if((Name.value == "") || (usern == "") || (ema.value == "") || (phone.value == "")){
        errMessage[0] = "input fields must not be empty"; 
    }
    if(checkUsername(usern.value)==true){
        errMessage[1] = "Enter a valid user name: username must contain alphabet, number and symbol"; 
    }
    if(checkEmail(ema.value)==true){
        errMessage[2] = "Enter a valid email address"; 
    }
    if(checkPhone(phone.value)==true){
        errMessage[3] = "Enter a valid phone number"; 
    }
    if(checkPassword(password)==true){
        errMessage[4] = "Password must contain an uppercase, lowercase and symbol"; 
    } 
    if(password.value !== confirmPassword.value){
      
        errMessage[4] += '\nConfirm Password'
    }
    
    if(errMessage.length>0){
        return errMessage;
    }
    else{
        return false
    }
}


// Validation Functions
function checkEmpty(value){
    if(value==""){
        return true
    }
} 

// validate name
function checkName(value){
    let regex = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
    if(regex.test(value)==false){
        return true
    }
}

// validate email
function checkEmail(value){
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(regex.test(value)==false){
        return true
    }
}

// validate phone number
function checkPhone(value){
    let regex =  /^\d+$/;;
    if(regex.test(value)==false){
        return true
    }
}

// Validate username
function checkUsername(value){
    let regex = /^[a-zA-Z0-9]+$/;
    if(regex.test(value)==false){
        return true
    }
}


// Validate password
function checkPassword(value){
    let regex = /(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(regex.test(value)==false){
        return true
    }
}