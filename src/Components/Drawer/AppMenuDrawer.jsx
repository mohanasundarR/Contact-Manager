import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import clsx from "clsx";
import { drawerWidth, getDecodedToken } from "../../Constants/CommonConstant";
import { menuList } from "../../Constants/MenuListConstant";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    // [theme.breakpoints.up("sm")]: {
    //   width: theme.spacing(9) + 1,
    // },
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
  selected: {
    borderLeft: "4px solid #a5a4a4",
    borderColor: theme.palette.primary.main,
    borderBottom: 0,
    paddingLeft: "12px",
  },
  listText: {
    fontSize: "14px",
  },
  list: {
    padding: 0,
  },
}));
export default function AppMenuDrawer() {
  const classes = useStyles();
  const history = useHistory();
  const isAppDrawerOpen = useSelector(
    (state) => state.CommonReducer.appDrawerOpen
  );
  const isSelected = (route) => {
    return route === window.location.pathname;
  };
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isAppDrawerOpen,
        [classes.drawerClose]: !isAppDrawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isAppDrawerOpen,
          [classes.drawerClose]: !isAppDrawerOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>RiverStone</div>
      <Divider />
      <List classes={{ root: classes.list }}>
        {menuList.map((menu, index) => {
          if (
            (getDecodedToken()?.role === "Admin" &&
              menu?.name === "Registry") ||
            menu?.name === "Contacts" ||
            menu?.name === "Help"
          )
            return (
              <ListItem
                key={index}
                divider
                button
                onClick={() => {
                  history.push(menu.route);
                }}
                selected={isSelected(menu.route)}
                classes={{ selected: classes.selected }}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText
                  primary={menu.name}
                  classes={{ primary: classes.listText }}
                />
              </ListItem>
            );
        })}
      </List>
    </Drawer>
  );
}
