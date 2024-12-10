import React, { useEffect, useState } from 'react';
import {db} from "/src/config/firebaseConfig.js";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import PropTypes from "prop-types";

const ItemList = (props) => {
    const [items, setItems] = useState([]);
    const [messageToSanta, setMessageToSanta] = useState(""); // State for the message to Santa

    useEffect(() => {
        if (props.currentUser) {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("name", "==", props.currentUser.name));

            const unsubscribe = onSnapshot(
                q,
                (querySnapshot) => {
                    let userItems = [];
                    let userMessage = "";
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        userItems = data.items || []; // Assuming each user document has an `items` array
                        userMessage = data.message || ""; // Assuming the message is stored as `message`
                    });
                    setItems(userItems);
                    setMessageToSanta(userMessage);
                },
                (error) => {
                    alert(error);
                }
            );

            // Cleanup subscription on unmount
            return () => unsubscribe();
        }
    }, []);

    return (
        <div>
            <h3>Items của bạn</h3>
            {items.length === 0 ? (
                <p>No items found</p>
            ) : (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            {item.item}
                            {item.link && item.link !== "" && (
                                <>
                                    {' '}| <a href={item.link}>Link</a>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {/* Display the message to Santa */}
            {messageToSanta && (
                <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}>
                    <strong>Lời nhắn hiện tại của bạn cho Santa:</strong>
                    <p>{messageToSanta}</p>
                </div>
            )}
        </div>
    );
};

ItemList.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default ItemList;