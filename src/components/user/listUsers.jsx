import React, { useState, useEffect } from "react";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../config/firebaseConfig.js";

const ListUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const usersCollectionRef = collection(db, "users");

        const usersQuery = query(usersCollectionRef, where("isAdmin", "==", false));
        // Set up a real-time listener
        const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
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
                    {user.name}
                </li>
            ))}
        </ul>
    );

    return (
        <div>
            <h2>List người chơi</h2>
            {usersList}
        </div>
    );
}

export default ListUsers;