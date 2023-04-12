import { gql } from "@apollo/client";

const GET_CURRENT_USER = gql`
  {
    me {
      _id
      fullName
      userName
      email
      profileImage # image to profileImage
      isActive
      isPrivate
      lastLogin
      lastLogout
      posts {
        _id
        imageURL
        likes
        postLikes {
        _id
        idPost
        createdAt
        updatedAt
      }
      comments {
        _id
        idPost
        comment
        createdAt
        updatedAt
      }
        createdAt
        updatedAt
      }
      totalPosts
      totalFollowers
      totalFollowing
    }
  }
`;

export default GET_CURRENT_USER;
