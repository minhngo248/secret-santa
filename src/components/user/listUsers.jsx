import React, { useState, useEffect } from "react";
import { getUsers } from "/src/services/userService.js";

const ListUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users data:", error));
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