import React, { useEffect, useState } from "react";
import { CurrentDateTimeInString } from "../utils/CheckCurrentDateTime";
import MasterPageLayout from "./masterPage";
import { CreateToken, CreateHeader } from "../utils/createToken";
import moment from "moment";
import axios from "axios";
import Loading from "./Loading";
const HeaderText=(props)=>{
    let userid = JSON.parse(localStorage.getItem("user")).UserId;
    let config = CreateHeader();
    const [time, setTime] = useState("");
    const [Datetime, setDatetime] = useState(new Date());
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setloading] = useState(true);
    useEffect(() => {
        axios.get(`/api/getusercontact/${userid}`, config).then((res) => {
          let ContactData = res.data[0];
          if (res.status === 200) {
            setUserName(ContactData.username);
            setEmail(ContactData.email);
            setloading(false);
            setTime(CurrentDateTimeInString());
          } else {
            setloading(false);
          }
        });

      },[]);
    //   useEffect(()=>{
    //     const timer = setInterval(() => { 
    //         setDatetime(new Date());
    //       }, 60 * 1000);
    //       return () => {
    //         clearInterval(timer); 
    //       }
    //   },[])
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
    {props.children}
    </div>
    </MasterPageLayout>

      )}
      </>
    )
}
export default HeaderText