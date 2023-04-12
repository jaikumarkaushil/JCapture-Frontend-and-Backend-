import { Navigate } from "react-router-dom";

export default function UserSafeRedirect({ children }) {
    const token = localStorage.getItem("token");
    // redirects a user if user is not previously logged in into the system
    if (!token) {
        return <Navigate to="/accounts/login" replace />;
    }

    return children;
}
