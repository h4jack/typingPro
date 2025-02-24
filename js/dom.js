import {
    myUI,
    startTyping
} from "./typer.js";

import * as typer from "./typer.js";

window.onload = () => {
    typer.newStart();
}

popup_box.addEventListener("click", (e) => {
    e.preventDefault();
    if (article) {
        typer.newStart();
    }
    popup_box.style.display = "none";
});

document.querySelector(".custom-input-box").addEventListener("click", (e) => {
    e.stopPropagation();
})
document.querySelector(".custom-word-input").addEventListener("keydown", (e) => {
    if (e.key == "Tab" || e.key == "Escape" || (e.ctrlKey && e.key == "Enter")) {
        popup_box.click();
    }
})

document.querySelector(".custom-word-input").addEventListener("input", (e) => {
    article = e.target.value.trim();
})



document.querySelector(".btn-settings").addEventListener("click", (e) => {
    typer.openMenu();
})

document.querySelector(".site-title").addEventListener("click", (e) => {
    e.currentTarget.innerText = "Become Pro" == e.currentTarget.innerText ? "typerPro" : "Become Pro";
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
    popup_box.style.display = "flex";

    const input = document.querySelector('.custom-word-input');
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    input.scrollTop = input.scrollHeight;
})

function showKey(key) {
    const popupkey = document.createElement("div");
    popupkey.classList.add("key-popup");
    popupkey.innerText = key;
    document.body.appendChild(popupkey);
    setTimeout(() => {
        popupkey.style.animation = "opacity-out 0.3s ease";
    }, 2000);
    setTimeout(() => {
        popupkey.class
        popupkey.remove();
    }, 2300);
}

document.addEventListener("keydown", (e) => {
    // Prevent default behavior for other keys (like space, letters, backspace, enter)
    if (/^F[1-9]$|^F1[0-2]$/.test(e.key)) {
        return;
    }
    if (popup_box.style.display === "flex") {
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