import {
    Route,
    Redirect
  } from "react-router-dom";


const PrivateRoute=({ children,auth, ...rest })=> {
  console.log('auth: ', auth);
    return (
      <Route
        {...rest}
        render={() =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          )
        }
      />
    );
  }
  export default PrivateRoute