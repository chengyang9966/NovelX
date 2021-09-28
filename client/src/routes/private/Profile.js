import React,{useState,useEffect} from "react";
import axios from "axios"
import moment from "moment";
import Checker from "../../utils/Checker";
import Loading from "../../components/Loading";
import PopUp from "../../components/PopUp";
import {CreateHeader} from '../../utils/createToken';
import Card from '../../components/Card';
import MasterPageLayout from "../../components/masterPage";
import CountryList,{StateList} from "../../Types/CountryList";
import DropdownList from "../../components/DropdownOption";
import 'react-calendar/dist/Calendar.css';
import DatePickerComponent from "../../components/datePicker";
import { CapitalizeText } from "../../utils/TextConverter";
import { DescrytionObj } from "../../utils/encryption";
const ProfilePage=()=>{
  console.log('CountryList: ', CountryList.findIndex(w=>w==='Malaysia'));
    const [data,setData]=useState({
        email:'',
        password:'',
        fname:'',
        username:'',
        lname:'',
        rolename:'',
        phonenumber:'',
        address1:'',
        address2:'',
        city:'',
        state:'',
        postcode:'',
        country:'Malaysia',
        dob:new Date(),

    })
    const ErrorData={
        EmailText:'',
        FnameText:'',
        LnameText:'',
        PasswordText:'',
        RoleText:'',
        PhoneText:'',
        Error:false
    }
    const ErrorUser={
        Message:'',
        Title:'',
        Error:false
    }
  
    let config=CreateHeader()
    const [alert,setAlert]=useState(ErrorUser)
    const [loading,setLoading]=useState(false)
    const [openCard,SetOpenCard]=useState(false)
    const CardText={
      title:"Profile",
      description:"",
      setClose:()=>SetOpenCard(false)

    }
    const [error,SetError]=useState(ErrorData)
    const [cardTextForTitle,SetcardTextForTitle]=useState(CardText)
    const onChange=(name,value)=>{
        setData({
            ...data,
            [name]:value
        })
    }
    let userid=DescrytionObj(localStorage.getItem('user')).UserId
    useEffect(()=>{
        setLoading(true)
        axios.get(`/api/getusercontact/${userid}`,config).then(res=>{
            let ContactData=res.data[0]
            if(res.status===200){
                setData({
                  ...data,
                    email:ContactData.email,
                    username:ContactData.username,
                    fname:ContactData.fname,
                    lname:ContactData.lname,
                    rolename:ContactData.rolename,
                    address1:ContactData.address1,
                    address2:ContactData.address2,
                    city:ContactData.city,
                    country:ContactData.country,
                    state:ContactData.state,
                    postcode:ContactData.postcode,
                    dob:ContactData.dob? moment(ContactData.dob).toDate():new Date(),
                    phonenumber:ContactData.phonenumber,
                })

                setLoading(false)
            }
        })
    },[])



    const onSubmit=(e)=>{
        setLoading(true);
        e.preventDefault();
        let Newdata={...data,userid:userid} 
        if(data.password===''){
          delete Newdata.password
        }
        if(Checker(Newdata).Error===true){
            setLoading(false);
            SetError(Checker(Newdata))
         
            setTimeout(()=>{
                SetError(ErrorData)
            },3000)
        }else{

          axios.post(`/api/updateusercontact/${userid}`,Newdata,config).then(res=>{
            setLoading(false)
            SetcardTextForTitle({
              ...cardTextForTitle,
              description:CapitalizeText(res.data.message)
              
            })
            SetOpenCard(true);

          }).catch(error=>{
            setLoading(false)
            SetcardTextForTitle({
              ...cardTextForTitle,
              description:error.statusText
            })
            SetOpenCard(true);
          })

        }
   
    }
    return(
        <>
  <MasterPageLayout email={data.email} name={data.username}>
        <div >
            {loading&&<Loading/>}
        <div className="display-4 text-center my-5">Personal Profile  </div>
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
  
  <div className="row  px-4 ">
  <div className=" col text-danger " >
     {error.FnameText}
  </div>
  <div className="text-danger col" >
      {error.LnameText}
  </div>
  </div>
  <div className="row mb-3 px-4">
    <div className="col">
    <label for="exampleInputEmail1" className="form-label">User Name</label>
      <input type="text"  name="username" value={data.username} onChange={e=>onChange(e.target.name,e.target.value)}  className="form-control rounded-pill" placeholder="User Name"/>
    </div>

    <div className="col">
    <label for="exampleInputEmail1" className="form-label">Date of Birth</label>
      <DatePickerComponent  value={data.dob} onChange={(value)=>onChange('dob',value)}/>
    </div>
  </div>  
  <div className="mb-3 px-4">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input readOnly type="email" name="email" value={data.email} onChange={e=>onChange(e.target.name,e.target.value)} className="form-control rounded-pill" id="exampleInputEmail1" />
  </div>
  <div className="mb-3 px-4 text-danger " >
      <div>{error.EmailText}</div>
  </div>
  <div className="mb-3 px-4">
    <label for="exampleInputEmail1" className="form-label">Contact Number</label>
    <input type="tel" name="phonenumber" value={data.phonenumber} onChange={e=>onChange(e.target.name,e.target.value)} className="form-control rounded-pill" id="exampleInputEmail1" placeholder="Contact Number" />
  </div>
  <div className="mb-3 px-4 text-danger " >
      <div>{error.PhoneText}</div>
  </div>
  <div className="row mb-3 px-4">
    <div className="col">
    <label for="exampleInputEmail1" className="form-label">Address 1</label>
      <input type="text"  name="address1" value={data.address1} onChange={e=>onChange(e.target.name,e.target.value)}  className="form-control rounded-pill" placeholder="Address"/>
    </div>

    <div className="col">
    <label for="exampleInputEmail1" className="form-label">Address 2</label>
      <input type="text"  name="address2" value={data.address2} onChange={e=>onChange(e.target.name,e.target.value)}  className="form-control rounded-pill" placeholder="Address 2"/>
    </div>
  </div>  
  <div className="row mb-3 px-4">
    <div className="col">
    <label for="exampleInputEmail1" className="form-label">City</label>
      <input type="text"  name="city" value={data.city} onChange={e=>onChange(e.target.name,e.target.value)}  className="form-control rounded-pill" placeholder="City"/>
    </div>

    <div className="col">
    <label for="exampleInputEmail1" className="form-label">State</label>
    <DropdownList displayName='state' onChange={e=>onChange(e.target.name,e.target.value)} value={data.state} dataArray={StateList}/>
    </div>
  </div>  
  <div className="row mb-3 px-4">
    <div className="col">
    <label for="exampleInputEmail1" className="form-label">Post Code</label>
      <input type="text"  name="postcode" value={data.postcode} onChange={e=>onChange(e.target.name,e.target.value)}  className="form-control rounded-pill" placeholder="Post Code"/>
    </div>

    <div className="col">
    <label for="exampleInputEmail1" className="form-label">Country</label>
    <DropdownList displayName='country' onChange={e=>onChange(e.target.name,e.target.value)} value={data.country} dataArray={CountryList}/>

    </div>
  </div>  
  <div className=" mb-3 px-4">
  <label for="exampleInputPassword1" className="form-label">Roles</label>
  <input readOnly type="email" name="rolename" value={data.rolename} onChange={e=>onChange(e.target.name,e.target.value)} className="form-control rounded-pill" id="exampleInputEmail1" />
</div>
  <div className=" mb-3 px-4">
  <label for="exampleInputPassword1" className="form-label">Password</label>
  <input type="password" name="password" value={data.password} onChange={e=>onChange(e.target.name,e.target.value)} placeholder="********" className="form-control rounded-pill" id="exampleInputEmail1" />
</div>
<div className="mb-3 px-4 text-danger " >
      <div>{error.PasswordText}</div>
  </div>
  <div className="my-5 px-4 d-grid">
  <button type="submit" disabled={error.Error||loading } className="btn btn-primary rounded-pill">Update Profile</button>
  </div>

</form>
        </div>
        </MasterPageLayout>
{/* <Card title="Hii" description="HEY"  buttonText="dasd" /> */}
{alert.Error&&
<PopUp type="ALERT"  title={alert.Title} description={alert.Message} close={()=>setAlert({
    ...alert,
    Error:false
})} />
}
{openCard&&
<Card title={cardTextForTitle.title} setClose={CardText.setClose} description={cardTextForTitle.description}/>
}

        </>
        
    )
}

export default ProfilePage