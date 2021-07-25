const CreateToken=()=>{
    const user =JSON.parse(localStorage.getItem('user'))
    if(user){
        console.log('user: ', user);
        return  user.accessToken? user.accessToken:''
        
    }else{
        return ''
    }
}
export default CreateToken