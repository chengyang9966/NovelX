import Title  from "./Title";
import React,{useState,useEffect} from "react";
import axios from "axios"
import { useHistory } from "react-router";
import Checker from "../utils/Checker";
import Loading from "./Loading";
import PopUp from "./PopUp";
import EyesIcon from "./Eye";
import { EncrytionObj } from "../utils/encryption";
import Subtitle from "./SubTitle";
const Register=()=>{
const [data,setData]=useState({
    email:'',
    password:'',
    fname:'',
    lname:'',
    roleid:3,
})
let ErrorData={
    EmailText:'',
    FnameText:'',
    LnameText:'',
    PasswordText:'',
    RoleText:'',
    Error:false
}
let ErrorUser={
    Message:'',
    Title:'',
    Error:false
}
const [alert,setAlert]=useState(ErrorUser)
const [loading,setLoading]=useState(false)
const [error,SetError]=useState(ErrorData)
const [roles,SetRoles]=useState([])
const [viewPassword,SetviewPassword]=useState(false)
const history=useHistory()

useEffect(()=>{
    axios.get('/api/getRoles').then(res=>{
        SetRoles(res.data)
    })
},[])




const onSubmit=(e)=>{
    setLoading(true);
    e.preventDefault();
    if(Checker(data).Error===true){
        console.log('Checker(data): ', Checker(data));
        setLoading(false);
        SetError(Checker(data))

        setTimeout(()=>{
            SetError(ErrorData)
        },3000)
    }else{
        axios.post('/api/registerUser',
        data
        ).then(res=>{
            setLoading(false);
            console.log('res: ', res);
            if(res.status===201){
                localStorage.setItem('user',EncrytionObj(res.data))
                setLoading(false);
                setAlert({
                    Message:res.data.message,
                    Title:'Register Success',
                    Error:true,
                })
                history.push('/login')
            }else{
                setAlert({
                    Message:res.data.message,
                    Title:'Register Fail',
                    Error:true
                })
                console.error(res.data)
            }
        }).catch(err=>{
            setLoading(false);
            setAlert({
                Message:'User Not Found',
                Title:'Register Fail',
                Error:true
            })

        })
    }

}
const onChange=(name,value)=>{
    console.log('name,value: ', name,value);
    setData({
        ...data,
        [name]:value
    })
}


    return(
        <>
        <div >
            {loading&&<Loading/>}
            <Subtitle title='register'/>
        <form onSubmit={(data)=>onSubmit(data)}>
        <div className="row mb-3 px-4">
    <div className="col">
    <label for="exampleInputEmail1" className="form-label">First Name</label>
      <input type="text"  name="fname" value={data.fname} onChange={e=>onChange(e.target.name,e.target.value)}  className="form-control rounded-pill" placeholder="First name"/>
    </div>

    <div className="col">
    <label for="exampleInputEmail1" className="form-label">Last Name</label>
      <input type="text"  name="lname" value={data.lname} onChange={e=>onChange(e.target.name,e.target.value)}  className="form-control rounded-pill" placeholder="Last name"/>
    </div>
  </div>    
  <div className="row mb-3 px-4 ">
  <div className=" col text-danger " >
     {error.FnameText}
  </div>
  <div className="text-danger col" >
      {error.LnameText}
  </div>
  </div>
  <div className="mb-3 px-4">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="email" value={data.email} onChange={e=>onChange(e.target.name,e.target.value)} className="form-control rounded-pill" id="exampleInputEmail1" />
  </div>
  <div className="mb-3 px-4 text-danger " >
      <div>{error.EmailText}</div>
  </div>
    <label for="exampleInputPassword1" className="form-label  px-4">Password</label>
  <div  style={{width:'100%',justifyContent:'flex-end'}} className="mb-3 px-4 d-flex align-items-center">
    <input type={viewPassword?'text':"password"} name="password" value={data.password} onChange={e=>onChange(e.target.name,e.target.value)} className="form-control rounded-pill" id="exampleInputPassword1"/>
    {EyesIcon(viewPassword,()=>SetviewPassword(!viewPassword),true)}
  </div>
  <div className="mb-3 px-4 text-danger " >
      <div>{error.PasswordText}</div>
  </div>
  <div className=" mb-3 px-4">
  <label for="exampleInputPassword1" className="form-label">Roles</label>
  <select className="rounded-pill form-control" id="inputGroupSelect01">
      {
          roles.length>0&&roles.map(w=>{
              return(

                  <option key={w.id} name='roleid' onChange={e=>onChange(e.target.name,e.target.value)} selected={data.roleid} value={data.roleid}>{w.name}</option>
              )
          })
      }
  </select>
</div>
  <div className="my-5 px-4 d-grid">
  <button type="submit" disabled={error.Error} className="btn btn-primary rounded-pill">Register</button>
  </div>
  <div className="my-5 px-4 d-grid">
  <button type="submit" onClick={()=> history.push('/login')} disabled={error.Error} className="btn btn-danger rounded-pill">Login</button>
  </div>
</form>
        </div>
{/* <Card title="Hii" description="HEY"  buttonText="dasd" /> */}
{alert.Error&&
<PopUp type="ALERT"  title={alert.Title} description={alert.Message} close={()=>setAlert({
    ...alert,
    Error:false
})} />
}
    </>
    )
}
export default Register