import React, { useState } from "react";
import {updateUser} from "../../services/userService.js";
import PropTypes from "prop-types";

const AddItemField = (props) => {

    const [extraFields, setExtraFields] = useState([]); // List of additional fields
    const [messageToSanta, setMessageToSanta] = useState(""); // State for the message to Santa

    const handleExtraFieldChange = (index, field, value) => {
        const updatedFields = [...extraFields];
        updatedFields[index][field] = value; // Update specific field in the extra field array
        setExtraFields(updatedFields);
    };

    const handleAddExtraField = () => {
        setExtraFields([...extraFields, { item: "", link: "" }]); // Add a new extra field
    };

    const handleRemoveLastField = () => {
        if (extraFields.length > 0) {
            const updatedFields = [...extraFields];
            updatedFields.pop(); // Remove the last field
            setExtraFields(updatedFields);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Chắc chưa ace ?");
        if (!isConfirmed) {
            return; // Stop submission if the user clicks "Cancel"
        }

        updateUser(props.currentUser.name, extraFields, messageToSanta)
            .then(() => {
                setExtraFields([]); // Reset extra fields after submission
                setMessageToSanta(""); // Clear message to Santa
                alert("Add thành công");
            })
            .catch((e) => alert(e));
    };

    return (
        <div
            className="user-box"
            style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "400px",
                margin: "20px auto",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
            }}
        >
            <h2 style={{ color: "#007BFF" }}>Merry Christmas!</h2>

            <h2>Wish List</h2>
            <form onSubmit={handleSubmit}>
                {/* Message to Santa */}
                <div style={{ marginBottom: "20px", marginLeft: "8px", marginRight: "12px" }}>
                    <label htmlFor="messageToSanta" style={{ display: "block", marginBottom: "8px" }}>
                        Lời nhắn cho Santa:
                    </label>
                    <textarea
                        id="messageToSanta"
                        placeholder="Lời yêu thương cho Santa"
                        value={messageToSanta}
                        onChange={(e) => setMessageToSanta(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            resize: "none",
                            minHeight: "50px",
                        }}
                    />
                </div>

                {/* Render additional fields */}
                {extraFields.map((field, index) => (
                    <div key={index} style={{ display: "flex", marginBottom: "10px", gap: "10px" }}>
                        <input
                            type="text"
                            placeholder="Item name (required)"
                            value={field.item}
                            onChange={(e) =>
                                handleExtraFieldChange(index, "item", e.target.value)
                            }
                            style={{
                                flex: "1",
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                            }}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Link (optional)"
                            value={field.link}
                            onChange={(e) =>
                                handleExtraFieldChange(index, "link", e.target.value)
                            }
                            style={{
                                flex: "1",
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                ))}

                {/* Add and Delete buttons */}
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    <button
                        type="button"
                        onClick={handleAddExtraField}
                        style={{
                            backgroundColor: "#007BFF",
                            color: "white",
                            padding: "8px 12px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        + Thêm đồ
                    </button>
                    <button
                        type="button"
                        onClick={handleRemoveLastField}
                        style={{
                            backgroundColor: "#FF5733",
                            color: "white",
                            padding: "8px 12px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        - Xóa đồ
                    </button>
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Chốt
                </button>
            </form>
        </div>
    );
};

AddItemField.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default AddItemField;