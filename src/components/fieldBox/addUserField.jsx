import React, { useState } from "react";
import {addUser} from "../../services/userService.js";

const AddUserField = () => {
    const [formData, setFormData] = useState({
        name: "",
        mail: "",
    });

    const [extraFields, setExtraFields] = useState([]); // List of additional fields

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
        // You can add your logic here, e.g., sending data to a server
        addUser(formData.name, formData.mail, extraFields)
            .then(r => {
                alert("User " + r + " added successfully");
                setFormData({
                    name: "",
                    mail: "",
                });
                setExtraFields([]); // Reset extra fields after submission
            })
            .catch(e => alert(e));
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
            }}
        >
            <h2>Simple Form</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="mail" style={{ display: "block", marginBottom: "5px" }}>
                        Mail:
                    </label>
                    <input
                        type="email"
                        id="mail"
                        name="mail"
                        value={formData.mail}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>
                {/* Render additional fields */}
                {extraFields.map((field, index) => (
                    <div key={index} style={{ display: "flex", marginBottom: "10px", gap: "10px" }}>
                        <input
                            type="text"
                            placeholder="Item"
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
                        />
                        <input
                            type="text"
                            placeholder="Link"
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
                        + Add Field
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
                        - Delete Field
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
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddUserField;