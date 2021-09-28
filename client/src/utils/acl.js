import { EncrytionObj } from "./encryption";

const InitialState = {
  permissions: {},
};

const ROLES = {
  USER: "User",
  ADMIN: "Admin",
  GUEST: "Guest",
  MANAGER:'manager'
};

const Permission = (role,cb) => {
  InitialState["permissions"] = {
    home: {
      canViewTask: role !== ROLES.GUEST,
      canDeleteTask: role === ROLES.USER || role === ROLES.ADMIN,
      canAddTask: role !== ROLES.USER,
    },
    // Add more permissions as you like
  };
  if(cb){
    cb(InitialState.permissions)
  }
  localStorage.setItem("Permission", EncrytionObj(InitialState));
};

export default Permission;
