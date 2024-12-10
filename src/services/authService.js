import { collection, query, where, getDocs } from "firebase/firestore";
import {signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut} from "firebase/auth";
import {auth, db} from "/src/config/firebaseConfig";

export const signup = async (name, email, password) => {
    // Validation: name is required
    if (!name) {
        return new Promise((resolve, reject) => {
            reject("Cần tên");
        });
    }

    // Validation: mail is required
    if (!email) {
        return new Promise((resolve, reject) => {
            reject("Cần mail");
        });
    }

    // Validation: password is required
    if (!password) {
        return new Promise((resolve, reject) => {
            reject("Cần password");
        });
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);

    // user exists
    if (!querySnapshot.empty) {
        return new Promise((resolve, reject) => {
            reject("Tên đã tồn tại");
        });
    }

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