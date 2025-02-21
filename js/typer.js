
import * as myModule from "./../module/main.js";
import * as myUI from "./../module/ui.js";
import { setTextToReal, startTyping } from "./myMod.js";
import { article } from "./words.js";

function nextWord() {
    myUI.removeWordClass(myUI.getCurrentWord());
    if (myUI.getCurrentWordReal() === currentWord) {
        myUI.getCurrentWord().innerText = myUI.getCurrentWordReal();
        myUI.getCurrentWord().classList.add("c-white");
    } else {
        myUI.getCurrentWord().innerText = currentWord;
        myUI.addORed(myUI.getCurrentWord());
    }
    textIndex++; // go to next text
    myUI.getCurrentWord().classList.add("bg-gray");
    currentWord = myUI.getCurrentWordUser();
}

function prevWord() {
    if (backPressed) {
        return;
    }
    myUI.removeWordClass(myUI.getCurrentWord());
    myUI.getCurrentWord().innerText = myUI.getCurrentWordReal();
    if (textIndex > 0) {
        textIndex--; // go to prev text
    }
    currentWord = myUI.getCurrentWordUser();
    myUI.removeWordClass(myUI.getCurrentWord());
    myUI.getCurrentWord().classList.add("bg-gray");
}

function matchWord() {
    myUI.setCurrentWordUser(currentWord);
    myUI.removeWordClass(myUI.getCurrentWord());
    myUI.getCurrentWord().classList.add("bg-gray");
    myUI.getCurrentWord().innerHTML = "";
    if (myUI.getCurrentWordReal().startsWith(currentWord)) {
        const newWord = document.createElement("span");
        newWord.classList.add("c-green");
        if (!currentWord) {
            newWord.classList.add("txt-0");
            newWord.classList.add("no-w");
        }
        newWord.innerText = currentWord || "S";
        myUI.getCurrentWord().append(newWord);

        const pointer = document.createElement("span");
        pointer.id = "input-pointer";
        myUI.getCurrentWord().append(pointer);

        const newWord2 = document.createElement("span");
        newWord2.innerText = myUI.getCurrentWordReal().slice(currentWord.length);
        myUI.getCurrentWord().append(newWord2);
    } else {
        const newWord = document.createElement("span");
        newWord.classList.add("c-ored");
        newWord.innerText = currentWord;
        myUI.getCurrentWord().append(newWord);

        const pointer = document.createElement("span");
        pointer.id = "input-pointer";
        myUI.getCurrentWord().append(pointer);
    }
    myUI.scrollToCurrentWord(myUI.getInputPointer());
}


function resetData() {
    currentWord = ""
    testText.userText = [];
    isTyping = false;
    canType = true;
    textIndex = 0;
    myUI.setStatUI(time)
    matchWord()
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

function showResult() {

}

function openMenu() {

}

function exitTyping() {

}

export {
    myUI,
    myModule,
    setTextToReal,
    startTyping,
};

export {
    nextWord,
    prevWord,
    matchWord,
    newStart,
    reStart,
    showResult,
    printResult,
    openMenu,
    exitTyping,
}