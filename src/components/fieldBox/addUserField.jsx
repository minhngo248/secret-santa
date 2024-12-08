import React, { useState } from "react";
import {addUser} from "../../services/userService.js";

const AddUserField = () => {
    const [formData, setFormData] = useState({
        name: "",
        mail: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add your logic here, e.g., sending data to a server
        addUser(formData.name, formData.mail)
            .then(r => {
                alert("User " + r + " added successfully");
                setFormData({
                    name: "",
                    mail: "",
                });
            })
            .catch(e => alert(e));
    };

    return (
        <div className={"user-box"}
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
