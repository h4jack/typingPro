const typingPlace = document.querySelector(".typing-placeholder");
const time_f = document.getElementById("time")
const wpm_f = document.getElementById("wpm")
const accuracy_f = document.getElementById("accuracy")
const cpm_f = document.getElementById("cpm")
const error_f = document.getElementById("w-error")
const popup_box = document.querySelector(".popup-box")
const custom_word = document.querySelector(".custom-word-input");
const custom_word_link = document.querySelector(".custom-link-input");

const testText = {
    realText: [],
    userText: []
}

let article = "";
let gameMode = 0; // 0 = easy, 1 = medium, 2 = hard, 3 = special, 4 = coding

let textIndex = 0;
let currentWord = "";
let canType = false;
let isTyping = false;
let backPressed = false;

let time = 30; // Example time in seconds
