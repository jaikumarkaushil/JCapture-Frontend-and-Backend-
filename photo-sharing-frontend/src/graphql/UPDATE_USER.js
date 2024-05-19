import { gql } from "@apollo/client";

const UPDATE_USER = gql`
    mutation UpdateUser(
        $fullName: String
        $userName: String
        $bio: String
        $website: String
        $profileImage: Upload
    ) {
        updateUser(
            fullName: $fullName
            userName: $userName
            bio: $bio
            website: $website
            profileImage: $profileImage
        ) {
            message
            success
        }
    }
`;

export default UPDATE_USER;
