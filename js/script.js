const seal = document.querySelector(".seal");
const closed = document.querySelector(".closed");
const open = document.querySelector(".open");
const music = document.getElementById("backgroundMusic");
const letter = document.querySelector(".letter");
const countdown = document.querySelector(".countdown");
const churchLocation = document.querySelector(".location");
const letterTitle = document.querySelector(".letter-title");
const guestAPI = "https://script.google.com/macros/s/AKfycbywgH1pPOn7ttEIVwM8Zs3kwT_DXWU2ol9C_yDxbGeCRWe0sULDna98PPbrHbCMzIidrA/exec";
const params = new URLSearchParams(window.location.search);
const guestId = params.get("id");
const weddingDate = new Date("2026-10-03T17:00:00");
const initials = document.querySelector(".initials");
const tapMessage = document.querySelector(".tap-message");
const countdownClock = document.querySelector(".countdown");
const confirmation = document.querySelector(".confirmation");
const firstMessage = document.querySelector(".first-message");
const secondText = document.querySelector(".second-text");
const text1 = document.querySelector(".text-1");
const text2 = document.querySelector(".text-2");
const text3 = document.querySelector(".text-3");
const photo3 = document.querySelector(".photo-3");
const text4 = document.querySelector(".text-4");
const text5 = document.querySelector(".text-5");
const text6 = document.querySelector(".text-6");
const photo4 = document.querySelector(".photo-4");
const church = document.querySelector(".church");
const text7 = document.querySelector(".text-7");
const text8 = document.querySelector(".text-8");
const text9 = document.querySelector(".text-9");
const photo5 = document.querySelector(".photo-5");
const text10 = document.querySelector(".text-10");
const text11 = document.querySelector(".text-11");
const text12 = document.querySelector(".text-12");
const location1 = document.querySelector(".location-1");
const photo6 = document.querySelector(".photo-6");
const text13 = document.querySelector(".text-13");
const text14 = document.querySelector(".text-14");
const text15 = document.querySelector(".text-15");
const photo8 = document.querySelector(".photo-8");
const brindis = document.querySelector(".brindis");
const confirmButton = document.querySelector(".confirm-button");
let guestData = null;
// let guestNames = [];
const guestList = document.getElementById("guestList");


if(guestId){

    fetch(`${guestAPI}?id=${guestId}`)

    .then(response => response.json())

    .then(data => {
        console.log(data);
        guestData = data;

        document.getElementById("guestFamily")
            .textContent = data.familia;

        document.getElementById("guestNumbers")
            .textContent = 'Hemos reservado para ustedes ' + data.cupos + ' pases';


        // guestNames = data.invitados.split(',');
        // document.getElementById("guestNames").textContent = guestNames.join('\n');

        const guestNames = guestData.invitados
            .split(',')
            .map(name => name.trim());

        guestNames.forEach((name, index) => {

            const label = document.createElement("label");

            label.innerHTML = `
                <input 
                    type="checkbox" 
                    value="${name}"
                    class="guest-checkbox"
                   
                >
                ${name}
            `;

            guestList.appendChild(label);
        });


    });

}


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

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        music.pause();
    } else {
        music.play();
    }
});

seal.addEventListener("click", () => {
    music.play();
    closed.style.display = "none";
    seal.style.display = "none";
    initials.style.display = "none";
    tapMessage.style.display = "none";
    open.style.display = "block";
    letter.style.display = "block";
    setTimeout(() => {
        letter.classList.add("fullscreen");
        countdown.style.display = "block";
        churchLocation.style.display = "block";
        church.style.display = "block";
        countdownClock.style.display = "block";
        confirmation.style.display = "block";
        text1.style.display = "block";
        text2.style.display = "block";
        text3.style.display = "block";
        photo3.style.display = "block";
        text4.style.display = "block";
        text5.style.display = "block";
        text6.style.display = "block";
        photo4.style.display = "block";
        text7.style.display = "block";
        text8.style.display = "block";
        text9.style.display = "block";
        photo5.style.display = "block";
        text10.style.display = "block";
        text11.style.display = "block";
        text12.style.display = "block";
        location1.style.display = "block";
        photo6.style.display = "block";
        text13.style.display = "block";
        text14.style.display = "block";
        text15.style.display = "block";
        photo8.style.display = "block";
        brindis.style.display = "block";

    }, 1000);

});

confirmButton.addEventListener("click", () => {

    if (!guestData) {
        alert("Espera un momento mientras cargamos tu invitación.");
        return;
    }

    // const asistentes = guestData.invitados.split(',').length;

    const selectedGuests = [
        ...document.querySelectorAll(".guest-checkbox:checked")
    ];

    if (selectedGuests.length === 0) {
        alert("Por favor, selecciona las personas que asistirán.");
        return;
    }

    const cantidadAsistentes = selectedGuests.length;

    const asistentes = selectedGuests.map(
        checkbox => checkbox.value
    );

    const url =
        `${guestAPI}?accion=confirmar` +
        `&id=${encodeURIComponent(guestId)}` +
        `&asistencia=${encodeURIComponent("Sí")}` +
        `&asistentes=${cantidadAsistentes}` +
        `&nombres=${asistentes}`;

    console.log("Enviando confirmación:", url);

    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log("Respuesta:", data);

            if (data.success) {

                alert("¡Gracias por confirmar tu asistencia!");

                confirmButton.disabled = true;
                confirmButton.textContent =
                    "✓ Asistencia confirmada";
            }
        })
        .catch(error => {

            console.error("Error:", error);

            alert("No fue posible registrar tu confirmación.");
        });
});

