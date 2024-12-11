import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserByEmail } from "../../services/userService.js";

const SantaItemList = (props) => {
    const [receiver, setReceiver] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchReceiver = async () => {
            try {
                let receiverToAdd = await getUserByEmail(props.currentUser.receiverMail);
                setReceiver(receiverToAdd);
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false); // Stop loading once the fetch is complete
            }
        };

        fetchReceiver();
    }, [props.currentUser.receiverMail]);

    if (loading) {
        return <p>Loading...</p>; // Optionally display a loading state
    }

    if (!receiver) {
        return <p>No receiver found.</p>; // Handle case where receiver is null
    }

    return (
        <div>
            <h3>Một trong những items {receiver.name} muốn Secret Santa tặng:</h3>

            <ul>
                {receiver.items.map((item, index) => (
                    <li key={index}>
                        {item.item}
                        {item.link && item.link !== "" && (
                            <>
                                {" "} | <a href={item.link} target="_blank">Link</a>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {/* Display the message to Santa */}
            {receiver.message && (
                <div
                    style={{
                        marginBottom: "20px",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                    }}
                >
                    <strong>Lời nhắn của {receiver.name} dành cho Santa:</strong>
                    <p>{receiver.message}</p>
                </div>
            )}
        </div>
    );
};

SantaItemList.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default SantaItemList;