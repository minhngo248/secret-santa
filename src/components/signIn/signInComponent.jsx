import React, { useState } from 'react';
import './signInComponent.css';
import {login} from "../../services/authService.js"; // Import external CSS file

const SignInComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic client-side validation
        if (!email || !password || email.trim() === "" || password.trim() === "") {
            setError("Please enter both email and password.");
            return;
        }
        setError(""); // Clear any previous error

        login(email, password)
            .then((response) => {
                console.log("response", response);
            })
            .catch((error) => {
                alert(error);
                setError("Invalid email or password.");
            });
    };

    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={handleSubmit}>
                <h2 className="signin-header">Sign In</h2>
                {error && <p className="signin-error">{error}</p>}
                <div className="signin-input-group">
                    <label htmlFor="email" className="signin-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="signin-input"
                        required
                    />
                </div>
                <div className="signin-input-group">
                    <label htmlFor="password" className="signin-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="signin-input"
                        required
                    />
                </div>
                <button type="submit" className="signin-button">Sign In</button>
            </form>
        </div>
    );
};

export default SignInComponent;
