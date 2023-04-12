import { gql } from "@apollo/client";

const LIKE = gql`
    mutation addLike($idPost: ID!) {
        addLike(idPost: $idPost) {
            message
            success
        }
    }
`;

export default LIKE;
