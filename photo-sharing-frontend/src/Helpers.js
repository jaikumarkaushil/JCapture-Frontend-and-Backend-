// import { useQuery } from "@apollo/client";
// import GET_CURRENT_USER from "./graphql/GET_CURRENT_USER";

export const getImageUrl = (imagePath) => {
    // const baseUrl = "http://localhost";
    // const commentreturn = `${baseUrl}/storage/${imagePath.replace("public/", "")}`
    return imagePath;
};

export const signOut = async (client, navigate, logout) => {
    try {
        await logout();
        localStorage.removeItem("token"); // remove user token when user logs out of the system
        client.clearStore(); // also clear the stored data of user
        navigate("/accounts/login"); // redirect the user when user logs out
    } catch (error) {
        console.log("error:", error);
    }
};

export const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

export const isLikedByUser = (currentUserId, postLikes) => {
    return (
        postLikes.length &&
        postLikes.filter(
            (postLike) => parseInt(postLike.idUser) === parseInt(currentUserId)
        ).length
    );
};
