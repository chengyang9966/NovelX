import MasterPageLayout from "../../components/masterPage";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import axios from "axios";
import moment from "moment";
import { differenceInCalendarDays, addDays } from "date-fns";
import FullPageCalander from "../../components/calander/FullPageCalander";

const Booking = ({ ACL, contact }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(true);
  const [holiday, setHolioday] = useState([]);
  useEffect(() => {
    setloading(true);
    setUserName(contact.username);
    setEmail(contact.email);
    setloading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ACL]);
  useEffect(() => {
    setloading(true);
    const FetchHoliday = () => {
      let temp = [];
      axios.get("api/holiday").then((res) => {
        res.data.forEach((w) =>
          temp.push({
            name: w.name,
            startDate: new Date(
              Number(w.startyear),
              Number(w.startmonth),
              Number(w.startday)
            ),
            endDate: new Date(
              Number(w.endyear),
              Number(w.endmonth),
              Number(w.endday)
            ),
          })
        );
        setHolioday(temp);
        setloading(false);
      });
    };
    FetchHoliday();
  }, []);

  //   useEffect(() => {
  //     setloading(true);
  //     axios.get(
  //       `https://www.googleapis.com/calendar/v3/calendars?key=${process.env.REACT_APP_GOOLGE_CALANDER_API}&maxResults=50`
  //     );
  //     axios
  //       .get(
  //         `https://www.googleapis.com/calendar/v3/calendars/en.${process.env.REACT_APP_COUNTRY}%23holiday%40group.v.calendar.google.com/events?key=${process.env.REACT_APP_GOOLGE_CALANDER_API}&ctz=Asia/Kuala_Lumpur&maxResults=50`
  //       )
  //       .then((res) => {
  //         let temp = [];
  //         res.data.items.map((w) =>
  //           temp.push({
  //             title: w.summary,
  //             startDate: w.start.date,
  //             endDate: w.end.date,
  //           })
  //         );
  //         setHolioday(temp);
  //         setloading(false);
  //       });
  //   }, []);
  //   console.log(
  //     "🚀 ~ file: Booking.js ~ line 50 ~ {holiday.map ~ holiday",
  //     holiday
  //   );
  var currentDate = new Date();
  currentDate = addDays(currentDate, 1);
  const disabledDates = [currentDate, "in3Days", "in5Days"];
  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }
  function tileDisabled({ date, view }) {
    // Disable tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of disabled dates
      return disabledDates.find((dDate) => isSameDay(dDate, date));
    }
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <MasterPageLayout name={userName} email={email}>
          <FullPageCalander tileDisabled={tileDisabled} />
          {holiday.map((w, i) => (
            <div>
              <div>{w.title}</div>
              <div>{moment(w.startDate).format("DD/MM/YYYY")}</div>
              <div>{moment(w.endDate).format("DD/MM/YYYY")}</div>
            </div>
          ))}
        </MasterPageLayout>
      )}
    </>
  );
};

export default Booking;
