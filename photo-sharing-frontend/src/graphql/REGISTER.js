import { gql } from "@apollo/client";

const REGISTER = gql`
    mutation registerUser($email: String!, $password: String!, $userName: String!, $fullName: String!) {
      registerUser(
        email: $profileImage
        password: $password
        userName: $userName
        fullName: $fullName
      ) {
        token
      }
    }
`;

export default REGISTER;
