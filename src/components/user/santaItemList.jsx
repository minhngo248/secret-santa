import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import {getItemsByUserMail, getMessageByUserMail} from "../../services/userService.js";

const SantaItemList = (props) => {
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState(""); // State for the message to Santa

    useEffect(() => {
        getItemsByUserMail(props.currentUser.receiverMail)
            .then(r => setItems(r))
            .catch(e => alert(e));

        getMessageByUserMail(props.currentUser.receiverMail)
            .then(r => setMessage(r))
            .catch(e => alert(e));
        }, []);

    return (
        <div>
            <h3>Một trong những items X muốn Secret Santa tặng:</h3>

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

            {/* Display the message to Santa */}
            {message && (
                <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}>
                    <strong>Lời nhắn của X dành cho Santa:</strong>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

SantaItemList.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default SantaItemList;