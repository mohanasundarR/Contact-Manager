import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import ApplicationAppBar from "../Components/AppBar/ApplicationAppBar";
import AppMenuDrawer from "../Components/Drawer/AppMenuDrawer";
import { Switch, Route, Redirect } from "react-router-dom";
import { menuList } from "../Constants/MenuListConstant";
import Contacts from "../Views/Contacts";
import Registry from "../Views/Registry";
import { getDecodedToken } from "../Constants/CommonConstant";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "center",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    minHeight: `${theme.spacing(7)}px !important`,
  },
  content: {
    flexGrow: 1,
    padding: "12px",
  },
}));

export default function DashboardLayout() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <ApplicationAppBar />
      <AppMenuDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {menuList?.map((menu, index) => {
            if (
              (getDecodedToken()?.role === "Admin" &&
                menu?.name === "Registry") ||
              menu?.name === "Contacts" ||
              menu?.name === "Help"
            )
              return (
                <Route
                  path={menu?.route}
                  component={getComponent(menu?.key)}
                  key={index}
                />
              );
          })}
          <Redirect to="/home/contacts" />
        </Switch>
      </main>
    </div>
  );
}
const getComponent = (value) => {
  switch (value) {
    case "registry":
      return Registry;
    case "contacts":
      return Contacts;
    default:
      return Dashboard;
  }
};
const Dashboard = () => <div>Dashboard</div>;
