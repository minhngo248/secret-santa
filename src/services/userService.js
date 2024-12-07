import { doc, collection, query, orderBy, where,
    getDocs, getDoc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
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

function addUser(user) {
    // Validation: user is required
    if (!user) {
        return new Promise((resolve, reject) => {
            reject('Validation failed: user is required');
        });
    }

    // Validation: name is required
    if (!user.name) {
        return new Promise((resolve, reject) => {
            reject('Validation failed: name is required');
        });
    }

    return new Promise((resolve, reject) => {
        addDoc(collection(db, 'users'), user)
            .then((docRef) => {
                resolve(docRef.id);
                console.log('Document successfully added!');
            })
            .catch(err => {
                reject(err);
            });
    });
}

export {
    getUsers,
    addUser
};