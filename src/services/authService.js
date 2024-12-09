import {signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut} from "firebase/auth";
import {auth} from "/src/config/firebaseConfig";

export const signup = (email, password) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // sign out
                signOut(auth);
                resolve(user);  // Resolve the promise with the user object
            })
            .catch((error) => {
                reject(error);  // Reject the promise with the error object
            });
    });
};

export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                resolve(user);  // Resolve the promise with the user object
            })
            .catch((error) => {
                reject(error);  // Reject the promise with the error object
            });
    });
};

export const logout = () => {
    // sign out
    signOut(auth);
}