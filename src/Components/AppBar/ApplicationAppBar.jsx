import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Button,
  Popper,
  ClickAwayListener,
  Paper,
  Collapse,
  Divider,
} from "@material-ui/core";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { CgMenuGridO } from "react-icons/cg";
import { drawerWidth, getDecodedToken } from "../../Constants/CommonConstant";
import clsx from "clsx";
import { toggleAppDrawer } from "../../Redux/Actions/CommonAction";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut, FiMoreVertical } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { MdNotificationsNone, MdSecurity } from "react-icons/md";
import { GoMail } from "react-icons/go";
import { Fragment, useState, useRef } from "react";
import { FaUserTie } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { NavLink, useHistory } from "react-router-dom";
import { BsFillLockFill } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  grow: {
    flexGrow: 1,
    // [theme.breakpoints.down("sm")]: {
    //   flexGrow: 0,
    // },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  userButton: {
    color: "#fff",
    textTransform: "captalize",
  },
  arrow: {
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
    },
  },
  popper: {
    zIndex: 1201,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
      },
    },
  },
  listItemRoot: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    transition: "background-color 0.5s ease",

    "&:hover": {
      backgroundColor: "#e8e8e8",
      cursor: "pointer",
      borderRadius: "4px",
    },
  },
  navLink: { textDecoration: "none", color: "inherit" },
}));
export default function ApplicationAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isAppDrawerOpen = useSelector(
    (state) => state.CommonReducer.appDrawerOpen
  );
  let history = useHistory();

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const isMenuOpen = Boolean(anchorEl);
  const handleAppDrawerOpen = () => {
    dispatch(toggleAppDrawer(!isAppDrawerOpen));
  };
  const onLogout = () => {
    history.push("/");
    sessionStorage.clear();
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const RenderMobileMenu = () => {
    const [open, setOpen] = useState(false);
    return (
      <Menu
        getContentAnchorEl={null}
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        id="primary-search-account-menu-mobile"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <MailIcon handleAppDrawerOpen={handleAppDrawerOpen} />
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <NotificationIcon handleAppDrawerOpen={handleAppDrawerOpen} />
          <Typography variant="inherit" noWrap>
            Notifications
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(!open);
          }}
        >
          <UserIcon />
          <p>Profile</p>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            {!open ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
        </MenuItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider />
          <MenuItem>
            <NavLink to="/" className={classes.navLink}>
              <ListContentRoot icon={<AiOutlineUser />} value="Profile" />
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/" className={classes.navLink}>
              <ListContentRoot
                icon={<MdSecurity />}
                value="Update Security Question"
              />
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/" className={classes.navLink}>
              <ListContentRoot
                icon={<BsFillLockFill />}
                value="Change Password"
              />
            </NavLink>
          </MenuItem>
        </Collapse>
      </Menu>
    );
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      getContentAnchorEl={null}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <NavLink to="/" className={classes.navLink}>
        <ListContentRoot icon={<AiOutlineUser />} value="Profile" />
      </NavLink>
      <NavLink to="/" className={classes.navLink}>
        <ListContentRoot
          icon={<MdSecurity />}
          value="Update Security Question"
        />
      </NavLink>
      <NavLink to="/" className={classes.navLink}>
        <ListContentRoot icon={<BsFillLockFill />} value="Change Password" />
      </NavLink>
    </Menu>
  );
  return (
    <Fragment>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isAppDrawerOpen,
        })}
      >
        <Toolbar
          style={{
            padding: "0 16px",
            paddingRight: "16px",
            minHeight: theme.spacing(7),
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleAppDrawerOpen}
            edge="start"
            className={classes.menuButton}
          >
            {isAppDrawerOpen ? <IoIosArrowBack /> : <CgMenuGridO />}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            classes={{ root: classes.desktopNameDisplay }}
          >
            RiverStone Contact Manager
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MailIcon handleAppDrawerOpen={handleAppDrawerOpen} />
            &nbsp;
            <NotificationIcon handleAppDrawerOpen={handleAppDrawerOpen} />
            <PopperIconButton
              buttonProps={{
                children: (
                  <Typography
                    noWrap
                    style={{
                      marginRight: "16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaUserTie size="1.3em" />
                    &nbsp;&nbsp;
                    <span style={{ fontSize: "13px" }}>
                      {getDecodedToken()?.name}
                    </span>
                  </Typography>
                ),
              }}
              paperProps={{
                children: <ProfileOptions />,
              }}
            />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <FiMoreVertical />
            </IconButton>
          </div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onLogout}
            edge="start"
          >
            <FiLogOut />
          </IconButton>
        </Toolbar>
      </AppBar>
      <RenderMobileMenu />
      {renderMenu}
    </Fragment>
  );
}

const MailIcon = ({ handleAppDrawerOpen }) => (
  <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={handleAppDrawerOpen}
    edge="start"
  >
    <StyledBadge badgeContent={4} color="secondary">
      <GoMail />
    </StyledBadge>
  </IconButton>
);
const NotificationIcon = ({ handleAppDrawerOpen }) => (
  <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={handleAppDrawerOpen}
    edge="start"
    style={{ marginRight: "12px" }}
  >
    <StyledBadge badgeContent={4} color="secondary">
      <MdNotificationsNone />
    </StyledBadge>
  </IconButton>
);
const UserIcon = ({ handleAppDrawerOpen }) => (
  <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={handleAppDrawerOpen}
    edge="start"
    style={{ marginRight: "12px" }}
  >
    <AiOutlineUser />
  </IconButton>
);
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 18,
    padding: "0 4px",
    border: `2px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down("sm")]: {
      borderColor: "#fff",
    },
  },
}))(Badge);

const ProfileOptions = () => {
  const classes = useStyles();
  return (
    <div>
      <NavLink to="/" className={classes.navLink}>
        <ListContentRoot icon={<AiOutlineUser />} value="Profile" />
      </NavLink>
      <NavLink to="/" className={classes.navLink}>
        <ListContentRoot
          icon={<MdSecurity />}
          value="Update Security Question"
        />
      </NavLink>
      <NavLink to="/" className={classes.navLink}>
        <ListContentRoot icon={<BsFillLockFill />} value="Change Password" />
      </NavLink>
    </div>
  );
};

const PopperIconButton = (props) => {
  const { buttonProps, paperProps, purpose } = props;
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [arrowRef, setArrowRef] = useState(null);
  const id = open ? `${purpose}-popper-playground` : null;
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Fragment>
      <Button
        ref={anchorRef}
        onClick={handleClick}
        aria-describedby={id}
        style={{ color: "#fff", textTransform: "capitalize" }}
      >
        {buttonProps.children}
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        className={classes.popper}
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "scrollParent",
          },
          arrow: {
            enabled: true,
            element: arrowRef,
          },
        }}
      >
        <span className={classes.arrow} ref={setArrowRef} />
        <ClickAwayListener onClickAway={handleClick}>
          <Paper
            style={{ padding: "10px", minWidth: "15vw" }}
            onClick={handleClick}
          >
            {paperProps.children}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Fragment>
  );
};

const ListContentRoot = (props) => {
  const { icon, value, onClick } = props;
  const classes = useStyles();
  return (
    <div
      className={`display-flex align-items-center ${classes.listItemRoot}`}
      onClick={onClick}
    >
      <div
        style={{ marginRight: "10px" }}
        className="display-flex align-items-center"
      >
        {icon}
      </div>
      <div className="font-size-13 font-weight-400 font-color-blue">
        {value}
      </div>
    </div>
  );
};
