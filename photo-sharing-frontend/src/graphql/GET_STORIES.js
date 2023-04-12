import { gql } from "@apollo/client";

const GET_STORIES = gql`
    query GetStories {
        getStories {
            _id
            userName
            profileImage
        }
    }
`;

export default GET_STORIES;
