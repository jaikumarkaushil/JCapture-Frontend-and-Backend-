import { gql } from "@apollo/client";

const REGISTER = gql`
    mutation registerUser($email: String!, $password: String!, $fullName: String!, $userName: String!) {
      registerUser(
        email: $email
        password: $password
        fullName: $fullName
        userName: $userName
      ) {
        token
      }
    }
`;

export default REGISTER;
