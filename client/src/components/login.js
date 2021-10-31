import Subtitle from "./SubTitle";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Checker from "../utils/Checker";
import Loading from "./Loading";
import PopUp from "./PopUp";
import EyesIcon from "./Eye";
import { EncrytionObj } from "../utils/encryption";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  let ErrorData = {
    EmailText: "",
    PasswordText: "",
    Error: false,
  };
  let ErrorUser = {
    Message: "",
    Title: "",
    Error: false,
  };
  const [alert, setAlert] = useState(ErrorUser);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);
  const [error, SetError] = useState(ErrorData);
  const history = useHistory();

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (Checker(data).Error === true) {
      setLoading(false);
      SetError(Checker(data));

      setTimeout(() => {
        SetError(ErrorData);
      }, 3000);
    } else {
      axios
        .post("/api/login", data)
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            history.push("/");
            console.log(
              "🚀 ~ file: login.js ~ line 49 ~ .then ~ res.data",
              res.data
            );
            EncrytionObj(res.data, "user");
          } else {
            setAlert({
              Message: res.data.message,
              Title: "Not User",
              Error: true,
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          localStorage.removeItem("user");
          setAlert({
            Message: err.response.data.message,
            Title: "Not User",
            Error: true,
          });
        });
    }
  };
  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      <div>
        {loading && <Loading />}
        <Subtitle title="login" />

        <form onSubmit={(data) => onSubmit(data)}>
          <div className="mb-3 px-4">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className="form-control rounded-pill"
              id="exampleInputEmail1"
            />
          </div>
          <div className="mb-3 px-4 text-danger ">
            <div>{error.EmailText}</div>
          </div>
          <label for="exampleInputPassword1" className="form-label px-4">
            Password
          </label>
          <div
            style={{ width: "100%", justifyContent: "flex-end" }}
            className="mb-3 px-4 d-flex align-items-center"
          >
            <input
              type={view ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className="form-control rounded-pill"
              id="exampleInputPassword1"
            />
            {EyesIcon(view, () => setView(!view), true)}
          </div>
          <div className="mb-3 px-4 text-danger ">
            <div>{error.PasswordText}</div>
          </div>
          <div className="my-5 px-4 d-grid">
            <button
              type="submit"
              disabled={error.Error}
              className="btn btn-primary rounded-pill"
            >
              Login In
            </button>
          </div>
          <div className="my-5 px-4 d-grid">
            <button
              type="submit"
              onClick={() => history.push("/forgetPassword")}
              disabled={error.Error}
              className="btn btn-danger rounded-pill"
            >
              Forget Password
            </button>
          </div>
          <div className="my-5 px-4 d-grid">
            <button
              type="submit"
              onClick={() => history.push("/register")}
              disabled={error.Error}
              className="btn btn-danger rounded-pill"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      {/* <Card title="Hii" description="HEY"  buttonText="dasd" /> */}
      {alert.Error && (
        <PopUp
          type="ALERT"
          title={alert.Title}
          description={alert.Message}
          close={() =>
            setAlert({
              ...alert,
              Error: false,
            })
          }
        />
      )}
    </>
  );
};
export default Login;
