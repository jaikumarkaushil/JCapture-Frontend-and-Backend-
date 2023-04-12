import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProfileEdit from "./pages/ProfileEdit";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Navbar from "./components/Navbar";
import UserSafeRedirect from "./components/UserSafeRedirect";
import ModalSettings from "./components/ModalSettings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePassword from "./pages/ChangePassword";
import Register from "./pages/Register";

//Add all icons to the library so you can use it in your page
library.add(fab, fas, far);

export default function App() {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    return (
        <>
            <Routes>
                <Route path="/accounts/login" exact element={<Login />} />
                <Route path="/accounts/register" exact element={<Register />} />
                <Route
                    path="/"
                    exact
                    element={
                        <UserSafeRedirect>
                            <Navbar />
                            <div className="container pt-8 max-w-5xl">
                                <Home />
                            </div>
                        </UserSafeRedirect>
                    }
                />
                <Route
                    path="/:username"
                    element={
                        <UserSafeRedirect>
                            <Navbar />
                            <div className="container pt-8 max-w-5xl">
                                <Profile
                                    setIsSettingsModalOpen={
                                        setIsSettingsModalOpen
                                    }
                                />
                            </div>
                        </UserSafeRedirect>
                    }
                />
                <Route
                    path="/accounts"
                    element={
                        <UserSafeRedirect>
                            <Navbar />
                            <div className="container pt-8 max-w-5xl">
                                <Settings />
                            </div>
                        </UserSafeRedirect>
                    }
                >
                    <Route index element={<Navigate to="edit" replace />} />
                    <Route path="edit" element={<ProfileEdit />} />
                    <Route path="password" element={<ChangePassword />} />
                </Route>
            </Routes>

            <ModalSettings
                open={isSettingsModalOpen}
                setOpen={setIsSettingsModalOpen}
            />

            <ToastContainer theme="dark" position="bottom-center" />
        </>
    );
}
