import React, { cloneElement, useEffect, useState } from "react";
import { CurrentDateTimeInString } from "../utils/CheckCurrentDateTime";
import MasterPageLayout from "./masterPage";
import { CreateToken, CreateHeader } from "../utils/createToken";
import moment from "moment";
import axios from "axios";
import Loading from "./Loading";
import { DescrytionObj } from "../utils/encryption";
const HeaderText=(props)=>{
    let userid = DescrytionObj(localStorage.getItem("user")).UserId;
    let config = CreateHeader();
    const [time, setTime] = useState("");
    const [Datetime, setDatetime] = useState(new Date());
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [profileData, setProfileData] = useState({});
    const [loading, setloading] = useState(true);
    let profile=JSON.parse(localStorage.getItem('userProfile'));

    useEffect(() => {
        if(!localStorage.getItem('userProfile')){
          axios.get(`/api/getusercontact/${userid}`, config).then((res) => {
            let ContactData = res.data[0];
            if (res.status === 200) {
              setUserName(ContactData.username);
              setEmail(ContactData.email);
              setProfileData(ContactData);
              delete ContactData.phonenumber
              delete ContactData.address1
              delete ContactData.address2
              localStorage.setItem('userProfile',JSON.stringify(ContactData))
              setloading(false);
              setTime(CurrentDateTimeInString());
            } else {
              setloading(false);
            }
          });
        }else{
          setUserName(profile.username);
          setEmail(profile.email);
          setloading(false);
          setTime(CurrentDateTimeInString());
        }
      },[]);

      const AddProfileToProps=(props)=>{
        return{...props,}
      }


    return(
        <>
        {loading? (
            <Loading />
          ) : (
        <MasterPageLayout name={userName} email={email} >
        <div className="bodyWrapper">
        <div className="TitleContainer d-flex align-items-center justify-content-between">
      <h1 className="titleText">
        {time}, {userName}
      </h1>
      <h3>{moment(Datetime).format('HH:mm')}</h3>
        </div>
     { props.children}
    </div>
    </MasterPageLayout>

      )}
      </>
    )
}
export default HeaderText