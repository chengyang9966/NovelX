import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calanderFullPage.css";
const FullPageCalander = ({ tileDisabled, selectRange = false }) => {
  return (
    <div style={{ padding: 20, justifyContent: "center", display: "flex" }}>
      <Calendar tileDisabled={tileDisabled} selectRange={selectRange} />
    </div>
  );
};

export default FullPageCalander;
