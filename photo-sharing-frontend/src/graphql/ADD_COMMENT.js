import { gql } from "@apollo/client";

const ADD_COMMENT = gql`
    mutation AddCommentMutation($idPost: ID!, $comment: String!) {
        addComment(idPost: $idPost, comment: $comment) {
            message
            success
        }
    }
`;

export default ADD_COMMENT;
