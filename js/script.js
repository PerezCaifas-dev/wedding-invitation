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

if(guestId){

    fetch(`${guestAPI}?id=${guestId}`)

    .then(response => response.json())

    .then(data => {

        document.getElementById("guestFamily")
            .textContent = data.familia;


        document.getElementById("guestNames")
            .textContent = data.invitados;

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

seal.addEventListener("click", () => {
    // music.play();
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
        countdownClock.style.display = "block";
        confirmation.style.display = "block";
        firstMessage.style.fontSize = "16px";
        // firstMessage.style.font-size = "block";

    }, 3000);

});

// open.addEventListener("click", () => {
//     letter.style.display = "block";
//     letter.style.zIndex = "10";
//     letter.classList.add("extract");
//     letterTitle.style.display = "none";
//     open.style.display = "none";
//     setTimeout(() => {
//         letter.classList.add("fullscreen");
//         letterTitle.style.display = "block";
//         document.querySelector("h1").style.opacity="1";
//         countdown.style.display = "block";
//         churchLocation.style.display = "block";

//     }, 1000);
// });

// letter.addEventListener("click", () => {
//     letterTitle.style.display = "none";
//     letter.style.display = "block";
//     letter.style.zIndex = "10";
//     letter.classList.add("extract");
//     open.style.display = "none";
//     letter.classList.add("fullscreen");
//     setTimeout(() => {
//         letter.classList.add("fullscreen");
//         letterTitle.style.display = "block";
//         document.querySelector("h1").style.opacity="1";
//         countdown.style.display = "block";
//         churchLocation.style.display = "block";

//     }, 1000);
    
// });

function doPost(e){

  const data = JSON.parse(e.postData.contents);


  const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Invitados");


  const rows = sheet.getDataRange().getValues();


  for(let i = 1; i < rows.length; i++){

    if(rows[i][0] == data.id){

        sheet.getRange(i+1,5)
        .setValue(data.asistencia);


        sheet.getRange(i+1,6)
        .setValue(data.asistentes);


        sheet.getRange(i+1,7)
        .setValue(new Date());


        break;
    }

  }


  return ContentService
      .createTextOutput(
        JSON.stringify({
          success:true
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );

}
