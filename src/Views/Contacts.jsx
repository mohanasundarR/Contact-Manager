import { Grid } from "@material-ui/core";
import ContactPaper from "../Components/Paper/ContactPaper";
import { GET_USER_CONTACTS } from "../Api/ContactsQuery";
import { useMutation, useQuery } from "@apollo/client";
import { getDecodedToken } from "../Constants/CommonConstant";
import { SENT_MAIL } from "../Api/UserQuery";
export default function Contacts() {
  const { loading, data, error } = useQuery(GET_USER_CONTACTS, {
    variables: {
      userId: getDecodedToken()?.id,
    },
  });
  const [sentMail] = useMutation(SENT_MAIL);
  const handleSentMail = (email) => {
    sentMail({
      variables: {
        mailDetails: {
          to: [email],
          subject: "RevStone Mailing",
          message: "Mail Sent From RevStone",
        },
      },
    });
  };
  return (
    <div>
      <Grid container spacing={2}>
        {data?.getUserContactDetails?.contacts.map((contact, index) => {
          return (
            <Grid item xs={3}>
              <ContactPaper
                borderColor={getColor(index % 5)}
                name={contact?.name}
                mobileNumber={contact?.mobileNumber}
                mailId={contact?.mailId}
                onClickMail={() => handleSentMail(contact?.mailId)}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
const getColor = (index) => {
  switch (index) {
    case 0:
      return "#6E7BAF";
    case 1:
      return "#D77360";
    case 2:
      return "#ECCEA6";
    case 3:
      return "#73A3BD";
    case 4:
      return "#975A7F";
    default:
      return "#1976d2";
  }
};
