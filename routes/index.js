const { Register } = require("./register");
const { Contact } = require("./Contacts");
const { ForgetPassword } = require("./forgetPassword");
const { Upload } = require("./Images");
const { Login } = require("./login");
const { GetRoles } = require("./roles");
const { Router } = require("express");
const { Holiday } = require("./Holiday");
const { ACL } = require("./ACL");

module.exports = {
  Route: () => {
    const app = Router();
    Register(app);
    Contact(app);
    ForgetPassword(app);
    Upload(app);
    Login(app);
    GetRoles(app);
    Holiday(app);
    ACL(app);
    return app;
  },
};
