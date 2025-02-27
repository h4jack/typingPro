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
    let startTime = Date.now(); // Capture the exact start time in milliseconds
    let timeInSeconds = time * 1000; // Convert time to milliseconds

    let timerInterval = setInterval(() => {
        if (!isTyping || Date.now() - startTime >= timeInSeconds) {
            if (isTyping) {
                canType = false;
            }
            clearInterval(timerInterval); // Stop the timer when time is up or typing stops
        }
        // Update the UI with the remaining time in seconds
        const remainingTime = Math.ceil((timeInSeconds - (Date.now() - startTime)) / 1000);
        const elapsedTime = (Date.now() - startTime) / 1000; // Convert to seconds
        // Calculate WPM and accuracy based on elapsed time
        const result = myModule.calculateWPMAndAccuracy(testText.userText, testText.realText, elapsedTime);
        myUI.setStatUI(
            remainingTime,
            result.wpm.toFixed(0),
            result.accuracy.toFixed(2),
            result.cpm,
            result.error
        );
    }, 500);
}


export async function fetchAllText(url) {
    try {
        // Send a GET request to the URL
        const response = await fetch(url, { mode: 'no-cors' });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the text content from the response
        const html = await response.text();

        // Create a new DOM parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract all text from the parsed HTML
        const text = doc.body.innerText;

        return text;
    } catch (error) {
        console.error(`An error occurred: ${error}`);
        return null;
    }
}
