import React, { useState } from 'react';
import SignInComponent from "../signIn/signInComponent.jsx";
import SignUpComponent from "../signUp/signUpComponent.jsx";
import './centeredButtons.css'; // Import the CSS file for styling

const CenteredButtons = () => {
    const [activeComponent, setActiveComponent] = useState(null); // State to track the active component

    const handleSignInClick = () => {
        setActiveComponent('signin');
    };

    const handleSignUpClick = () => {
        setActiveComponent('signup');
    };

    const handleBack = () => {
        setActiveComponent(null);
    };

    return (
        <div className="button-container">
            {activeComponent === null && (
                <div>
                    <button className="button" onClick={handleSignInClick}>Sign In</button>
                    <button className="button" onClick={handleSignUpClick}>Sign Up</button>
                </div>
            )}
            {activeComponent === 'signin' && (
                <div>
                    <SignInComponent />
                    <button className="back-button" onClick={handleBack}>Back</button>
                </div>
            )}
            {activeComponent === 'signup' && (
                <div>
                    <SignUpComponent />
                    <button className="back-button" onClick={handleBack}>Back</button>
                </div>
            )}
        </div>
    );
};

export default CenteredButtons;