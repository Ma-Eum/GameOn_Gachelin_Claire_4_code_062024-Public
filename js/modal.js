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
const bouton = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");
const confirmationCloseBtn = document.querySelectorAll(".btn-close");
const regexName = /[a-zA-Z]/;
const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const form = document.querySelector("form");
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkedCity = document.querySelectorAll(".checkedCity");
const checkedBox = document.getElementById("checkbox1");
const btnClose = document.querySelector(".btn-close");
const icon = document.getElementById("menu");

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//Fonction ouverture et fermeture au clic
bouton.addEventListener("click", () => modalClose());
btnClose.addEventListener("click", () => modalClose());
icon.addEventListener("click", () => editNav());

//Empêcher la page de se recharger tant que le formulaire n'est pas validé
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  validForm();
  closeForm();
});

//Fonctions pour les bordures des inputs
function goodBorder(element) {
  changeBorder(element, "#279e7a");
}

function badBorder(element) {
  changeBorder(element, "#e54858");
}

function changeBorder(element, color) {
  element.style.border = "2px solid " + color;
}

//Fonctions d'apparition et disparition des messages d'erreur
function removeInvisible(element) {
  element.nextElementSibling.classList.remove("invisible");
}
function addInvisible(element) {
  element.nextElementSibling.classList.add("invisible");
}

//Fonction d'ouverture et fermeture du menu en responsive
function modalClose() {
  modalbg.style.display = "none";
}

//Fonctions de contrôle du formulaire
first.addEventListener("blur", (e) => {
  checkPrenom();
});
last.addEventListener("blur", (e) => {
  checkNom();
});
email.addEventListener("blur", (e) => {
  checkEmail();
});
birthdate.addEventListener("blur", (e) => {
  checkBirthdate();
});
quantity.addEventListener("blur", (e) => {
  checkQuantity();
});
checkedCity.forEach((check) => check.addEventListener("click", checkLocation));

checkedBox.addEventListener("click", (e) => {
  checkBox();
});

//Fonction de contrôle du prénom
function checkPrenom() {
  const firstValue = first.value.trim();
  if (regexName.exec(firstValue) === null || firstValue.length < 2) {
    removeInvisible(first);
    badBorder(first);
    return false;
  }
  goodBorder(first);
  addInvisible(first);
  return true;
}

//Fonction de contrôle du nom
function checkNom() {
  const lastValue = last.value.trim();
  if (regexName.exec(lastValue) === null || lastValue.length < 2) {
    removeInvisible(last);
    badBorder(last);
    return false;
  }
  goodBorder(last);
  addInvisible(last);
  return true;
}

//Fonction de contrôle de l'email
function checkEmail() {
  const emailValue = email.value.trim();
  if (regexEmail.exec(emailValue) === null) {
    removeInvisible(email);
    badBorder(email);
    return false;
  }
  goodBorder(email);
  addInvisible(email);
  return true;
}

//Fonction de contrôle de la date de naissance
function checkBirthdate() {
  const birthdateValue = birthdate.value;
  if (birthdateValue == "") {
    removeInvisible(birthdate);
    badBorder(birthdate);
    return false;
  }
  goodBorder(birthdate);
  addInvisible(birthdate);
  return true;
}

//Fonction de contrôle du nombre de tournois
function checkQuantity() {
  const quantityValue = quantity.value;
  if (quantityValue === "" || quantityValue > 99) {
    removeInvisible(quantity);
    badBorder(quantity);
    return false;
  }
  goodBorder(quantity);
  addInvisible(quantity);
  return true;
}

//Fonction de contrôle location
function checkLocation() {
  const checkedCityValue = document.querySelectorAll(".checkedCity:checked");
  if (checkedCityValue.length === 0) {
    document.getElementById("errorCity").classList.remove("invisible");
    return false;
  }
  document.getElementById("errorCity").classList.add("invisible");
  return true;
}

//Fonction de contrôle des checkbox
function checkBox() {
  const checkboxValue = checkedBox.checked;
  if (checkboxValue === false) {
    document.getElementById("errorTerms").classList.remove("invisible");
    return false;
  }
  document.getElementById("errorTerms").classList.add("invisible");
  return true;
}

//Fonctions de contrôle avant validation du formulaire
function validForm() {
  checkPrenom();
  checkNom();
  checkEmail();
  checkBirthdate();
  checkQuantity();
  checkLocation();
  checkBox();
}
//Fonction de validation du formulaire
function closeForm() {
  if (
    checkPrenom() &&
    checkNom() &&
    checkEmail() &&
    checkBirthdate() &&
    checkQuantity() &&
    checkLocation() &&
    checkBox()
  ) {
    form.remove();
    document.getElementById("confirmation").classList.remove("invisible");
  }
}
