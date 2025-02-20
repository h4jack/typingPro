
import * as myModule from "./../module/main.js";
import * as myUI from "./../module/ui.js";
import { setTextToReal, startTyping } from "./myMod.js";

window.onload = () => {
    setTextToReal()
    myUI.setStatUI(time, "00", "100")
}

function nextWord() {
    myUI.removeWordClass(myUI.getCurrentWord());
    if (myUI.getCurrentWordReal() === currentWord) {
        myUI.getCurrentWord().innerText = myUI.getCurrentWordReal();
        myUI.getCurrentWord().classList.add("c-white");
    } else {
        myUI.getCurrentWord().innerText = currentWord;
        myUI.addORed(myUI.getCurrentWord());
    }
    myUI.setCurrentWordUser(currentWord)
    textIndex++; // go to next text
    myUI.getCurrentWord().classList.add("bg-gray");
    currentWord = myUI.getCurrentWordUser();
}

function prevWord() {
    myUI.removeWordClass(myUI.getCurrentWord());
    myUI.setCurrentWordUser(currentWord);
    if (textIndex > 0) {
        textIndex--; // go to prev text
    }
    currentWord = myUI.getCurrentWordUser();
    myUI.removeWordClass(myUI.getCurrentWord());
    myUI.getCurrentWord().classList.add("bg-gray");
}

function matchWord() {
    myUI.removeWordClass(myUI.getCurrentWord());
    myUI.getCurrentWord().classList.add("bg-gray");
    myUI.getCurrentWord().innerHTML = "";
    if (myUI.getCurrentWordReal().startsWith(currentWord)) {
        const newWord = document.createElement("span");
        newWord.classList.add("c-green");
        newWord.innerText = currentWord;
        myUI.getCurrentWord().append(newWord);
        const newWord2 = document.createElement("span");
        newWord2.innerText = myUI.getCurrentWordReal().slice(currentWord.length);
        myUI.getCurrentWord().append(newWord2);
    } else {
        myUI.setCurrentWord(currentWord);
        myUI.addORed(myUI.getCurrentWord());
    }
    myUI.scrollToCurrentWord(myUI.getCurrentWord());
}

function showResult() {

}

function exitTyping() {

}

function resetData() {
    currentWord = ""
    testText.userText = [];
    isTyping = false;
    textIndex = 0;
    myUI.setStatUI(time, "00", "100")
}

function newStart() {
    setTextToReal();
    resetData();
}

function reStart() {
    myUI.renderWords();
    resetData();
}

function printResult() {

}

function saveGame() {

}

function openMenu() {

}

document.querySelectorAll(".controls button")[0].addEventListener("click", (e) => {
    e.target.blur();
    newStart();
})
document.querySelectorAll(".controls button")[1].addEventListener("click", (e) => {
    e.target.blur();
    reStart();
})
document.querySelectorAll(".controls button")[2].addEventListener("click", (e) => {
    startTyping();
    e.target.blur();
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
        currentWord = "";
        matchWord();
    }
    if (e.shiftKey && isCtrl("c")) {
        currentWord = "";
        matchWord();
    }
    if (isCtrl("m")) {
        openMenu();
    }
    if (isCtrl("r")) {
        reStart();
    }
    if (isCtrl("s")) {
        newStart();
    }
    if (isCtrl("p")) {
        printResult();
    }
    if (e.key === "Tab") {
        myUI.tabPressed();
    }
    if (isTyping) {

    } else {
        if (e.key.length == 1 && !e.ctrlKey) {
            isTyping = true;
            startTyping();
        }
    }
    if (e.key.length == 1 && e.key != " " && !e.ctrlKey) {
        currentWord += e.key;
        matchWord();
    }
    if ((e.key === "Backspace")) {
        if (currentWord === "") {
            prevWord();
            matchWord();
            return;
        }
        currentWord = currentWord.slice(0, -1);
        matchWord();
    }
    if (e.key === " ") {
        nextWord();
        matchWord();
    }
    if (e.key === "Enter") {
        document.activeElement.click();
    }
});