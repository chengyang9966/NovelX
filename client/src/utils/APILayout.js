import axios from "axios";
import { CreateHeader } from "./createToken";
import { DescrytionObj } from "./encryption";
export const APILayout = async (endpoint, method) => {
  let user = DescrytionObj("user");
  if (user && Object.keys(user).length > 0) {
    let options = CreateHeader();

    options.url = endpoint;
    options.method = method;

    const response = await axios(options);
    if (response.status === 200) {
      return response.data;
    }

    if (response.status === 400) {
      return response.data;
    }
  } else {
    return [];
  }
};
export const METHODS = {
  GET: "get",
  DELETE: "delete",
  POST: "post",
  PUT: "get",
  PATCH: "patch",
};
