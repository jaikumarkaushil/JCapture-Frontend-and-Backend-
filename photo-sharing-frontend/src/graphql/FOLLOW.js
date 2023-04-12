import { gql } from "@apollo/client";

const FOLLOW = gql`
    mutation FollowMutation($idUser: ID!) {
        followUser(id: $idUser) {
            message
            success
        }
    }
`;

export default FOLLOW;
