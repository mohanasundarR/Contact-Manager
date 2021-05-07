import { TextField, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  inputStyle: {},
}));
export default function InputAdornmentTextField({
  inputAdornmentIcon,
  inputAdornmentPosition = "start",
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  error,
}) {
  const classes = useStyles();

  return (
    <TextField
      type={type}
      fullWidth
      inputProps={{
        className: classes.inputStyle,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position={inputAdornmentPosition}>
            {inputAdornmentIcon}
          </InputAdornment>
        ),
      }}
      id="outlined-helperText"
      size="small"
      placeholder={placeholder}
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
}
