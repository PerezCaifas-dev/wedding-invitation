const seal = document.querySelector(".seal");
const closed = document.querySelector(".closed");
const open = document.querySelector(".open");
const music = document.getElementById("backgroundMusic");
const letter = document.querySelector(".letter");
const countdown = document.querySelector(".countdown");
const churchLocation = document.querySelector(".location");
const letterTitle = document.querySelector(".letter-title");

const weddingDate = new Date("2026-10-03T17:00:00");

function updateCountdown(){

    const now = new Date();

    const difference = weddingDate - now;

    if(difference <= 0){
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").textContent = days;

    document.getElementById("hours").textContent = hours;

    document.getElementById("minutes").textContent = minutes;

    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();

setInterval(updateCountdown,1000);

seal.addEventListener("click", () => {
    // music.play();
    closed.style.display = "none";
    seal.style.display = "none";
    open.style.display = "block";
    letter.style.display = "block";

});

open.addEventListener("click", () => {
    letter.style.display = "block";
    letter.style.zIndex = "10";
    letter.classList.add("extract");
    letterTitle.style.display = "none";
    open.style.display = "none";
    setTimeout(() => {
        letter.classList.add("fullscreen");
        letterTitle.style.display = "block";
        document.querySelector("h1").style.opacity="1";
        countdown.style.display = "block";
        churchLocation.style.display = "block";

    }, 1000);
});

letter.addEventListener("click", () => {
    letterTitle.style.display = "none";
    letter.style.display = "block";
    letter.style.zIndex = "10";
    letter.classList.add("extract");
    open.style.display = "none";
    setTimeout(() => {
        letter.classList.add("fullscreen");
        letterTitle.style.display = "block";
        document.querySelector("h1").style.opacity="1";
        countdown.style.display = "block";
        churchLocation.style.display = "block";

    }, 1000);
    
});
