export default function generateRandomTuples(arr) {
    if (arr.length < 2) {
        return Promise.reject("Array must have at least 2 elements.");
    }

    const shuffledArr = [...arr].sort(() => Math.random() - 0.5); // Randomly shuffle the input array
    const result = [];

    // Create tuples while ensuring conditions
    for (let i = 0; i < shuffledArr.length; i++) {
        const first = shuffledArr[i];
        const second = shuffledArr[(i + 1) % shuffledArr.length]; // Wrap around to create a "cycle"
        result.push([first, second]);
    }

    return Promise.resolve(result);
}