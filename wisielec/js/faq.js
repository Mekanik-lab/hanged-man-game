const faqBtn = document.querySelector("#faqBtn");
const faqBox = document.querySelector("#faqBox");
const closeBtn = document.querySelector("#closeBtn");
const keyboard = document.querySelector("#keyboard");
const svg = document.querySelector("#hanged--man");
const password = document.querySelector("#password");

faqBtn.addEventListener("click", () => {
    faqBox.style.display = "flex";
    keyboard.style.display = "none";
    svg.style.display = "none";
    password.style.display = "none";
})

closeBtn.addEventListener("click", () => {
    faqBox.style.display = "none";
    keyboard.style.display = "flex";
    svg.style.display = "flex";
    password.style.display = "flex";
})