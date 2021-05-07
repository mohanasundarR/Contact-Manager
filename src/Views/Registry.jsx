import { TableRow, TableCell, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CommonTable from "../Components/Table/CommonTable";
import { GET_USERS } from "../Api/UserQuery";
import { useQuery, useMutation } from "@apollo/client";
import { APPROVE_USER } from "../Api/UserQuery";

const useStyles = makeStyles({
  button: {
    textTransform: "capitalize",
  },
});
export default function Registry() {
  const classes = useStyles();
  const { loading, data, error, refetch } = useQuery(GET_USERS);
  const [approveUser] = useMutation(APPROVE_USER);
  const handleApproveUser = (id) => {
    approveUser({
      variables: {
        userDetails: {
          userId: id,
          role: "User",
        },
      },
    }).then(() => {
      refetch();
    });
  };
  return (
    <div>
      <CommonTable
        tableHead={
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Mobile Number</TableCell>
            <TableCell>Mail Id</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        }
        tableBody={data?.getUsers?.map((user, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.mobileNumber}</TableCell>
              <TableCell>{user.mailId}</TableCell>
              <TableCell>
                {!user?.isActive && (
                  <Button
                    classes={{ root: classes.button }}
                    onClick={() => handleApproveUser(user?._id)}
                  >
                    Approve
                  </Button>
                )}
                {user?.isActive && <div>Approved</div>}
              </TableCell>
            </TableRow>
          );
        })}
      />
    </div>
  );
}
