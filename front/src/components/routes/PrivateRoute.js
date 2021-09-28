import NavbarMenu from "components/layout/NavbarMenu";
import { Redirect, Route } from "react-router";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("learning-mern") ? (
          <>
          <NavbarMenu />
          <Component />
          </>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
