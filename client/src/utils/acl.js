import { EncrytionObj } from "./encryption";

const InitialState = {
  permissions: {},
};

const ROLES = {
  USER: "User",
  ADMIN: "Admin",
  GUEST: "Guest",
};

const Permission = (role,cb) => {
  console.log('role: ', role);
  InitialState["permissions"] = {
    home: {
      canViewTask: role !== ROLES.GUEST,
      canDeleteTask: role === ROLES.USER || role === ROLES.ADMIN,
      canAddTask: role !== ROLES.USER,
    },
    // Add more permissions as you like
  };
  if(cb){
    cb(InitialState)
  }
  localStorage.setItem("Permission", EncrytionObj(InitialState));
};

export default Permission;
