import { gql } from "@apollo/client";

const UNLIKE = gql`
    mutation UnlikeMutation($idPost: ID!) {
        deleteLike(idPost: $idPost) {
            message
            success
        }
    }
`;

export default UNLIKE;
