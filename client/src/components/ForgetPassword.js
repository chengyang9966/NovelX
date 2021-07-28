import Title  from "./Title";
import React,{useState} from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Checker from "../utils/Checker";
import Loading from "./Loading";
import PopUp from "./PopUp";
const ForgetPassword=()=>{
const [data,setData]=useState({
    email:'',
})
let ErrorData={
    EmailText:'',
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
const history=useHistory()
   
const onSubmit=(e)=>{
    setLoading(true);
    e.preventDefault();
    console.log('data: ', data);
    if(Checker(data).Error===true){
        SetError(Checker(data))
        setLoading(false);
        setTimeout(()=>{
            SetError(ErrorData)
        },3000)
    }else{
        axios.post('/api/forgetpassword',
        data
        ).then(res=>{
            setLoading(false);
            console.log('res: ', res);
            if(res.status===200){
                setAlert({
                    Message:res.data.message,
                    Title:'Recovery Password Sent',
                    Error:true
                })
            }else{
                setAlert({
                    Message:res.data.message,
                    Title:'Not User',
                    Error:true
                })
                console.error(res.data)
            }
        }).catch(err=>{
            setLoading(false);
            setAlert({
                Message:'User Not Found',
                Title:'Not User',
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
  <div className="my-5 px-4 d-grid">
  <button type="submit" className="btn btn-danger rounded-pill">Send Recovery Password</button>
  </div>
  <div className="my-5 px-4 d-grid">
  <button type="submit" onClick={()=> history.push('/login')} className="btn btn-primary rounded-pill">Return Login</button>
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
export default ForgetPassword