import CloseBtn from "./closeBtn";

const Card = ({
  title,
  description,
  setClose,
  button,
  buttonText,
  BtnFunction = () => {},
  link,
  cancelButton,
  cancelButtonText = "Cancel",
  cancelBtnFunction = setClose,
  okButton,
  okButtonText = "Ok",
  okBtnFunction = () => {},
}) => {
  return (
    <div
      className="popUp-Bg "
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setClose();
        }
      }}
      tabindex="0"
    >
      <div
        style={{ width: "100vw", height: "100vh" }}
        className=" d-flex align-items-center justify-content-center"
      >
        <div
          style={{ width: "400px", borderRadius: 10 }}
          className="card text-center "
        >
          <div className="closeBtn">
            <CloseBtn onClick={setClose} />
            {/* <button   type="button" className="btn-close " aria-label="Close"></button> */}
          </div>
          <div className="card-header">
            <h5 className="card-title  mt-2 ">{title}</h5>
          </div>
          <div style={{ minHeight: "200px" }} className="card-body px-4">
            <p className="card-text">{description}</p>
          </div>
          <div className="card-body  d-flex align-items-center justify-content-evenly">
            {button && (
              <a
                href={link}
                onClick={BtnFunction}
                className="btn btn-primary w-100 me-1"
              >
                {buttonText}
              </a>
            )}
            {cancelButton && (
              <a
                href={link}
                onClick={cancelBtnFunction}
                className="btn btn-outline-secondary me-1"
              >
                {cancelButtonText}
              </a>
            )}
            {okButton && (
              <a
                href={link}
                onClick={okBtnFunction}
                className="btn btn-outline-success me-1"
              >
                {okButtonText}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
