import * as myModule from "./../module/main.js";
import * as myUI from "./../module/ui.js";
import builtInWords from "./words.js";

export function setTextToReal(customText = "") {
    if (customText) {
        testText.realText = customText.split(/\s+|\n+/).filter(text => text.trim() !== ""); // Remove empty or space-only strings
    } else {
        let selectedWords = [];

        // Based on the gameMode, select the words
        if (gameMode === 0) {
            // Easy mode: pick only from easy words
            selectedWords = builtInWords.easy;
        } else if (gameMode === 1) {
            // Medium mode: pick from easy + medium words
            selectedWords = [...builtInWords.easy, ...builtInWords.medium];
        } else if (gameMode === 2) {
            // Hard mode: pick from easy + medium + hard words
            selectedWords = [...builtInWords.easy, ...builtInWords.medium, ...builtInWords.hard];
        } else if (gameMode === 3) {
            // Special mode: pick from easy + medium + hard + special words
            selectedWords = [...builtInWords.easy, ...builtInWords.medium, ...builtInWords.hard, ...builtInWords.special];
        } else if (gameMode === 4) {
            // Coding mode: pick only from coding words
            selectedWords = builtInWords.coding;
        }

        // Shuffle the selected words array
        myModule.shuffleArray(selectedWords);

        // Assign the shuffled words to testText.realText
        testText.realText = selectedWords;
    }
    myUI.renderWords();
}

export function startTyping() {
    textIndex = 0;
    testText.userText = [];
    let timeInSeconds = time; // Example time in seconds
    let timerInterval = setInterval(() => {
        if (timeInSeconds <= 0 || !isTyping) {
            clearInterval(timerInterval); // Stop the timer when time is 0
        } else {
            const result = myModule.calculateWPMAndAccuracy(testText.userText, testText.realText, time - timeInSeconds);

            myUI.setStatUI(
                timeInSeconds,
                result.wpm.toFixed(0),
                result.accuracy.toFixed(2)
            )

            timeInSeconds--; // Decrement time by 1 second
        }
    }, 1000);
}