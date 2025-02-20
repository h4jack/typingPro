document.querySelector(".menu-btn").addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active");
})

document.querySelector(".site-title").addEventListener("click", (e) => {
    e.currentTarget.innerText = "Test Your Typing" == e.currentTarget.innerText ? "Typing Tester" : "Test Your Typing";
})


