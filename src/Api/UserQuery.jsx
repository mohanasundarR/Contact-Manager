import { gql } from "@apollo/client";

export const APPROVE_USER = gql`
  mutation approveUser($userDetails: ApproveUser!) {
    approveUser(userDetails: $userDetails) {
      message
      statusCode
    }
  }
`;
export const SIGNUP = gql`
  mutation signup($userDetails: UserDetails!) {
    signup(userDetails: $userDetails) {
      message
      statusCode
    }
  }
`;
export const LOGIN = gql`
  mutation login($loginDetails: Login) {
    login(loginDetails: $loginDetails) {
      ... on LoginToken {
        token
      }
      ... on Message {
        message
      }
    }
  }
`;
export const GET_USERS = gql`
  {
    getUsers {
      _id
      userName
      mailId
      mobileNumber
      isActive
    }
  }
`;

export const SENT_MAIL = gql`
  mutation sendMail($mailDetails: sendmail!) {
    sendMail(mailDetails: $mailDetails) {
      message
    }
  }
`;
