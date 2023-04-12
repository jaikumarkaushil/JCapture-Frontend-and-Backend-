import { gql } from "@apollo/client";

const GET_POST_LIKES = gql`
    query getPostLike($idPost: ID!) {
        getPostLikes(idPost: $idPost) {
            _id
            fullName
            userName
            email
            profileImage
        }
    }
`;

export default GET_POST_LIKES;
