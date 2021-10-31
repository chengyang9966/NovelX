import { DescrytionObj } from "./encryption"

const CreateToken=()=>{
    const user =DescrytionObj('user')
    if(user){
        return  user.accessToken? user.accessToken:''
        
    }else{
        return ''
    }
}

const CreateHeader=()=>{
    let config={
        headers:{
            'Content-Type': 'application/json',
            "x-access-token":CreateToken()
            
        }
    }

    return config
}
const CreateImageHeader=()=>{
    let config={
        headers:{
            'Content-Type':'multipart/form-data',
            "x-access-token":CreateToken()
            
        }
    }

    return config
}
export  {CreateToken,CreateHeader,CreateImageHeader}