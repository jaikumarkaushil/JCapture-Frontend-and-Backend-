import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    userImage: {
        type: String,
        required: true,
        unique: true
    },
    idPost: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'posts'
    },
    isLiked: {
        type: Boolean,
        required: true,
        default: false
    },
    comment: {
        type: String,
    },
}, { timestamps: true });

export { CommentSchema };
