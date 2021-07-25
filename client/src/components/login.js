import Title  from "./Title";
import React,{useState} from "react";
import axios from "axios"
import { useHistory } from "react-router";
const Login=()=>{
const [data,setData]=useState({
    email:'',
    password:''
})
const history=useHistory()
   
const onSubmit=(e)=>{
    e.preventDefault();
    axios.post('/api/login',
    data
    ).then(res=>{
        if(res.status===200){
            localStorage.setItem('user',JSON.stringify(
               res.data
            ))
            history.push('/home')
        }else{
            console.error(res.data)
        }
    })

}
const onChange=(name,value)=>{
    setData({
        ...data,
        [name]:value
    })
}


    return(
        <div >
         <Title/>
        <form onSubmit={(data)=>onSubmit(data)}>
  <div className="mb-3 px-4">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="email" value={data.email} onChange={e=>onChange(e.target.name,e.target.value)} className="form-control rounded-pill" id="exampleInputEmail1" />
  </div>
  <div className="mb-3 px-4">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name="password" value={data.password} onChange={e=>onChange(e.target.name,e.target.value)} className="form-control rounded-pill" id="exampleInputPassword1"/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}
export default Login