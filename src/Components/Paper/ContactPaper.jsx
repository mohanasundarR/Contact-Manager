import { Paper, Avatar, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BiMailSend } from "react-icons/bi";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paperRoot: {
    padding: "10px",
    display: "flex",
  },
  name: {
    fontSize: "16px",
    fontWeight: 500,
    margin: "5px",
    color: "#203864",
  },
  mobile: {
    fontSize: "12px",
    margin: "5px",
    color: "#a7a7a7",
  },
  mailId: {
    fontSize: "12px",
    margin: "5px",
    color: "#a7a7a7",
  },
}));

export default function ContactPaper({
  borderColor,
  name,
  mobileNumber,
  mailId,
  onClickMail,
}) {
  const classes = useStyles();
  return (
    <div>
      <Paper
        classes={{ root: classes.paperRoot }}
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <Avatar>{name?.charAt(0)?.toUpperCase()}</Avatar>
        <div style={{ marginLeft: "5px" }}>
          <p className={classes.name}>{name} R</p>
          <p className={classes.mobile}>{mobileNumber}</p>
          <p className={classes.mailId}>{mailId}</p>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <IconButton onClick={onClickMail}>
            <BiMailSend />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
}
