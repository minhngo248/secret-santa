import React, { useEffect, useState } from 'react';
import {db} from "/src/config/firebaseConfig.js";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const ItemList = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (props.currentUser) {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("name", "==", props.currentUser.name));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let userItems = [];
                querySnapshot.forEach((doc) => {
                    userItems = doc.data().items; // Assuming each user has a single document with an items array
                });
                setItems(userItems);
            }, (error) => {
                console.error('Error fetching user items: ', error);
            });

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
                            <strong>Item:</strong> {item.item}
                            {item.link && item.link !== "" && (
                                <>
                                    {' '}| <a href={item.link}>Link</a>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ItemList;