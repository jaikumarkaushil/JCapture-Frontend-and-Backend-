/**
 * All resolvers related to posts
 * @typedef {Object}
 */

export default {
    Query: {
        /**
         * It allows to administrators users to list all users registered
         */
        userLikedPosts: async (_, { idPost }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            const userId = context.user.id;
            const userName = context.user.userName;
            const Likes = await context.di.model.Likes.find({ idUser: userId, idPost }).lean();
            return Likes;
        },
        getPostLikesCount: async (parent, { idPost }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            const count = await context.di.model.Likes.find({ idPost }).count();
            return count;
        },
        getPostLikes: async (parent, { idPost }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            const Likes = await context.di.model.Likes.find({ idPost }).populate("idUser").lean();
            const users = []
            Likes.forEach(like => {
                users.push(like.idUser)
            })

            return users;
        },
        isLiked: async (_, { idPost }, context) => {
            try {
                const result = await context.di.model.Likes.findOne({ idPost }).where({
                    idUser: context.user.id,
                });
                if (!result) throw new Error("The post is not liked");
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
    Mutation: {
        addLike: async (_, { idPost }, context) => {
            try {
                const userId = await context.user.id;
                const alreadyLiked = await context.di.model.Likes.findOne({ idUser: userId, idPost: idPost }).lean();
                if (!alreadyLiked) {
                    const like = await new context.di.model.Likes({
                        idPost,
                        idUser: context.user.id,
                    });
                    like.save();
                    return { "message": "You have liked the post", "success": true };
                }
                return { "message": "You have already liked the post", "success": false };
            } catch (error) {
                console.log(error);
                return { "message": "Something went wrong! Try again", "success": false };

            }
        },
        deleteLike: async (_, { idPost }, context) => {
            try {
                const userId = context.user.id;
                const isLiked = context.di.model.Likes.findOne({ idUser: userId, idPost: idPost }).lean();
                if (!isLiked) {
                    return { "message": "You have not liked the post before", "success": false };
                }
                await context.di.model.Likes.findOneAndDelete({ idPost }).where({
                    idUser: context.user.id,
                });
                return { "message": "You have unliked the post", "success": true };
            } catch (error) {
                console.log(error);
                return { "message": "Something went wrong! Try again", "success": false };
            }
        }
    }
};
