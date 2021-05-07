import { OutlinedInput } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  input: {
    padding: "8px",
    fontSize: "14px",
    height: "20px",
  },
  small: {
    padding: "5px",
  },
}));
export default function OutlinedInputWithoutLabel({
  placeholder,
  title,
  required,
  focused,
  disabled,
  type,
  onClick,
  value,
  defaultValue,
  multiline,
  small = true,
  ...rest
}) {
  const classes = useStyles();
  return (
    <OutlinedInput
      multiline={multiline}
      fullWidth
      type={type}
      defaultValue={defaultValue}
      value={value}
      // className={classes.textFieldRoot}
      disabled={disabled}
      autoFocus={focused}
      classes={{
        input: clsx(classes.input, {
          [classes.small]: small,
        }),
        disabled: classes.disabled,
      }}
      size="small"
      margin="none"
      placeholder={placeholder}
      {...rest}
    />
  );
}
