import CloseBtn from "./closeBtn";
import PropTypes from "prop-types";

const ButtonType = ["ALERT", "WARNING", "SUCCESS"];

const PopUp = ({ type, title, description, close }) => {
  return (
    <div className="popUp-Bg">
      <div
        style={{ width: "100vw", height: "100vh" }}
        className=" d-flex align-items-center justify-content-center"
      >
        <div
          style={{ width: "400px", borderRadius: 10 }}
          className="card text-center "
        >
          <div className="closeBtn">
            <CloseBtn onClick={close} />
          </div>
          <div
            style={{ minHeight: "200px" }}
            className="card-body px-4 text-align-center"
          >
            <h4 className="card-title ">{title}</h4>
            <div
              style={{ minHeight: "100px" }}
              className=" d-flex align-items-center justify-content-center"
            >
              <p className="card-text">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PopUp.propTypes = {
  type: PropTypes.oneOf(ButtonType),
  title: PropTypes.string,
  description: PropTypes.string,
  close: PropTypes.func.isRequired,
};

export default PopUp;
