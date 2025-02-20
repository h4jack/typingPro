function getInputPointer() {
    return document.getElementById(`input-pointer`);
}

function getCurrentWord() {
    return document.getElementById(`txtIndex-${textIndex}`);
}

function setCurrentWord(word) {
    return document.getElementById(`txtIndex-${textIndex}`).innerText = word;
}

function getCurrentWordReal() {
    return testText.realText[textIndex];
}

function getCurrentWordUser() {
    return testText.userText[textIndex] || "";
}

function setCurrentWordUser(word) {
    testText.userText[textIndex] = word;
}

function addGreen(word) {
    word.classList.add("c-green");
    word.classList.remove("c-ored");
}

function addORed(word) {
    word.classList.add("c-ored");
    word.classList.remove("c-green");
}

function removeWordClass(word) {
    word.classList.remove("c-white")
    word.classList.remove("c-ored")
    word.classList.remove("c-green")
    word.classList.remove("bg-gray")
}

function scrollToCurrentWord(element) {
    const parent = typingPlace;

    // Scroll vertically to align the element to the parent's top
    parent.scrollTo({
        top: element.offsetTop - parent.offsetTop, // Align top
        left: element.offsetLeft - parent.offsetLeft, // Align right
    });
}

function renderWords() {
    typingPlace.innerHTML = "";
    testText.realText.forEach((text, index) => {
        const newWord = document.createElement("span");
        newWord.id = `txtIndex-${index}`;
        newWord.innerText = text;
        typingPlace.append(newWord);
        typingPlace.innerHTML += "\n";
    });
}

function tabPressed() {
    const buttons = document.querySelectorAll(".controls button"); // Get all buttons inside .controls
    const currentFocus = document.activeElement; // Get the currently focused button

    // Find the index of the currently focused button
    const currentIndex = Array.from(buttons).indexOf(currentFocus);

    // Determine the next button index, loop to the first if at the end
    const nextIndex = (currentIndex + 1) % buttons.length;

    // Focus the next button
    buttons[nextIndex].focus();
}


function setStatUI(time, wpm, accuracy) {
    time_f.innerText = time;
    wpm_f.innerText = wpm;
    accuracy_f.innerText = accuracy;
}

// Names export for UI features.
export {
    getInputPointer,
    getCurrentWord,
    setCurrentWord,
    getCurrentWordReal,
    getCurrentWordUser,
    setCurrentWordUser,
    addGreen,
    addORed,
    removeWordClass,
    scrollToCurrentWord,
    renderWords,
    tabPressed,
    setStatUI,
};