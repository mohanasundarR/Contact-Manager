import { gql } from "@apollo/client";

export const GET_USER_CONTACTS = gql`
  query getUserContactDetails($userId: String!) {
    getUserContactDetails(userId: $userId) {
      userId {
        userName
        mobileNumber
      }
      contacts {
        name
        createdOn
        mailId
        mobileNumber
      }
    }
  }
`;
