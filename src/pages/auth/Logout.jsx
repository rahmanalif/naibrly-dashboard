import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

const Logout = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const performLogout = async () => {
            try {
                // Call logout API endpoint
                await api.post("/auth/logout");
            } catch (err) {
                console.error("Logout API error:", err);
                setError("Failed to logout from server, but clearing local session.");
            } finally {
                // Clear user data from localStorage regardless of API response
                localStorage.removeItem("token");
                localStorage.removeItem("admin");

                // Redirect to login
                navigate("/signin");
            }
        };

        performLogout();
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <p className="text-lg">Logging out...</p>
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default Logout;
