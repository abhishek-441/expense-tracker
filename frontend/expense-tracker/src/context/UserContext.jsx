// import React, { createContext, useState } from "react";

// export const UserContext = createContext();

// const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     // Function to update user Data
//     const updateUser = (userData) => {
//             setUser(userData);
//         };

//         //Function to clear user data ( e.g. on logout)
//         const clearUser = () => {
//              setUser(null);
//         };



//         return (
//             <UserContext.Provider
//             value={{
//                 user,
//                 updateUser,
//                 clearUser,
//             }}
//             >
//                 {children}
//             </UserContext.Provider>
//         );
//     }

//     export default UserProvider;







import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore user after page refresh
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(
                    API_PATHS.AUTH.GET_USER_INFO
                );

                setUser(response.data);
            } catch (error) {
                console.error("Failed to restore user:", error);

                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Update user
    const updateUser = (userData) => {
        setUser(userData);
    };

    // Logout
    const clearUser = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
                loading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;