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

document.querySelector(".menu-btn").addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active");
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
    startTyping();
    document.activeElement.blur();
})

document.addEventListener("keydown", (e) => {
    // Prevent default behavior for other keys (like space, letters, backspace, enter)
    e.preventDefault();

    function isCtrl(key, callback = () => { }) {
        if (e.ctrlKey && e.key === key) {
            callback()
            return true;
        }
        return false;
    }

    if (isCtrl("Backspace")) {
        if (currentWord) {
            currentWord = "";
            typer.matchWord();
            return;
        }
    } else if (e.shiftKey && isCtrl("c")) {
        currentWord = "";
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