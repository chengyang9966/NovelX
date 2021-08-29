import React, { useEffect, useState } from "react";
import MasterPageLayout from "../../components/masterPage";
import Loading from "../../components/Loading";
import SmallCard from "../../components/SmallCard";
import Card from "../../components/Card";
import CardBtn from "../../Types/CardBtnList";
import { CurrentDateTimeInString } from "../../utils/CheckCurrentDateTime";
import MyApp from '../../components/PDFView'
import Datetime from '../../utils/timeDate'
const HomePage = (props) => {
  let ACL=props.ACL
  let contact=props.contact
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(true);
  const [cardOpen, setcardOpen] = useState(false);
  const [CardDetails, setCardDetails] = useState(CardBtn);
  const [time, setTime] = useState("");

  useEffect(() => {
        setUserName(contact.username);
        setEmail(contact.email);
        setTime(CurrentDateTimeInString());
        setloading(false);
    setCardDetails({
        ...CardDetails,
        setClose:()=>setcardOpen(false)
    })
  },[ACL]);


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
            <SmallCard displayArray={displayArray} AddBtn={true} disabled={ACL?ACL.canAddTask:false} onClick={()=>console.log('HEWFE')} cardClick={(i)=>{
              if(ACL&&!ACL.canViewTask){
                  return
              }
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
