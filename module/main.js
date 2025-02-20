function shuffleArray(arr) {
    // Fisher-Yates Shuffle algorithm to shuffle the array
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function shuffleWord(word) {
    const wordArray = word.split('');  // Convert word into an array of characters
    return shuffleArray(wordArray).join('');  // Join array back into a string
}

function calculateWPMAndAccuracy(testWords, realWords, timeInSeconds) {
    // Calculate words per minute (WPM) based on the user text
    const userTypedWords = testWords.filter(word => word !== "").length;
    const wordsPerMinute = (userTypedWords / (timeInSeconds || 1)) * 60;

    // Calculate accuracy based on how many words the user typed correctly
    let correctWords = 0;
    for (let i = 0; i < testWords.length; i++) {
        if (testWords[i] === realWords[i]) {
            correctWords++;
        }
    }
    const accuracy = (correctWords / (userTypedWords || 1)) * 100;

    return {
        wpm: wordsPerMinute,
        accuracy: accuracy
    };
}

export {
    shuffleWord,
    shuffleArray,
    calculateWPMAndAccuracy,
};


// const myProto = {
//     countWords() {
//         return this.split(/\s+/).reduce((count, word) => word.length > 0 ? count + 1 : count, 0);
//     }
// }
// String.prototype.countWords = myProto.countWords;
