import moment from "moment";
import React, { useEffect, useState } from "react";
const Time=()=>{
    const [Datetime,SetDateTime]=useState(new Date())
    useEffect(()=>{
        setTimeout(() => SetDateTime( Date.now()), 1000);
    },[Datetime])
   return moment(Datetime).format('HH:mm')
}

export default Time