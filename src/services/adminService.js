import generateRandomTuples from "../utils/generateRandomTuples.js";
import {db} from "../config/firebaseConfig.js";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";

export async function assignSecretSantas() {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("isAdmin", "==", false));
    const querySnapshot = await getDocs(q);

    const users = [];

    for (const doc of querySnapshot.docs) {
        const userData = doc.data();
        if (!userData.items || userData.items.length < 1) {
            return Promise.reject(`User ${userData.name} must have at least 1 item.`);
        }
        users.push({ id: doc.id, mail: userData.mail });
    }

    // Validate the number of users
    if (users.length < 2) {
        return Promise.reject("There must be at least 2 users for Secret Santa.");
    }

    // Define a fixed pair (User 1 to User 5)
    const fixedGiver = "thtrang289@gmail.com"; // Replace with User 1's email
    const fixedReceiver = "hoanglongle312@gmail.com"; // Replace with User 5's email

    // Combine fixed pair with randomized assignments
    // Get emails for Secret Santa assignment
    const mails = users.map((user) => user.mail);

    // Randomize the remaining users
    const randomTuples = await generateRandomTuples(mails, fixedGiver, fixedReceiver);

    const tuples = [[fixedGiver, fixedReceiver], ...randomTuples];

    // Update Firestore with Santa assignments
    for (const [giver, receiver] of tuples) {
        const giverUser = users.find((user) => user.mail === giver);
        const docRef = doc(usersRef, giverUser.id); // Get document reference
        await updateDoc(docRef, { receiverMail: receiver }); // Update Firestore document
    }

    return Promise.resolve("Secret Santa assignments have been successfully updated in Firestore!");
}