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
const closeX = document.querySelectorAll(".close");
// Cible le formulaire qui disparait, et le texte de confirmation qui le remplacera
let formDisplay = document.getElementById("validation_clear");
let validationText= document.getElementById("validation_text");
let validationButton= document.getElementById("validation--button");
// Variable
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const condition = document.getElementById("checkbox1");
const locationInput = document.getElementsByName("location")[0];
const loc1 = document.getElementById ('location1');
const loc2 = document.getElementById ('location2');
const loc3 = document.getElementById ('location3');
const loc4 = document.getElementById ('location4');
const loc5 = document.getElementById ('location5');
const loc6 = document.getElementById ('location6');
let FirstNameValid ;
let LastNameValid ;
let emailValid ;
let birthdateValid ;
let quantityValid ;
let conditionValid = true ;
let locationValid ;


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form 
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event 
closeX.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form + enlève le message de confirmation de la validation de l'envoie au profit d'un nouveau formulaire
function closeModal() {
  modalbg.style.display = "none";
  formDisplay.style.display = "block";
  validationText.style.display= "none";
  validationButton.style.display= "none";
};

// Le boutton ferme le message de confirmation, et remet le formulaire en place pour refaire une inscription si besoin
validationButton.addEventListener("click", closeModal);


// Fait disparaître le formulaire et fait apparaître le texte de confirmation de l'envoie
function validate(){
  formDisplay.style.display = "none";
  validationText.style.display= "block";
  validationButton.style.display= "block";
};

// Fonctions des messages d'erreur
function firstNameMessage() { firstNameInput.setCustomValidity("Votre nom ne doit pas contenir de caractères spéciaux")};
function tooShortMessage(element) {element.setCustomValidity("Votre nom doit contenir au moins 2 caractères")};
function lastNameMessage() {lastNameInput.setCustomValidity("Votre nom ne doit pas contenir de caractères spéciaux")};
function lasttooshortMessage() {this.setCustomeValidity("Votre nom doit contenir au moins 2 caractères")};
function firsttooshortMessage() {this.setCustomeValidity("Votre prénom doit contenir au moins 2 caractères")};
function emailMessage() {emailInput.setCustomValidity("'"+emailInput.value+ "' n'est pas une adresse mail valide")};
function birthdateMessage () {birthdateInput.setCustomValidity("Veuillez entrer votre date de naissance")};
function quantityMessage () { quantityInput.setCustomValidity("Veuillez entrer le nombre de participation à des tournois GameOn")};
function conditionMessage() {condition.setCustomValidity("Veuillez lire et accepter les conditions d'utilisation")};
function locMessage () {loc1.setCustomValidity("Veuillez choisir une ville")};
function noMessage (element) { element.setCustomValidity("")};
function missingMessage (element){ element.setCustomeValidity("Veuillez remplir tout les champs")};


// Evènement qui détermine si les inputs sont bien remplies. Si ce n'est pas le cas un message d'erreur apparaît.

// Champ du prénom
firstNameInput.addEventListener("input", function (event){
 if (firstNameInput.value.length < 2) { // Message si le nom est trop court
   tooShortMessage(this);
   FirstNameValid = false;
   firstNameInput.parentNode.setAttribute("data-error-visible", true);
} else if (!event.target.value.match(/^[A-Za-z\é\è\ê\-]+$/)){  // Message si il y a des caractères spéciaux
    firstNameMessage();
    this.parentNode.setAttribute("data-error", ("Pas de caractères spéciaux!"));
    firstNameInput.parentNode.setAttribute("data-error-visible", true);
    FirstNameValid = false;
  } else  {
    FirstNameValid = true;
    noMessage(this);
    firstNameInput.parentNode.setAttribute("data-error-visible", false);
  } 
});

//Champ du nom
lastNameInput.addEventListener("input", function (event){ // Message si le nom est trop court
  if (lastNameInput.value.length < 2) {
    tooShortMessage(this);
    this.parentNode.setAttribute("data-error-visible", true);
    this.parentNode.setAttribute("data-error", ("Nom trop court !"));
    LastNameValid = false;
  } else if (!event.target.value.match(/^[A-Za-z\é\è\ê\-]+$/)){ // Message si il y a des caractères spéciaux
    lastNameMessage();
    LastNameValid=false;
    this.parentNode.setAttribute("data-error-visible", true);
    this.parentNode.setAttribute("data-error", ("Pas de caractères spéciaux!"));
  } else {
    noMessage(this);
    LastNameValid= true;
    this.parentNode.setAttribute("data-error-visible", false);
  }
});

//Champ de l'email
emailInput.addEventListener("input", function (){
   if (emailInput.value.match(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i)) {
    emailValid=true;
    noMessage(this);
    this.parentNode.setAttribute("data-error-visible", false);
   } else {
    emailValid=false;
    emailMessage();
    this.parentNode.setAttribute("data-error-visible", true);
    this.parentNode.setAttribute("data-error", ("Email non valide !"));
   }
});

// Champ de la date de naissance
birthdateInput.addEventListener("change", function (){
  if (birthdateInput.value.match (/^[0-9]/)) {
    birthdateValid=true;
    noMessage(this);
    this.parentNode.setAttribute("data-error-visible", false);
  } else {
    birthdateValid=false;
    birthdateMessage();
    this.parentNode.setAttribute("data-error-visible", true);
    this.parentNode.setAttribute("data-error", ("Date anniversaire non correcte !"));
  }
});

// Champ du nombre de tournois
quantityInput.addEventListener("change", function (){
  if (!quantityInput.value.match (/^[0-9]/)) {
    quantityMessage();
    quantityValid=false;
    this.parentNode.setAttribute("data-error-visible", true);
    this.parentNode.setAttribute("data-error", ("Erreur sur la quantité !"));
  } else {
    quantityValid=true;
    this.parentNode.setAttribute("data-error-visible", false);
    noMessage(this);
  }
});

// Checkbox des villes à sélectionner
locationInput.addEventListener("change", function (){ 
  if (loc1.checked || loc2.checked || loc3.checked || loc4.checked || loc5.checked || loc6.checked) {
    locationValid= true;
    loc1.setCustomValidity("");
  } else {
    locationValid= false;
    locMessage();
  }
});

// CGU à cocher
condition.addEventListener("change",function(){
  if (this.checked){
      this.setCustomValidity("")
      conditionValid=true;
      this.parentNode.setAttribute("data-error-visible", false);
  }else {
      conditionMessage();
      conditionValid=false;
      this.parentNode.setAttribute("data-error-visible", true);
    this.parentNode.setAttribute("data-error", ("CGU non coché !"));
  }
});

// Vérifie lors du submit si tout les champs précédents sont trues (bien respectés selon le type d'input)
document.forms["reserve"].addEventListener("submit", function(e) {
  e.preventDefault();
  
  if (FirstNameValid == true && LastNameValid == true && emailValid == true && birthdateValid == true && quantityValid == true && conditionValid == true && locationValid==true) {
    validate(); 
  } 
});












