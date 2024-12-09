import React, { useState } from 'react';
import './signUpComponent.css';
import {signup} from "../../services/authService.js";
import {addUser} from "../../services/userService.js"; // Import external CSS file for styling

const SignUpComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation to check all fields
        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }
        setError('');

        signup(email, password)
            .then((response) => {
                alert("Sign up successful!");
                addUser(name, email);
            })
            .catch((error) => {
                alert(error);
            });

    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2 className="signup-header">Sign Up</h2>
                {error && <p className="signup-error">{error}</p>}
                <div className="signup-input-group">
                    <label htmlFor="name" className="signup-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="signup-input"
                        required
                    />
                </div>
                <div className="signup-input-group">
                    <label htmlFor="email" className="signup-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="signup-input"
                        required
                    />
                </div>
                <div className="signup-input-group">
                    <label htmlFor="password" className="signup-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="signup-input"
                        required
                    />
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpComponent;