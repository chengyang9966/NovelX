let InitialState = {
  permissions: {},
};

const ROLES = {
  USER: "user",
  ADMIN: "admin",
  GUEST: "guest",
  MANAGER: "manager",
};

const Permission = (role, cb) => {
  InitialState["permissions"] = {
    home: {
      canViewTask: role !== ROLES.GUEST,
      canDeleteTask: role === ROLES.USER || role === ROLES.ADMIN,
      canAddTask: role !== ROLES.USER,
    },
    booking: {
      canViewTask: role !== ROLES.GUEST,
      canDeleteTask: role === ROLES.USER || role === ROLES.ADMIN,
      canAddTask: role !== ROLES.USER,
    },
    // Add more permissions as you like
  };
  if (cb) {
    cb(InitialState.permissions);
  }
};

export const CreateACL = (array, cb) => {
  let objectkey = array.map(({ menuname }) => menuname);
  let actions = Object.keys(array[0]).filter((x) => x !== "menuname");
  if (objectkey.length > 0) {
    array.forEach((currentPermission) => {
      objectkey.forEach((key, i) => {
        if (key === currentPermission.menuname) {
          InitialState["permissions"][key] = {};
          actions.forEach((action) => {
            if (Object.keys(currentPermission).includes(action)) {
              InitialState["permissions"][key][action] = currentPermission[
                action
              ]
                ? true
                : false;
            }
          });
        }
      });
    });
  }

  localStorage.setItem("ACL", JSON.stringify(InitialState.permissions));
  if (cb) {
    cb(InitialState.permissions);
  }
};

export default Permission;
