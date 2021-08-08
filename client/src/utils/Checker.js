
const Checker=(props)=>{
const {email,fname,lname,password,password2,roleid,phonenumber}=props
let error={}
if(email){
    const reg=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(!reg.test(email)){
        error.EmailText='Please provide a valid email';
        error.Error=true;
    }
}else{
    error.EmailText='Please provide a email';
        error.Error=true; 
}

if(fname!==undefined){
    if(fname===''){
        error.FnameText='Please provide a First Name';
        error.Error=true;
    }
}
if(lname!==undefined){
    if(lname===''){
        error.LnameText='Please provide a Last Name';
        error.Error=true;
    }
}
if(password!==undefined){
    if(password.length<6){
        error.PasswordText='Please provide a password longer than 6 digit';
        error.Error=true;
    }
}
if(password2!==undefined){
    if(password!==password2){
        error.Password2Text='Please provide same Password';
        error.Error=true;
    }
}
if(phonenumber!==undefined){
    if(phonenumber.length<10){
        error.PhoneText='Please provide the correct number';
        error.Error=true;
    }
}

if(roleid!==undefined){
    if(roleid===-1){
        error.RoleText='Please select a valid Role';
        error.Error=true;
    }
}

console.log('error: ', error);
return error

}

export default Checker