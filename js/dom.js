import {
    myUI,
    startTyping
} from "./typer.js";

import * as typer from "./typer.js";
import { fetchAllText } from "./myMod.js";

window.onload = () => {
    typer.newStart();

}

function closePopup(option = 1, canClose = true) {
    popup_box.addEventListener("click", (e) => {
        switch (option) {
            case 1: // custom word list. 
                if (custom_word_link.value) {
                    console.log("This features is not allowed.");
                } else if (custom_word.value) {
                    article = custom_word.value.trim() || "";
                }
                typer.newStart();
                break;
            case 2:
                // showLoading
                canClose = false;
                break;
            default:
                console.log(option)
        }
        if (canClose) {
            popup_box.style.display = "none";
        }
    });
}

function showPopup(option = 0) {
    popup_box.style.display = "flex";
    // Get the popup_box element
    // Iterate over all the child elements of popup_box
    for (let i = 0; i < popup_box.children.length; i++) {
        const child = popup_box.children[i];
        child.style.display = "none"; // Hide each child element
    }

    switch (option) {
        case 1:
            const custom_input_box = document.querySelector('.custom-input-box');
            custom_input_box.style.display = "flex";
            custom_word.focus();
            custom_word.setSelectionRange(custom_word.value.length, custom_word.value.length);
            custom_word.scrollTop = custom_word.scrollHeight;
            closePopup(1);
            break;
        case 2:
            const setting_menu = document.querySelector(".setting-menu");
            setting_menu.style.display = "flex";
            // show Loading
            closePopup()
            break;
        case 3:
            const Loading_box = document.querySelector(".loading-box");
            Loading_box.style.display = "flex";
            // show Loading
            closePopup(2)
            break;
        default:
            console.log("Nothing");
    }
}

document.querySelector(".setting-menu").addEventListener("click", (e) => {
    e.stopPropagation();
})

document.querySelectorAll(".dd-parent").forEach((element) => {
    element.addEventListener("click", () => {
        element.classList.toggle("clicked");
    });
})

document.querySelectorAll(".level .drop-down span").forEach((span, index) => {
    span.addEventListener("click", (e) => {
        gameMode = index;
        typer.newStart();
        e.target.parentElement.parentElement.children[1].innerText = e.target.innerText;
    })
})

document.querySelectorAll(".run-time .drop-down span").forEach((span, index) => {
    span.addEventListener("click", (e) => {
        if (Number(e.target.innerText) >= 30 && Number(e.target.innerText) <= 300) {
            time = Number(e.target.innerText);
            myUI.setStatUI(Number(e.target.innerText));
            e.target.parentElement.parentElement.children[1].innerText = e.target.innerText;
        }
    })
})

document.querySelector('.custom-input-box').addEventListener("click", (e) => {
    e.stopPropagation();
})

custom_word.addEventListener("keydown", (e) => {
    if (e.key == "Tab" || e.key == "Escape" || (e.ctrlKey && e.key == "Enter")) {
        popup_box.click();
    }
})

document.querySelector(".btn-settings").addEventListener("click", (e) => {
    typer.openMenu();
    showPopup(2);
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
    showPopup(1);
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