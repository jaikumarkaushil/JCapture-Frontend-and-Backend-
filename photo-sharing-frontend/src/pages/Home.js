import Post from "../components/Post";
import Suggestions from "../components/Suggestions";
import Stories from "../components/Stories";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import GET_CURRENT_USER from "../graphql/GET_CURRENT_USER";
import GET_FEED from "../graphql/GET_FEED";
import LOGOUT from "../graphql/LOGOUT";
import { useApolloClient } from "@apollo/client";
import { signOut } from "../Helpers";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home(props) {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_FEED);
    const {
        loading: loadingCurrentUser,
        error: errorCurrentUser,
        data: dataCurrentUser,
    } = useQuery(GET_CURRENT_USER);

    const [logout] = useMutation(LOGOUT);
    const client = useApolloClient();

    if (loadingCurrentUser || loading) {
        return <Spinner />;
    }

    if (error || errorCurrentUser) {
        if (error) {
            return "Error while loading feed"
        }
        return "Error... while calling user data";
    }

    return (
        <main className="bg-zinc-50 grid grid-cols-3">
            <div className="md:px-12 lg:px-0 col-span-3 lg:col-span-2">
                <Stories />
                {data.getAllPosts.map((post) => (
                    <Post
                        key={post._id}
                        post={post}
                        id={post._id}
                        currentUserId={dataCurrentUser.me._id}
                        caption={post.caption}
                        image={post.imageURL}
                        username={post.user.userName}
                        userImage={post.user.profileImage}
                        likes={post.likes}
                        created_time_ago={post.createdAt}
                        comments={post.comments}
                        postLikes={post.postLikes}
                    />
                ))}
            </div>
            <div className="col-span-1 hidden lg:block">
                <div className="fixed p-5 w-80">
                    <div className="flex flex-row">
                        <a href={`/${dataCurrentUser.me.userName}`}>
                            <img
                                className="rounded-full"
                                src={dataCurrentUser.me.profileImage}
                                width="100"
                                alt="profile img"
                            />
                        </a>
                        <div className="w-72 pl-2 m-auto">
                            <div className="text-sm font-medium">
                                <Link to={`/${dataCurrentUser.me.userName}`}>
                                    {dataCurrentUser.me.username}
                                </Link>
                            </div>
                            <div className="text-gray-500 text-sm leading-4">
                                {dataCurrentUser.me.fullName}
                            </div>
                        </div>
                        <div className="w-32 text-right m-auto">
                            <span
                                className="text-xs text-sky-500 font-bold cursor-pointer"
                                onClick={() =>
                                    signOut(client, navigate, logout)
                                }
                            >
                                Sign Out
                            </span>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        </main>
    );
}


// import React from 'react';
// import GET_CURRENT_USER from "../graphql/GET_CURRENT_USER";
// import { useQuery, useMutation } from "@apollo/client";



// const Home = () => {
//     const { loading, error, data } = useQuery(GET_CURRENT_USER);
//     console.log(data)
//     return(
//         <div style={{height: "100vh"}}>
//             <div className="d-flex flex-column align-items-center justify-content-center">
//                 <div className="text-center">
//                     <span className="fa fa-spinner fa-puyarn lse fa-3x fa-fw text-primary"></span>
//                     <p>Loading . . .</p>
//                 </div>
//                 <div className="d-flex flex-row align-items-center justify-content-center mx-auto w-100">
//                     <img src="images/JaiInsta-Logo.png" alt="Jai-Logo"/>
//                     <h1 className="light-font">Photo Sharing App</h1>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Home;
