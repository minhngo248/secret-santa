export default function generateRandomTuples(arr, excludedGiverMail, excludedReceiverMail) {
    if (arr.length < 2) {
        return Promise.reject("Array must have at least 2 elements.");
    }

    const shuffledArr = [...arr].sort(() => Math.random() - 0.5); // Randomly shuffle the input array
    const result = [];

    // Create tuples while ensuring conditions
    for (let i = 0; i < shuffledArr.length; i++) {
        const first = shuffledArr[i];
        if (first === excludedGiverMail) {
            continue;
        }

        let second;
        let attempts = 0; // To prevent infinite loops
        do {
            second = shuffledArr[(i + 1) % shuffledArr.length]; // Wrap around to create a "cycle"
            attempts++;

            // Break the loop if too many attempts to prevent infinite retries
            if (attempts > 100) {
                return Promise.reject("Unable to generate tuples with the given constraints.");
            }
        } while (second === excludedReceiverMail);
        result.push([first, second]);
    }

    return Promise.resolve(result);
}