const seal = document.querySelector(".seal");
const closed = document.querySelector(".closed");
const open = document.querySelector(".open");

seal.addEventListener("click", () => {

    closed.style.display = "none";

    seal.style.display = "none";

    open.style.display = "block";

});