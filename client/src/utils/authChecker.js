import axios from 'axios'
import {CreateToken} from './createToken'
const  CheckAuth=async()=>{
   

        let user=JSON.parse(localStorage.getItem('user'))
        let temp =false
        if(user&&Object.keys(user).length>0){
            if(CreateToken()!==''){
                let axiosConfig={ 
                    headers:{
                    'Content-Type': 'application/json',
                    "x-access-token":CreateToken()
                    
                }}
             await  axios.post('/api/auth',{
                    userid:user.UserId
                },axiosConfig
                ).then(res=>{
                    console.log('res1231: ', res);
                    if(res.status===201){
                        temp= true 
                    }
                })
            }
        }
        return temp
}
export default CheckAuth