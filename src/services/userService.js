import { collection, query, getDocs, addDoc } from 'firebase/firestore';
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

function addUser(name, mail, items) {

    // Validation: name is required
    if (!name) {
        return new Promise((resolve, reject) => {
            reject('Validation failed: name is required');
        });
    }

    if (!mail) {
        return new Promise((resolve, reject) => {
            reject('Validation failed: mail is required');
        })
    }

    if (items.length === 0) {
        return new Promise((resolve, reject) => {
            reject("You haven't added any items.");
        })
    }

    const user = {
        name: name,
        mail: mail,
        items: items
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

export {
    getUsers,
    addUser
};