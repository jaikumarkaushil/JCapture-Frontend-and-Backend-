import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import GET_CURRENT_USER from "../graphql/GET_CURRENT_USER";
import UPDATE_USER from "../graphql/UPDATE_USER";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export default function ProfileEdit(props) {
    const [updateUser] = useMutation(UPDATE_USER);
    const [updating, setUpdating] = useState(false);
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const { loading, error } = useQuery(GET_CURRENT_USER, {
        onCompleted: (data) => {
            setFullName(data.me.fullName);
            setUserName(data.me.userName);
            setBio(data.me.bio);
            setWebsite(data.me.website);
            setEmail(data.me.email);
            setProfileImage(data.me.profileImage);
        },
    });

    const submit = async () => {
        if (!fullName || !userName || !email) {
            toast.error(
                "You forgot to provide either a name, userName or email"
            );
            return;
        }

        setUpdating(true);

        try {
            await updateUser({
                variables: {
                    fullName,
                    userName,
                    bio,
                    website,
                    email
                },
            });

            toast.success("Profile updated");

            setUpdating(false);
        } catch (error) {
            setUpdating(false);
            let { graphQLErrors } = error;
            console.log("graphQLErrors:", graphQLErrors);
            if (graphQLErrors[0].extensions.category === "validation") {
                Object.keys(graphQLErrors[0].extensions.validation).forEach(
                    (value) => {
                        toast.error(
                            graphQLErrors[0].extensions.validation[value][0]
                        );
                    }
                );
            }
        }
    };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return "Error...";
    }

    const handleFileUpload = () => {
        document.getElementById('file-upload-button').click();
    }


    return (
        <>
            <div className="flex flex-row">
                <div className="bg-green p-3 rounded flex items-start justify-center">
                    <img
                        className="rounded-full"
                        src={profileImage}
                        width="40"
                        alt="profile img"
                    />
                </div>
                <div>
                    <h1 className="text-2xl">{userName}</h1>
                    <button className="text-sm text-sky-500 font-bold" onClick={handleFileUpload}>
                        Change Profile Photo
                    </button>
                    <input
                        type="file"
                        id='file-upload-button'
                        className="hidden"
                        accept='.jpeg, .png, .jpg'
                        onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                </div>
            </div>
            <div className="flex flex-row mt-5 items-center">
                <div className="w-1/3 flex flex-row place-content-end align-center pr-8">
                    <label className="m-0 p-0 align-baseline font-bold flex align-center">
                        Name
                    </label>
                </div>
                <div className="w-2/3 pr-10">
                    <input
                        type="text"
                        className="border p-1 px-3 w-full "
                        placeholder="Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <p className="text-gray-400 text-xs">
                        Help people discover your account by using the name
                        you're known by: either your full name, nickname, or
                        business name.
                    </p>
                </div>
            </div>
            <div className="flex flex-row mt-5 items-center">
                <div className="w-1/3 flex flex-row place-content-end align-center pr-8">
                    <label className="m-0 p-0 align-baseline font-bold flex align-center">
                        UserName
                    </label>
                </div>
                <div className="w-2/3 pr-10">
                    <input
                        type="text"
                        className="border p-1 px-3 w-full"
                        placeholder="UserName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-row mt-5 items-center">
                <div className="w-1/3 flex flex-row place-content-end align-center pr-8">
                    <label className="m-0 p-0 align-baseline font-bold flex align-center">
                        Website
                    </label>
                </div>
                <div className="w-2/3 pr-10">
                    <input
                        type="text"
                        className="border p-1 px-3 w-full"
                        placeholder="https://www.mywebsite.com"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-row mt-5 items-center">
                <div className="w-1/3 flex flex-row place-content-end align-center pr-8">
                    <label className="m-0 p-0 align-baseline font-bold flex align-center">
                        Bio
                    </label>
                </div>
                <div className="w-2/3 pr-10">
                    <textarea
                        className="border p-1 px-3 w-full"
                        rows="3"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-row mt-5 items-center">
                <div className="w-1/3 flex flex-row place-content-end align-center pr-8">
                    <label className="m-0 p-0 align-baseline font-bold flex align-center">
                        Email
                    </label>
                </div>
                <div className="w-2/3 pr-10">
                    <input
                        type="text"
                        className="border p-1 px-3 w-full"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            {/* <div className="flex flex-row mt-5 items-center">
                <div className="w-1/3 flex flex-row place-content-end align-center pr-8">
                    <label className="m-0 p-0 align-baseline font-bold flex align-center">
                        Phone Number
                    </label>
                </div>
                <div className="w-2/3 pr-10">
                    <input
                        type="text"
                        className="border p-1 px-3 w-full"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
            </div> */}
            <div className="flex flex-row mt-5 items-center">
                <div className="w-1/3 flex flex-row place-content-end align-center pr-8" />
                <div className="w-2/3 pr-10">
                    <button
                        onClick={submit}
                        className="bg-sky-500 text-white font-semibold py-1 px-2 rounded text-sm disabled:opacity-50"
                        type="submit"
                        disabled={updating}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}
