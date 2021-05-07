import {
  OutlinedInput,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { CgSearch } from "react-icons/cg";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Fragment } from "react";
const useStyles = makeStyles((theme) => ({
  input: {
    padding: "8px",
    fontSize: "14px",
    height: "20px",
  },
  wrapper: {
    marginBottom: "5px",
    display: "flex",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: "14px",
    fontWeight: 400,
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
    },
  },
  disabled: {
    backgroundColor: "#fafafa",
  },
  textFieldRoot: {
    width: "250px",
    [theme.breakpoints.down("md")]: {
      width: "200px",
    },
  },
}));
export default function OutlinedInputWithLabel({
  placeholder,
  title,
  required,
  focused,
  disabled,
  type,
  onClick,
}) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        <label>{title}</label>
        {required && <sup className="required-astric">*</sup>}
      </div>
      <OutlinedInput
        className={classes.textFieldRoot}
        endAdornment={
          <Fragment>
            {type === "lookup" && (
              <Tooltip title={`Lookup ${title}`} placement="top">
                <InputAdornment>
                  <IconButton size="small" onClick={onClick}>
                    <CgSearch
                      size="0.8em"
                      color={theme.palette.secondary.main}
                    />
                  </IconButton>
                </InputAdornment>
              </Tooltip>
            )}
            {type === "sentmessage" && (
              <Tooltip title="Send Link To Customer" placement="top">
                <IconButton size="small">
                  <BiMessageSquareDetail
                    size="0.8em"
                    color={theme.palette.secondary.main}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Fragment>
        }
        disabled={disabled}
        autoFocus={focused}
        classes={{ input: classes.input, disabled: classes.disabled }}
        size="small"
        margin="none"
        placeholder={placeholder}
      />
    </div>
  );
}
