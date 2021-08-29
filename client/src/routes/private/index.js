import PrivateRoute from "../../utils/privateRoute";
import Title from "../../components/Title";
import {
    Route, Switch
  } from "react-router-dom";
  import {  CreateHeader } from "../../utils/createToken";
import CheckAuth from "../../utils/authChecker";
import Loading from "../../components/Loading";
import NotFound from '../../components/NotFound';
import HomePage from "./homepage";
import Profile from "./Profile";
import MapPage from "./MapPage";
import PersonalPage from  './Personal';
import Drag from './Drag';
import React,{useState,useEffect} from "react";
import axios from "axios";
import Permission from "../../utils/acl";
import { DescrytionObj } from "../../utils/encryption";
const PrivateRouteMain=()=>{    
let userid = DescrytionObj(localStorage.getItem("user")) ?DescrytionObj(localStorage.getItem("user")) .UserId:'';
let config = CreateHeader();
let PermissionKey={};
    const [status,SetStatus]=useState(false)
    const [data,SetData]=useState(false)
    const [ContactDetails,SetContactDetails]=useState(false)
useEffect(() => {
    !status&&
    CheckAuth().then(res=>
        { 
          SetData(res);
        
          SetStatus(true)
     
      }).then(err=>{
          console.error(err);
      SetStatus(true)}
      );
}, [status])
useEffect(()=>{
    SetStatus(false)
    axios.get(`/api/getusercontact/${userid}`, config).then((res) => {
        let ContactData = res.data[0];
        if (res.status === 200) {
            SetContactDetails(ContactData)
          Permission(ContactData.rolename,(data)=>PermissionKey=data);
          SetStatus(true);
        } else {
            SetStatus(true);
        }
    });
},[])

console.log('PermissionKey: ', PermissionKey);

    return(
        <>
        {
            !status?
            <Loading/>:
            <PrivateRoute auth={data}>
            <Switch>
           <Route path="/123" exact  component={props=><Title {...props}   />}/>
           <Route path="/" exact component={props=><HomePage {...props} contact={ContactDetails}  ACL={PermissionKey.home} />}  />
           <Route path="/Profile" exact component={Profile}/>
           <Route path="/Map" exact component={MapPage}/>
           <Route path="/personal" exact component={PersonalPage}/>
           <Route path="/playground" exact component={props=><Drag {...props} ACL={PermissionKey.drag}  />}  />
            <NotFound/>
            </Switch>
        </PrivateRoute>
        }
        </>
    )
}

export default PrivateRouteMain