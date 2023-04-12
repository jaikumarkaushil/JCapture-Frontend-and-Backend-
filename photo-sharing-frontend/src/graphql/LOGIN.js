import { gql } from "@apollo/client";

const LOGIN = gql`
    mutation authMutation($email: String!, $password: String!) {
        authUser(email: $email, password: $password){
            token
        }
    }
`;

export default LOGIN;
