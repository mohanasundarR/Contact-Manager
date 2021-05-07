import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { FaUserAlt, FaUnlock, FaChrome } from "react-icons/fa";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputAdornmentTextField from "../Components/TextField/InputAdornmentTextField";
import CommonButton from "../Components/Button/CommonButton";
import { ImKey } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import { HiDeviceMobile } from "react-icons/hi";
import { GrMail } from "react-icons/gr";
import { SIGNUP } from "../Api/UserQuery";
import { useMutation } from "@apollo/client";
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
export default function Signup() {
  const classes = useStyles();
  const theme = useTheme();
  const [userName, updateUserName] = useState("");
  const [password, updatePassword] = useState("");
  const [mailId, updateMailId] = useState("");
  const [mobileNumber, updateMobileNumber] = useState("");
  const [signup] = useMutation(SIGNUP);
  const handleOnUserNameChange = (event) => {
    updateUserName(event.target.value);
  };
  const handleOnPasswordChange = (event) => {
    updatePassword(event.target.value);
  };
  const handleOnMailIdChange = (event) => {
    updateMailId(event.target.value);
  };
  const handleOnMobileNumberChange = (event) => {
    updateMobileNumber(event.target.value);
  };
  const handleOnSignUp = () => {
    signup({
      variables: {
        userDetails: {
          userName,
          password,
          mailId,
          mobileNumber,
        },
      },
    });
  };
  return (
    <div className={classes.root}>
      <Paper elevation={4} classes={{ root: classes.papperRoot }}>
        <div className="login-signup-hanging-card">
          <MdEdit size="2em" color="#fff" />
        </div>
        <center>
          <FaChrome size="2em" color={theme.palette.primary.dark} />
          <div style={{ fontSize: "18px", fontWeight: 400, color: "#828282" }}>
            Contact Manager
          </div>
        </center>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Heading title="User Name" />
            <InputAdornmentTextField
              inputAdornmentPosition="start"
              inputAdornmentIcon={
                <FaUserAlt className="textfield-icon-color" />
              }
              placeholder="User Name"
              name={"username"}
              value={userName}
              onChange={handleOnUserNameChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Heading title="MobileNumber" />
            <InputAdornmentTextField
              inputAdornmentPosition="start"
              inputAdornmentIcon={
                <HiDeviceMobile className="textfield-icon-color" />
              }
              placeholder="MobileNumber"
              name={"mobileNumber"}
              value={mobileNumber}
              onChange={handleOnMobileNumberChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Heading title="Mail Id" />
            <InputAdornmentTextField
              inputAdornmentPosition="start"
              inputAdornmentIcon={<GrMail className="textfield-icon-color" />}
              placeholder="Mail Id"
              name={"mailId"}
              value={mailId}
              onChange={handleOnMailIdChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Heading title="Password" />
            <InputAdornmentTextField
              type="password"
              inputAdornmentPosition="start"
              inputAdornmentIcon={<FaUnlock className="textfield-icon-color" />}
              placeholder="Password"
              name={"password"}
              value={password}
              onChange={handleOnPasswordChange}
            />
          </Grid>
        </Grid>

        <center>
          <CommonButton style={{ marginTop: "24px" }} onClick={handleOnSignUp}>
            <ImKey />
            &nbsp;&nbsp;Signup
          </CommonButton>
          <p className={classes.text}>
            Have an account <a href="/">login here</a>
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
