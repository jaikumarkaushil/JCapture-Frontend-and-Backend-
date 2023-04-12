import { gql } from "@apollo/client";

const FOLLOW = gql`
    mutation UnfollowMutation($idUser: ID!) {
        unfollowUser(id: $idUser) {
            message
            success
        }
    }
`;

export default FOLLOW;
