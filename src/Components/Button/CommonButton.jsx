import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    textTransform: "capitalize",
    borderRadius: "20px",
    padding: theme.spacing(1),
    minWidth: "25%",
    color: theme.palette.common.white,
    margin: theme.spacing(1),
    fontSize: "14px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "55%",
      fontSize: "12px",
      padding: "5px",
    },
  },
  fullWidth: {
    minWidth: 0,
    width: "100%",
  },
}));
export default function CommonButton({
  children,
  style,
  className,
  onClick,
  fullWidth,
}) {
  const classes = useStyles();

  return (
    <Button
      onClick={onClick}
      className={className}
      classes={{
        root: clsx(classes.buttonRoot, {
          [classes.fullWidth]: fullWidth,
        }),
      }}
      style={{ ...style }}
      color="primary"
      variant="contained"
    >
      {children}
    </Button>
  );
}
