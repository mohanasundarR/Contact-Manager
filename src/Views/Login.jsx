import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import { FaUserAlt, FaUnlock } from "react-icons/fa";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputAdornmentTextField from "../Components/TextField/InputAdornmentTextField";
import CommonButton from "../Components/Button/CommonButton";
import { ImKey } from "react-icons/im";
import { FaChrome } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";
import { LOGIN } from "../Api/UserQuery";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "url(/background.png) no-repeat center center fixed",
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
  },
  papperRoot: {
    margin: "auto",
    minHeight: "350px",
    borderRadius: "16px",
    padding: "32px",
    width: "44%",
    [theme.breakpoints.down("md")]: {
      width: "70%",
      margin: "16px auto",
    },
  },
  text: {
    fontSize: "12px",
    margin: 0,
    marginBottom: theme.spacing(1),
  },
}));
export default function Login() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [login] = useMutation(LOGIN);
  const [mailId, updateMailId] = useState("");
  const [password, updatePassword] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("user_token")) history.push("/home");
  }, []);
  const handleMailOnchange = (event) => {
    updateMailId(event.target.value);
  };
  const handlePasswordOnchange = (event) => {
    updatePassword(event.target.value);
  };
  const handleLogin = () => {
    login({
      variables: {
        loginDetails: { mailId, password },
      },
    }).then((response) => {
      if (response?.data?.login?.token) {
        sessionStorage.setItem("user_token", response?.data?.login?.token);
        setTimeout(() => {
          history.push("/home");
        }, 300);
      }
    });
  };
  return (
    <div className={classes.root}>
      <Paper elevation={4} classes={{ root: classes.papperRoot }}>
        <div className="login-signup-hanging-card">
          <BsShieldLock size="2em" />
        </div>
        <center>
          <FaChrome size="2em" color={theme.palette.primary.dark} />
          <div style={{ fontSize: "18px", fontWeight: 400, color: "#828282" }}>
            Contact Manager
          </div>
        </center>
        <Heading title="Email Id" />
        <InputAdornmentTextField
          inputAdornmentPosition="start"
          inputAdornmentIcon={<FaUserAlt className="textfield-icon-color" />}
          placeholder="Email Id"
          name={"userCode"}
          value={mailId}
          onChange={handleMailOnchange}
        />
        <Heading title="Password" />
        <InputAdornmentTextField
          type="password"
          inputAdornmentPosition="start"
          inputAdornmentIcon={<FaUnlock className="textfield-icon-color" />}
          placeholder="Password"
          name={"password"}
          value={password}
          onChange={handlePasswordOnchange}
        />

        <center>
          <CommonButton style={{ marginTop: "24px" }} onClick={handleLogin}>
            <ImKey />
            &nbsp;&nbsp;Login
          </CommonButton>
          <p className={classes.text}>
            Dont Have an account <a href="/signup">signup here</a>
          </p>
        </center>
      </Paper>
    </div>
  );
}
const Heading = ({ title }) => {
  return (
    <p
      style={{
        color: "#4f4f4f",
        fontWeight: 500,
        fontSize: "13px",
        marginBottom: "8px",
      }}
    >
      {title}
    </p>
  );
};
