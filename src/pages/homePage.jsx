import { Fragment, useEffect, useState } from 'react';
import AdminComponent from "../components/admin/adminComponent.jsx";
import CenteredButtons from "../components/button/centeredButtons.jsx";
import AddItemField from "../components/fieldBox/addItemField.jsx";
import { auth } from "/src/config/firebaseConfig.js";
import { getUserByEmail } from "../services/userService.js";
import {logout} from "../services/authService.js";
import ItemList from "../components/user/itemList.jsx";

const HomePage = () => {
    const [isAdmin, setIsAdmin] = useState(false); // Admin status
    const [user, setUser] = useState(null); // Current user

    useEffect(() => {
        // Subscribe to authentication state changes
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                let userToAdd = await getUserByEmail(currentUser.email);
                setUser(userToAdd); // Set user

                // Assuming the user object has a `role` property to determine if they're an admin
                // You can replace this with your actual admin-check logic
                const userIsAdmin = userToAdd?.role === 'admin';
                setIsAdmin(userIsAdmin);
            } else {
                setUser(null);
                setIsAdmin(false);
            }
        });

        return () => unsubscribe(); // Cleanup subscription
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <Fragment>
            {user === null && (
                <CenteredButtons />
            )}
            {user !== null && !isAdmin && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h2>Hello {user.name}</h2>
                        <button
                            onClick={handleLogout}
                            style={{
                                backgroundColor: '#FF5733',
                                color: 'white',
                                padding: '8px 12px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginLeft: '10px'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                    <AddItemField currentUser={user} />
                    <ItemList currentUser={user} />
                </>
            )}
            {isAdmin && (
                <AdminComponent />
            )}
        </Fragment>
    );
};

export default HomePage;