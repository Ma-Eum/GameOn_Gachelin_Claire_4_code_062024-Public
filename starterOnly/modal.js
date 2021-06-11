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
const close = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
close.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// test preventdefault
document.getElementById("formGlobal").addEventListener("submit", function (e) {
  let erreur;

  //first name validation
  const first = document.getElementById("first");
  if (!first.value) {
    erreur = "prénom manquant";
    first.parentElement.setAttribute("data-error-visible", "true");
    first.parentElement.setAttribute("data-error", erreur);
  } else if (first.value.length < 2) {
    erreur = "veuillez rentrer un prénom de 2 caractères minimum";
    first.parentElement.setAttribute("data-error-visible", "true");
    first.parentElement.setAttribute("data-error", erreur);
  } else {
    first.parentElement.removeAttribute("data-error-visible");
    first.parentElement.removeAttribute("data-error");
  }

  //last name validation
  const last = document.getElementById("last");
  if (!last.value) {
    erreur = "nom manquant";
    last.parentElement.setAttribute("data-error-visible", "true");
    last.parentElement.setAttribute("data-error", erreur);
  } else if (last.value.length < 2) {
    erreur = "veuillez entrer un nom de 2 carctères minimum";
    last.parentElement.setAttribute("data-error-visible", "true");
    last.parentElement.setAttribute("data-error", erreur);
  } else {
    last.parentElement.removeAttribute("data-error-visible");
    last.parentElement.removeAttribute("data-error");
  }
  //email validation
  const email = document.getElementById("email");
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    email.parentElement.removeAttribute("data-error-visible");
    email.parentElement.removeAttribute("data-error");
  } else {
    erreur = "veuillez renseigner un email valide";
    email.parentElement.setAttribute("data-error-visible", "true");
    email.parentElement.setAttribute("data-error", erreur);
  }

  //birth date validation
  const today = new Date().toISOString().split("T")[0];
  let birthDate = document.getElementById("birthdate");
 
  if (birthDate.value > today || birthDate.value =="") {
    erreur =
      "veuillez sélectionner une date de naissance antérieure au " + today;
    birthDate.parentElement.setAttribute("data-error-visible", "true");
    birthDate.parentElement.setAttribute("data-error", erreur);
  } else {
    birthDate.parentElement.removeAttribute("data-error-visible");
    birthDate.parentElement.removeAttribute("data-error");
  }

  // quantity of tournaments validation
  const quantity = document.getElementById("quantity");
 
  if (/[0-9]/.test(quantity.value)) {
    quantity.parentElement.removeAttribute("data-error-visible");
    quantity.parentElement.removeAttribute("data-error");
  } else {    
    erreur = "entrer un nombre entre 0 et 99";
    quantity.parentElement.setAttribute("data-error-visible", "true");
    quantity.parentElement.setAttribute("data-error", erreur); 
  }

  if (erreur) {
    e.preventDefault();
  }
});
