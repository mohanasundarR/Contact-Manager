import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../Views/Login";
import Signup from "../Views/Signup";
import DashboardLayout from "../Layouts/DashboardLayout";
export default function MainRouting() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/home" component={DashboardLayout} />
      </Switch>
    </Router>
  );
}
