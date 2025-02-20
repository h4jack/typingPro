const typingPlace = document.querySelector(".typing-placeholder");
const time_f = document.getElementById("time")
const wpm_f = document.getElementById("wpm")
const accuracy_f = document.getElementById("accuracy")

const testText = {
    realText: [],
    userText: []
}

const article = "";
let gameMode = 3; // 0 = easy, 1 = medium, 2 = hard, 3 = special, 4 = coding

let textIndex = 0;
let currentWord = "";
let canType = false;
let isTyping = false;
let backPressed = false;

let time = 30; // Example time in seconds
