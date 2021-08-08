import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import MasterPageLayout from "../../components/masterPage";
import Map from "../../components/mapContainer";
import Toogle from "../../components/Toogle";
import Slider from "../../components/Slider";
import Card from "../../components/Card";
import moment from "moment";
import CardBtn from "../../Types/CardBtnList";
const MapPage=()=>{
    const [loading, setloading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [NumbersOfTaxis, setNumbersOfTaxis] = useState(10)
    const [pickUpTime, setpickUpTime] = useState(0)
    const [UpdateValue, setUpdateValue] = useState(false)
    const [cardOpen, setcardOpen] = useState(false);
    const [CardDetails, setCardDetails] = useState(CardBtn);

const SetPickUpTime=(value)=>{
    setpickUpTime(value)
    setCardDetails({
        ...CardDetails,
        title:'Pick Up Estimate time',
        description:`${moment().add(value,'minutes').format('HH:mm')}`,
        setClose:()=>setcardOpen(false)
    })
    pickUpTime>0&&pickUpTime!==value&&setcardOpen(true)
}

    return(
        <>
        {loading ? (
            <Loading />
          ) : (
            <MasterPageLayout>
                  <div className="bodyWrapper">
                  <div className="TitleContainer d-flex align-items-center justify-content-between">
            <h1 className="titleText">
              Map
            </h1>
              </div>
                 <Map checked={checked} numberOfTaxi={NumbersOfTaxis} setpickUpTime={SetPickUpTime} setUpdateValue={()=>setUpdateValue(false)} UpdateValue={UpdateValue}/>
                 <Toogle checked={checked} onChange={()=>{
                     setloading(true)
                     setChecked(!checked)
                     setloading(false)
                     }}/>
                 <Slider value={NumbersOfTaxis} onChange={(e)=>{
                     setloading(true)
                     setNumbersOfTaxis(e.target.value)
                     setloading(false)
                     }}/>
                 
                  </div>
                  <div className="my-5 px-4 d-grid">
  <button type="submit" onClick={()=>setUpdateValue(true)} className="btn btn-primary rounded-pill">Ok</button>
  </div>
            </MasterPageLayout>

          )}
          {
              loading&& <Loading />
          }
            {cardOpen&&<Card title={CardDetails.title} description={CardDetails.description} setClose={CardDetails.setClose}  />}
          </>
    )
}

export default MapPage