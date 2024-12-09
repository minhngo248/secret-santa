import { collection, query, where, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import { db } from '../config/firebaseConfig';

function getUsers() {
    const userRef = collection(db, 'users');
    const q = query(userRef);
    return new Promise((resolve, reject) => {
        getDocs(q)
            .then(querySnapshot => {
                const users = [];
                querySnapshot.forEach(doc => {
                    const user = {
                        id: doc.id,
                        ...doc.data()
                    };
                    users.push(user);
                });
                resolve(users);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("mail", "==", email));
        getDocs(q)
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    reject("No user found with this email.");
                } else {
                    querySnapshot.forEach((doc) => {
                        resolve(doc.data());
                    });
                }
            })
            .catch((error) => {
                reject("Error getting user: ", error);
            });
    });
}

async function addUser(name, mail) {
    // Validation: name is required
    if (!name) {
        return new Promise((resolve, reject) => {
            reject("Cần tên");
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

    if (!mail) {
        return new Promise((resolve, reject) => {
            reject("Cần mail");
        });
    }

    const user = {
        name: name,
        mail: mail,
        isAdmin: false,
        items: [],
        message: ""
    }

    return new Promise((resolve, reject) => {
        addDoc(collection(db, 'users'), user)
            .then((docRef) => {
                resolve(user.name);
            })
            .catch(err => {
                reject(err);
            });
    });
}

async function updateUser(name, newItems, messageForSanta) {
    // Validate inputs
    if (!name) {
        return Promise.reject("Name is required to find the user.");
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return Promise.reject(`No user found with the name "${name}".`);
    }

    const updatedData = {
    };

    if (newItems.length > 0) {
        updatedData.items = newItems;
    }

    if (messageForSanta) {
        updatedData.message = messageForSanta;
    }

    const userDoc = querySnapshot.docs[0]; // Get the first document
    const userRef = doc(db, "users", userDoc.id);

    return new Promise(async (resolve, reject) => {
            // Update the user's mail and items
            updateDoc(userRef, updatedData)
                .then(() => resolve())
                .catch(err => reject(err));
    });
}

// Function to get items by user email
function getItemsByUserMail(mail) {
    return new Promise((resolve, reject) => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("mail", "==", mail));

        getDocs(q)
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    return reject("No user found with this email.");
                }

                // Assuming email is unique, return the items from the first matched document
                const userDoc = querySnapshot.docs[0];
                const user = userDoc.data();
                resolve(user.items);
            })
            .catch((error) => {
                reject("Error getting user items: " + error.message);
            });
    });
}

// Function to get messages by user email
function getMessageByUserMail(mail) {
    return new Promise((resolve, reject) => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("mail", "==", mail));

        getDocs(q)
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    return reject("No user found with this email.");
                }

                // Assuming email is unique, return the messages from the first matched document
                const userDoc = querySnapshot.docs[0];
                const user = userDoc.data();
                resolve(user.message);
            })
            .catch((error) => {
                reject("Error getting user message: " + error.message);
            });
    });
}

export {
    getUserByEmail,
    addUser,
    updateUser,
    getItemsByUserMail,
    getMessageByUserMail
};