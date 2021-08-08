
import DatePicker,{CalendarContainer} from 'react-datepicker';
import React,{forwardRef,useState,createRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import "react-datepicker/dist/react-datepicker.css";
const DatePickerComponent=({value,onChange,todayBtn})=>{
  let inputRef = createRef(null);
  const [month,Setmonth]=useState(false)
  const SetChanges=()=>{
    Setmonth(false)
  }
    const MyContainer = (item) => {
     const { className, children ,onChange,todayBtn}=item
        return (
          <div className={className} >
            <CalendarContainer  >
              <div className="react-datepicker-clid d-flex" style={{ background: "white",width:'15%',borderRadius:'15px',padding:'10px' }}>
           {todayBtn&& <button className="custom-btn" onClick={()=>{
              onChange(new Date());
              inputRef=null}}>Today</button>}
           {!month? <button className="custom-btn"  onClick={()=>{
             Setmonth(true)
              }}>Month</button>:
            <button className="custom-btn" onClick={()=>{
             Setmonth(false)
              }}>Date</button>}
              </div>
              <div style={{ position: "relative",margin:'0px 10px' }}>{children}</div>
            </CalendarContainer>
          </div>
        );
      };
      const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className=" d-flex align-items-center justify-content-between" onBlur={onClick}>
          <input className="form-control rounded-pill" value={value}  onClick={onClick} onChange={(e) => onChange(e.target.value)}  ref={ref}/>
          <FontAwesomeIcon icon={faCalendarDay} className="IconView"   onClick={onClick} ref={ref}/>
        </div>
        // <button className="form-control rounded-pill d-flex align-items-center justify-content-between" onClick={onClick} ref={ref}>
        //   {value}
        // </button>
      ));
    return(
        <>
        <DatePicker
         customInput={<ExampleCustomInput  inputRef={inputRef}/>}
        className="form-control rounded-pill"
        onChange={onChange}
        selected={value}
        format="dd-MM-yyyy"
        // monthsShown={month}
        showMonthYearPicker={month}
        showFullMonthYearPicker={month}
        calendarContainer={(item)=>MyContainer({...item,onChange,todayBtn})}
        onCalendarOpen={SetChanges}
        />
        </>
    )
}
export default DatePickerComponent