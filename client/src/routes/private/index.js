import PrivateRoute from "../../utils/privateRoute";

import { Route, Switch } from "react-router-dom";
import { CreateHeader } from "../../utils/createToken";
import CheckAuth from "../../utils/authChecker";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { CreateACL } from "../../utils/acl";
import { DescrytionObj } from "../../utils/encryption";
import { ACLData } from "../../utils/aclData";
import { AllRoutes } from "../AllRoutes";
const PrivateRouteMain = () => {
  let userid = DescrytionObj("user") ? DescrytionObj("user").UserId : "";
  let roleId = DescrytionObj("user") ? DescrytionObj("user").roleId : "";

  let config = CreateHeader();

  const [status, SetStatus] = useState(false);
  const [PermissionKey, SetPermissionKey] = useState({});
  const [data, SetData] = useState(false);
  const [ContactDetails, SetContactDetails] = useState(false);
  useEffect(() => {
    !status &&
      CheckAuth()
        .then((res) => {
          SetData(res);
        })
        .catch((err) => {
          console.error(err);
        });
  }, [status]);
  useEffect(() => {
    SetStatus(false);
    axios.get(`/api/getusercontact/${userid}`, config).then((res) => {
      let ContactData = res.data[0];
      if (res.status === 200) {
        SetContactDetails(ContactData);
        SetStatus(true);
      } else {
        SetStatus(true);
      }
    });
  }, []);
  useEffect(() => {
    SetStatus(false);
    async function fetchMyAPI() {
      let response = await ACLData(roleId);
      CreateACL(response, (data) => {
        SetPermissionKey(data);
        SetStatus(true);
      });
    }
    fetchMyAPI();
  }, []);

  return (
    <>
      {!status ? (
        <Loading />
      ) : (
        <PrivateRoute auth={data}>
          <Switch>
            {AllRoutes(PermissionKey, ContactDetails).map((w) => {
              return (
                <Route path={w.path} exact={w.exact} component={w.component} />
              );
            })}
            <NotFound />
          </Switch>
        </PrivateRoute>
      )}
    </>
  );
};

export default PrivateRouteMain;
