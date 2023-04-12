import convertToBase64 from "../../shared/convertToBase64.js";
import fs from "fs";
/**
 * All resolvers related to posts
 * @typedef {Object}
 */
let Likes = (context) => context.di.model.Likes;

export default {
    Query: {
        /**
         * It allows to administrators users to list all users registered
         */
        getAllPosts: async (_, args, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            const allPosts = await context.di.model.Posts.aggregate([
                {
                    "$lookup": {
                        from: "users",
                        localField: "idUser",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    "$lookup": {
                        from: "likes",
                        localField: "_id",
                        foreignField: "idPost",
                        as: "postLikes"
                    }
                },
                {
                    "$lookup": {
                        from: "comments",
                        localField: "_id",
                        foreignField: "idPost",
                        as: "comments"
                    },
                }
            ])

            allPosts.forEach(post => {
                post["likes"] = post.postLikes.length
                post["user"] = post.user[0]
            })
            return allPosts
        },
        getPost: async (_, { userName }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            const user = await context.di.model.Users.findOne({ userName: userName }).lean();
            const userId = user._id
            const qPosts = await context.di.model.Posts.aggregate([
                { "$match": { "idUser": userId } },
                {
                    "$set": {
                        "user": user
                    }
                },
                {
                    "$lookup": {
                        from: "likes",
                        localField: "_id",
                        foreignField: "idPost",
                        as: "postLikes"
                    }
                },
                {
                    "$lookup": {
                        from: "comments",
                        localField: "_id",
                        foreignField: "idPost",
                        as: "comments"
                    }
                },
            ])
            qPosts.forEach(post => {
                post["likes"] = post.postLikes.length
            })
            return qPosts
        },
        getMyPosts: async (parent, args, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            const user = await context.di.authValidation.getUser(context);
            const userId = user._id
            // use either mongoDB agregat or deafult calling method
            // const myPosts = user.posts
            // myPosts["idUser"] = user
            // myPosts["postLikes"] = await Likes(context).find({ idPost: myPosts._id });
            // myPosts["likes"] = myPosts.postLikes.length
            // myPosts["comments"] = await context.di.model.Comments.find({ idPost: myPosts._id });

            const myPosts = await context.di.model.Posts.aggregate([
                { "$match": { "idUser": userId } },
                {
                    "$set": {
                        "user": user
                    }
                },
                {
                    "$lookup": {
                        from: "likes",
                        localField: "_id",
                        foreignField: "idPost",
                        as: "postLikes"
                    }
                },
                {
                    "$lookup": {
                        from: "comments",
                        localField: "_id",
                        foreignField: "idPost",
                        as: "comments"
                    }
                }
            ])
            await context.di.model.Comments.populate(myPosts, { path: "comments.idUser" })
            myPosts.forEach(post => {
                post["likes"] = post.postLikes.length
            })
            return myPosts
        },
    },
    Mutation: {
        uploadPost: async (_, { file, caption }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            // converting our file to base64
            let base64_encoded = null;
            try {
                base64_encoded = await convertToBase64(file);
            } catch (error) {
                console.log(error)
            }

            // fs.writeFileSync("text.txt", base64_encoded);
            // saving our file to the mongodb
            const userId = context.user.id
            const imageData = { idUser: userId, imageURL: base64_encoded, caption: caption }
            const postImage = new context.di.model.Posts(imageData)
            await postImage.save();

            return { "message": "Image with caption is successfully posted" };
        }
    }
};
