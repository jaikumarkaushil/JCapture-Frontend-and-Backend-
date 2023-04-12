import { createWriteStream, mkdir } from "fs";
import shortid from "shortid";
/**
 * All resolvers related to posts
 * @typedef {Object}
 */
let Likes = (context) => context.di.model.Likes;

export default {
    Query: {
        getCommentsByUser: async (_, { id }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            const comments = await context.di.model.Comments.find({ idUser: id }).populate("idUser").lean();
            return comments;
        }
    },
    Mutation: {
        addComment: async (_, { idPost, comment }, context) => {
            const user = await context.di.authValidation.getUser(context);
            const addedComment = await new context.di.model.Comments({
                idPost,
                idUser: context.user.id,
                userName: user.userName,
                userImage: user.profileImage,
                comment,
                isLiked: false
            })
            if (addedComment) {
                addedComment.save();
                return { "message": "You have unliked the post", "success": true };
            }
            else {
                return { "message": "Something went wrong! Try again", "success": false };
            }
        }
    }
};
