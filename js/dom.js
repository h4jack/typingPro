import {
    myUI,
    myModule,
    setTextToReal,
    startTyping
} from "./typer.js";

import * as typer from "./typer.js";

window.onload = () => {    
    typer.newStart();
}

window.addEventListener('load', () => {
    // Get the performance entry for navigation
    const [navigationEntry] = performance.getEntriesByType('navigation');
    
    if (navigationEntry) {
        const pageLoadTime = navigationEntry.loadEventEnd - navigationEntry.navigationStart;
        
        // Check if the result is positive
        if (pageLoadTime >= 0) {
            console.log(`Total page load time: ${pageLoadTime} milliseconds`);
        } else {
            console.log("The calculated load time is invalid or negative.");
        }
    } else {
        console.log("Navigation timing data is not available.");
    }
});



document.querySelector(".btn-settings").addEventListener("click", (e) => {
    console.log("hello world");
    typer.openMenu();
})

document.querySelector(".site-title").addEventListener("click", (e) => {
    e.currentTarget.innerText = "Test Your Typing" == e.currentTarget.innerText ? "Typing Tester" : "Test Your Typing";
})

document.querySelectorAll(".controls button")[0].addEventListener("click", (e) => {
    typer.newStart();
    document.activeElement.blur();
})
document.querySelectorAll(".controls button")[1].addEventListener("click", (e) => {
    typer.reStart();
    document.activeElement.blur();
})
document.querySelectorAll(".controls button")[2].addEventListener("click", (e) => {
    document.activeElement.blur();
})

document.addEventListener("keydown", (e) => {
    // Prevent default behavior for other keys (like space, letters, backspace, enter)
    if (/^F[1-9]$|^F1[0-2]$/.test(e.key)) {
        return;
    }

    e.preventDefault();

    function isCtrl(key, callback = () => { }) {
        if (e.ctrlKey && e.key === key) {
            callback()
            return true;
        }
        return false;
    }

    if (isCtrl("x") || isCtrl("c")) {
        if (isCtrl("x")) currentWord = "";
        window.navigator.clipboard.writeText(currentWord);
        typer.matchWord();
    } else if (isCtrl("m")) {
        typer.openMenu();
    } else if (isCtrl("r")) {
        typer.reStart();
    } else if (isCtrl("s")) {
        typer.newStart();
    } else if (isCtrl("p")) {
        typer.printResult();
    } else if (e.key === "Tab") {
        myUI.tabPressed();
    } else if (e.key === "Enter") {
        document.activeElement.click();
    }

    if (isTyping) {
    } else {
        if (e.key.length == 1 && !e.ctrlKey) {
            isTyping = true;
            startTyping();
        }
    }

    if (!canType) {
        return;
    }

    if (isCtrl("Backspace")) {
        if (currentWord) {
            currentWord = "";
            typer.matchWord();
            return;
        }
    }

    if (e.key.length == 1 && e.key != " " && !e.ctrlKey) {
        document.activeElement.blur();
        currentWord += e.key;
        typer.matchWord();
    } else if ((e.key === "Backspace")) {
        if (currentWord === "") {
            typer.prevWord();
            typer.matchWord();
            return;
        }
        currentWord = currentWord.slice(0, -1);
        typer.matchWord();
    } else if (e.key === " ") {
        typer.nextWord();
        typer.matchWord();
    }
});