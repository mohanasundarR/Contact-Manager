import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
} from "@material-ui/core";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  heading: {
    background: "#0078bf4f",
  },
});
export default function CommonTable({ tableHead, tableBody }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.heading}>{tableHead}</TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </TableContainer>
  );
}
