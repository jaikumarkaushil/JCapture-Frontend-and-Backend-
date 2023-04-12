import { gql } from "@apollo/client";

const GET_SUGGESTIONS = gql`
    query getSuggestions {
        suggestions {
            id
            username
            image
        }
    }
`;

export default GET_SUGGESTIONS;
