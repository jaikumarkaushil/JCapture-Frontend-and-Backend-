import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalPostActions from "./ModalPostActions";
import { useMutation } from "@apollo/client";
import LIKE from "../graphql/LIKE";
import UNLIKE from "../graphql/UNLIKE";
import GET_FEED from "../graphql/GET_FEED";
import ADD_COMMENT from "../graphql/ADD_COMMENT";
import { isLikedByUser } from "../Helpers";
import ModalPost from "../components/ModalPost";
import moment from "moment/moment";

const MAX_COMMENTS = 3;

function Post(props) {
    const {
        id,
        currentUserId,
        image,
        caption,
        username,
        userImage,
        likes,
        created_time_ago,
        comments,
        postLikes,
        post,
    } = props;

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPostModalOpen, setPostModalOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [addLike] = useMutation(LIKE);
    const [unlike] = useMutation(UNLIKE);
    const [addComment] = useMutation(ADD_COMMENT);

    const likePost = async (id) => {
        try {
            await addLike({
                variables: { idPost: id },
                refetchQueries: [
                    {
                        query: GET_FEED,
                    },
                ],
            });
        } catch (error) {
            console.log("error:", error);
        }
    };

    const unlikePost = async (id) => {
        try {
            await unlike({
                variables: { idPost: id },
                refetchQueries: [
                    {
                        query: GET_FEED,
                    },
                ],
            });
        } catch (error) {
            console.log("error:", error);
        }
    };

    const createComment = async () => {
        if (!comment) {
            return;
        }

        setLoading(true);

        try {
            await addComment({
                variables: { idPost: id, comment },
                refetchQueries: [
                    {
                        query: GET_FEED,
                    },
                ],
            });

            setLoading(false);
            setComment("");
        } catch (error) {
            console.log("error:", error);
        }
    };

    return (
        <>
            <ModalPost
                open={isPostModalOpen}
                setOpen={setPostModalOpen}
                post={post}
                currentUserId={currentUserId}
            />
            <ModalPostActions open={isModalOpen} setOpen={setIsModalOpen} />
            <div className="border border-slate-200 mb-5">
                <div className="p-3 flex flex-row">
                    <div className="flex-1">
                        <span className="">
                            <img
                                className="rounded-full w-8 max-w-none inline"
                                src={userImage}
                                alt="User Img"
                            />{" "}
                            <span className="font-medium text-sm ml-2">
                                {username}
                            </span>
                        </span>
                    </div>
                    <div className="">
                        <span
                            className=""
                            href="#"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <FontAwesomeIcon icon="ellipsis" />
                        </span>
                    </div>
                </div>
                <img
                    className="w-100"
                    alt={`Uploaded by ${username}`}
                    src={image}
                />

                <div className="header p-3 flex flex-row text-2xl">
                    <div className="flex-1 ">
                        <span
                            className={`mr-3 cursor-pointer  ${isLikedByUser(currentUserId, postLikes)
                                ? "text-red-600"
                                : "hover:text-gray-500"
                                }`}
                            onClick={() =>
                                isLikedByUser(currentUserId, postLikes)
                                    ? unlikePost(id)
                                    : likePost(id)
                            }
                        >
                            <FontAwesomeIcon
                                icon={[
                                    isLikedByUser(currentUserId, postLikes)
                                        ? "fas"
                                        : "far",
                                    "heart",
                                ]}
                            />
                        </span>
                        <span
                            className="mr-3 hover:text-gray-500 cursor-pointer"
                            onClick={() => setPostModalOpen(true)}
                        >
                            <FontAwesomeIcon icon={["far", "comment"]} />
                        </span>
                        <span className="hover:text-gray-500 cursor-pointer">
                            <FontAwesomeIcon icon={["far", "paper-plane"]} />
                        </span>
                    </div>
                    <div className="">
                        <span
                            className="cursor-pointer hover:text-gray-500"
                            onClick={() => setIsBookmarked(!isBookmarked)}
                        >
                            <FontAwesomeIcon
                                icon={[
                                    isBookmarked ? "fas" : "far",
                                    "bookmark",
                                ]}
                            />
                        </span>
                    </div>
                </div>
                <div className="font-medium text-sm px-3">{likes} likes</div>
                {caption && (
                    <div className="px-3 text-sm">
                        <span className="font-medium">{username}</span> {caption}
                    </div>
                )}
                {comments.length && comments.length > MAX_COMMENTS ? (
                    <span
                        className="block text-gray-500 px-3 py-2 text-sm cursor-pointer"
                        onClick={() => setPostModalOpen(true)}
                    >
                        View all {comments.length} comments
                    </span>
                ) : (
                    ""
                )}

                {comments.length
                    ? comments
                        .slice(MAX_COMMENTS * -1)
                        .map((comment, index) => (
                            <div
                                key={comment._id}
                                className={`px-3 ${index !== 0 ? "pt-2" : ""
                                    } text-sm`}
                            >
                                <span className="font-medium">
                                    {comment.userName}
                                </span>{" "}
                                {comment.comment}
                                <span
                                    className={`block float-right text-xs cursor-pointer ${comment.isLiked ? "text-red-600" : ""
                                        }`}
                                >
                                    <FontAwesomeIcon
                                        icon={[
                                            comment.isLiked ? "fas" : "far",
                                            "heart",
                                        ]}
                                    />
                                </span>
                            </div>
                        ))
                    : ""}

                <div className="text-gray-500 px-3 pt-2 pb-5 text-[0.65rem] tracking-wide">
                    {moment(created_time_ago).fromNow()}
                </div>

                <div className="px-3 py-2 flex flex-row border-t relative">
                    <div
                        className={`absolute top-0 left-0 h-full w-full text-center pt-3 ${loading ? "block" : "hidden"
                            }`}
                    >
                        <FontAwesomeIcon
                            className={`fa-spin text-gray-400 text-2xl`}
                            icon={["fas", "spinner"]}
                        />
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl cursor-pointer">
                            <FontAwesomeIcon icon={["far", "face-smile"]} />
                        </span>
                    </div>
                    <div className="flex-1 pr-3 py-1">
                        <input
                            className={`w-full px-3 py-1 text-sm bg-slate-50 outline-0`}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            type="text"
                            placeholder="Add a comment..."
                            disabled={loading}
                        />
                    </div>
                    <div className="flex items-center text-sm">
                        <span
                            className={` font-medium ${comment
                                ? "cursor-pointer text-sky-500"
                                : "text-sky-200"
                                }`}
                            onClick={() => createComment()}
                        >
                            Post
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;
