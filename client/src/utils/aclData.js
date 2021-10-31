import { APILayout, METHODS } from "./APILayout";

export const ACLData = async (roleId = 1) => {
  let result = await APILayout(`/api/getacl/${roleId}`, METHODS.GET);
  return result;
};
