function checkInput({username,password}) {
    if(username.lenght<6){
        return false
    }
    if(password.length<8){
        return false
    }
}


module.exports = {
    checkInput,
}
