import { signOut } from "firebase/auth";
import { auth } from "/src/config/firebaseConfig.js";

// Function to start a session timer
export default function startSessionTimer(expirationTimeInMillis) {
    setTimeout(async () => {
        alert("Session expired. Logging out...");
        await signOut(auth);
    }, expirationTimeInMillis);
}
