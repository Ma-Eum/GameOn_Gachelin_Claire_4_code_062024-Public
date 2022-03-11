function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

const modalClose = document.querySelector(".close");
//modalClose.style.backgroundColor = "red";
/* modalClose.addEventListener("click", function () {
  alert("Vous allez fermé le bouton !");
  modalClose.close("inchis");
}); */

//fermer la croix de la fenetre du formulaire
document
  .getElementById("closeform")
  .addEventListener("click", function (closeModal) {
    modalbg.style.display = "none";
  });
