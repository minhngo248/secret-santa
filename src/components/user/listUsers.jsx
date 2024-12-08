import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import {db} from "../../config/firebaseConfig.js";

const ListUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const usersCollectionRef = collection(db, "users");

        // Set up a real-time listener
        const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
            const userList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(userList);
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);

    const usersList = (
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    <strong>{user.name}</strong> - {user.mail}
                </li>
            ))}
        </ul>
    );

    return (
        <div>
            {usersList}
        </div>
    );
}

export default ListUsers;