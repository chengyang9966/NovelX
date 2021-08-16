import React, { useEffect, useState } from "react";
import axios from "axios";
import MasterPageLayout from "../../components/masterPage";
import { CreateToken, CreateHeader } from "../../utils/createToken";
import Loading from "../../components/Loading";
import SmallCard from "../../components/SmallCard";
import Card from "../../components/Card";
import CardBtn from "../../Types/CardBtnList";
import { CurrentDateTimeInString } from "../../utils/CheckCurrentDateTime";
import MyApp from '../../components/PDFView'
import Datetime from '../../utils/timeDate'
const HomePage = () => {
  let userid = JSON.parse(localStorage.getItem("user")).UserId;
  let config = CreateHeader();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(true);
  const [cardOpen, setcardOpen] = useState(false);
  const [CardDetails, setCardDetails] = useState(CardBtn);
  const [time, setTime] = useState("");

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
    setCardDetails({
        ...CardDetails,
        setClose:()=>setcardOpen(false)
    })
  },[]);


  let displayArray = [
    { title: "Testing", icon: "Clock", desc: "3H" },
    { title: "Testing", icon: "Clock", desc: "3H" },
    { title: "Testing", icon: "Clock", desc: "3H" },
  ];
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <MasterPageLayout name={userName} email={email} >
          <div className="bodyWrapper">
              <div className="TitleContainer d-flex align-items-center justify-content-between">
            <h1 className="titleText">
              {time}, {userName}
            </h1>
            <h3>{Datetime}</h3>
              </div>
            <div className="d-flex Spacing">
            <div className="formInput50">
            <SmallCard displayArray={displayArray} AddBtn={true} onClick={()=>console.log('HEWFE')} cardClick={(i)=>{
                setCardDetails({
                    ...CardDetails,
                    title:i.title,
                    description:i.desc
                })
                setcardOpen(true)}}/>
            </div>
            <div className="formInput50">
            <SmallCard displayArray={displayArray} />
            </div>
            <div className="formInput50">
            <SmallCard displayArray={displayArray} />
            </div>
            </div>
            <MyApp/>
          </div>
          {cardOpen&&<Card title={CardDetails.title} description={CardDetails.description} setClose={CardDetails.setClose}  />}
        </MasterPageLayout>
      )}
    </>
  );
};
export default HomePage;
