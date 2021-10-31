import axios from "axios";
import { CreateToken } from "./createToken";
import { DescrytionObj, EncrytionObj } from "./encryption";
const CheckAuth = async () => {
  let user = DescrytionObj("user");
  let temp = false;
  if (user && Object.keys(user).length > 0) {
    if (CreateToken() !== "") {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": CreateToken(),
        },
      };
      await axios
        .post(
          "/api/auth",
          {
            userid: user.UserId,
          },
          axiosConfig
        )
        .then((res) => {
          if (res.status === 201) {
            temp = true;
            user.accessToken = res.data.token;
            EncrytionObj(user, "user");
          }
        })
        .catch((err) => {
          temp = false;
        });
    }
  }
  return temp;
};
export default CheckAuth;
