const seal = document.querySelector(".seal");
const closed = document.querySelector(".closed");
const open = document.querySelector(".open");
const music = document.getElementById("backgroundMusic");
const letter = document.querySelector(".letter");

seal.addEventListener("click", () => {
    music.play();
    closed.style.display = "none";
    seal.style.display = "none";
    open.style.display = "block";
    letter.style.display = "block";
    // letter.classList.add("extract");

    // setTimeout(() => {
    //     music.play().catch(error => {
    //         console.log("No se pudo reproducir el audio:", error);
    //     });
    // }, 300);

});

open.addEventListener("click", () => {
    letter.style.display = "block";
    letter.style.zIndex = "10";
    letter.classList.add("extract");
    open.style.display = "none";
    letter.classList.add("fullscreen");
});
