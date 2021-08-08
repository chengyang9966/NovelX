import Title  from "./Title";
import React,{useState,useEffect} from "react";
import axios from "axios"
import { useHistory,useLocation } from "react-router";
import Checker from "../utils/Checker";
import Loading from "./Loading";
import PopUp from "./PopUp";
import EyesIcon from "./Eye";
const ResetPassword=()=>{
const [data,setData]=useState({
    email:'',
    password:'',
    password2:'',
})
let ErrorData={
    EmailText:'',
    PasswordText:'',
    Password2Text:'',
    Error:false
}
let ErrorUser={
    Message:'',
    Title:'',
    Error:false
}
const [alert,setAlert]=useState(ErrorUser)
const [loading,setLoading]=useState(false)
const [view,setView]=useState(false)
const [view2,setView2]=useState(false)
const [error,SetError]=useState(ErrorData)
const history=useHistory()
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
let config={headers:{
    "x-access-token":query.get("token")
}}

    useEffect(()=>{
        axios.post('/api/verifyReset',
        {userid:Number(query.get("id"))}
        ,config).then(res=>{
            console.log('res: ', res);
            res.status!==200&&history.push('/Nofound')
            
        }).catch(err=>{
            history.push('/expired')
        })
    },[])





console.log(query.get("token"))
  const onSubmit=(e)=>{


    setLoading(true);
    e.preventDefault();
    if(Checker(data).Error===true){
        setLoading(false);
        SetError(Checker(data))

        setTimeout(()=>{
            SetError(ErrorData)
        },3000)
    }else{
        axios.post('/api/resetpassword',
        Object.assign(data,{userid:Number(query.get("id"))}) ,
        config
        ).then(res=>{
            setLoading(false);
            console.log('res: ', res);
            if(res.status===200){
                localStorage.setItem('user',JSON.stringify(
                   res.data
                ))
                history.push('/home')
            }else{
                setAlert({
                    Message:res.data.message,
                    Title:'Change Password Failed',
                    Error:true
                })
                console.error(res.data)
            }
        }).catch(err=>{
            console.log('err: ', err.message);
            setLoading(false);
            setAlert({
                Message:err.status,
                Title:'Change Password Failed',
                Error:true
            })

        })
    }

}
const onChange=(name,value)=>{
    setData({
        ...data,
        [name]:value
    })
}


    return(
        <>
        <div >
            {loading&&<Loading/>}
         <Title/>
        <form onSubmit={(data)=>onSubmit(data)}>
  <div className="mb-3 px-4">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="email" value={data.email} onChange={e=>onChange(e.target.name,e.target.value)} className="form-control rounded-pill" id="exampleInputEmail1" />
  </div>
  <div className="mb-3 px-4 text-danger " >
      <div>{error.EmailText}</div>
  </div>
    <label for="exampleInputPassword1" className="mb-3 px-4 form-label">Password</label>
  <div className="mb-3 px-4 d-flex align-items-center">
    <input type={view?"text":"password"} name="password" value={data.password} onChange={e=>onChange(e.target.name,e.target.value)} className="form-control rounded-pill" id="exampleInputPassword1"/>
  {EyesIcon(view,()=>setView(!view))}
  </div>
  <div className="mb-3 px-4 text-danger " >
      <div>{error.PasswordText}</div>
  </div> 
    <label for="exampleInputPassword1" className="mb-3 px-4  form-label">Confirm Password</label>
  <div className="mb-3 px-4 d-flex align-items-center">
    <input type={view?"text":"password"} name="password2" value={data.password2} onChange={e=>onChange(e.target.name,e.target.value)} className="form-control rounded-pill" id="exampleInputPassword1"/>
    {EyesIcon(view2,()=>setView2(!view2))}
  </div>
  <div className="mb-3 px-4 text-danger " >
      <div>{error.Password2Text}</div>
  </div>
  <div className="my-5 px-4 d-grid">
  <button type="submit" disabled={error.Error} className="btn btn-primary rounded-pill">Reset Passsword</button>
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
export default ResetPassword