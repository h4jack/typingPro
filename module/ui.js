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
    typingPlace.innerHTML = "";  // Clear the content of typingPlace
    canType = false;

    // Create a DocumentFragment for better performance
    const fragment = document.createDocumentFragment();

    testText.realText.forEach((text, index) => {
        const newWord = document.createElement("span");
        newWord.id = `txtIndex-${index}`;
        newWord.innerText = text;
        fragment.appendChild(newWord);  // Append each word to the fragment
        fragment.appendChild(document.createTextNode(" "));  // Add space between words
    });

    // Append the fragment to typingPlace in one operation
    typingPlace.appendChild(fragment);

    canType = true;
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


function setStatUI(
    time = "00",
    wpm = "00",
    accuracy = "00",
    cpm = "00",
    error = "00"
) {
    time_f.innerText = time;
    wpm_f.innerText = wpm;
    accuracy_f.innerText = accuracy;
    cpm_f.innerText = cpm;
    error_f.innerText = error;

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