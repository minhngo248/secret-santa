import { signOut } from "firebase/auth";
import { auth } from "/src/config/firebaseConfig.js";

// Function to start a session timer
export default function startSessionTimer(expirationTimeInMillis) {
    console.log("Timer here!");
    setTimeout(() => {
        alert("Session expired. Logging out...");
        signOut(auth)
            .then(() => {
                console.log("User logged out.");
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    }, expirationTimeInMillis);
}
