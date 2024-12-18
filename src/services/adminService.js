import generateRandomTuples from "../utils/generateRandomTuples.js";
import {db} from "../config/firebaseConfig.js";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";

export async function assignSecretSantas() {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("isAdmin", "==", false));
    const querySnapshot = await getDocs(q);

    const users = [];
    const usersWithoutItems = [];

    for (const doc of querySnapshot.docs) {
        const userData = doc.data();
        if (!userData.items || userData.items.length < 1) {
            usersWithoutItems.push(userData.name); // Collect users without items
        } else {
            users.push({ id: doc.id, mail: userData.mail }); // Add valid users to the list
        }
    }

    if (usersWithoutItems.length > 0) {
        return Promise.reject(
            `The following users must have at least 1 item: ${usersWithoutItems.join(", ")}.`
        );
    }

    // Validate the number of users
    if (users.length < 2) {
        return Promise.reject("There must be at least 2 users for Secret Santa.");
    }

    // Get emails for Secret Santa assignment
    const mails = users.map((user) => user.mail);
    const tuples = await generateRandomTuples(mails);

    // Update Firestore with Santa assignments
    for (const [giver, receiver] of tuples) {
        const giverUser = users.find((user) => user.mail === giver);
        const docRef = doc(usersRef, giverUser.id); // Get document reference
        await updateDoc(docRef, {receiverMail: receiver}); // Update Firestore document
    }

    return Promise.resolve("Secret Santa assignments have been successfully updated in Firestore!");
}