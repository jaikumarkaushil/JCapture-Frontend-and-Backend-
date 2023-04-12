import { gql } from "@apollo/client";

const ADD_POST = gql`
    mutation AddPost($caption: String!, $file: Upload!) {
        uploadPost(file: $file, caption: $caption) {
            message
            success
        }
    }
`;

export default ADD_POST;
