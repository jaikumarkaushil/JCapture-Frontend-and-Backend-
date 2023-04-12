import { gql } from "@apollo/client";

const GET_FEED = gql`
  query getFeed {
    getAllPosts {
        _id
        user {
            _id
            fullName
            userName
            email
            profileImage
            isActive
            isPrivate
        }
        caption
        imageURL
        likes
        postLikes {
            idUser
            idPost
            createdAt
            updatedAt
        }
        comments {
            _id
            idPost
            idUser
            userName
            userImage
            isLiked
            comment
            createdAt
            updatedAt
        }
        createdAt
        updatedAt
    }
  }
`;

export default GET_FEED;
