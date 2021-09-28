import Login from "components/auth/Login";
import Register from "components/auth/Register";
import About from "components/layout/About";
import Dashboard from "components/layout/Dashboard";
import PrivateRoute from "components/routes/PrivateRoute";
import { Route, Switch } from "react-router";
import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact component={Login} path="/login" />
      <Route exact component={Register} path="/register" />
      <PrivateRoute exact component={Dashboard} path="/" />
      <PrivateRoute exact component={About} path="/about" />
    </Switch>
  );
}

export default App;
