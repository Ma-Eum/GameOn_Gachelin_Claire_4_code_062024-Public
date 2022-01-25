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
const closeBtn = document.querySelector(".close");
const myForm = document.querySelector("form");
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
//const location = document.getElementsByName("location");
const checkbox1 = document.getElementById("checkbox1"); // Peux être qu'un tableau la aussi serai une bonne idée si je décide de rajouter "checkbox 2"
const checkbox2 = document.getElementById("checkbox2"); // Peux être qu'un tableau la aussi serai une bonne idée si je décide de rajouter "checkbox 2"


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); //les fonctions => n'ont pas de noms

// launch modal form
function launchModal() { //
  modalbg.style.display = "block";
}
// Close modal
closeBtn.addEventListener("click", closeModal)
function closeModal() {
  modalbg.style.display = "none";
}

//Fonction génèral pour l'ajout d'attribue
function displayError(input, errorMessage) {
  input.setAttribute("data-error-visible", true);
  input.setAttribute("data-error", errorMessage);

}
function removeError(input) {
  input.setAttribute("data-error-visible", false);
}

let regexName = /^([a-zA-Z]{3,30}\s*)+/;
let regexMail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
let regexNombre = /^(0|[1-9]\d*)$/;
let regexBirthdate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;


// Evenement pour le Prenom
first.addEventListener("input", function (e) {
  if (regexName.test(first.value) == true) {
    removeError(e.target.parentNode);
  }
  else {
    displayError(e.target.parentNode, "le prénom doit comporter minimum 2 caractères");
  }
});

// Evenement pour le Nom
last.addEventListener("input", function (e) {
  if (regexName.test(last.value) == true) {
    removeError(e.target.parentNode);
  }
  else {
    displayError(e.target.parentNode, "le nom doit comporter minimum 2 caractères");
  }
});


// Evenement pour l'email
email.addEventListener("input", function (e) {
  if (regexMail.test(email.value) == true) {
    removeError(e.target.parentNode);
  }
  else {
    displayError(e.target.parentNode, "Veillez renseigner une adresse mail valide");
  }
});

//Evenement pour le Nombre de tournois
quantity.addEventListener("input", function (e) {
  if (regexNombre.test(quantity.value) == true) {
    removeError(e.target.parentNode);
  }
  else {
    displayError(e.target.parentNode, "Veillez renseigner le nombre de tournois que vous avez réalisé");
  }
});

//Evenement pour la date d'anniversaire a terminer !!
birthdate.addEventListener("input", function (e) {
  if (regexBirthdate.test(birthdate.value) == true) {
    removeError(e.target.parentNode);
  }
  else {
    displayError(e.target.parentNode, "Veillez renseigner une date de naissance valide");
  }
});

// birthdate : une valeur numérique est saisie et verifier la comparaison des date en JavaScript (voir l'objet "date")

// location : récupérer tous les éléments dans un tableau et créer une boucle qui vérifie qu'un bouton radio est bien sélectionné
const locations = document.getElementsByName("location");
//locations.addEventListener("input", function (e) {
for (let i = 0; i < locations.length; i++) {
  if (locations[i].checked) {
    valeur = locations[i].value;
    console.log("valeur");
    removeError(e.target.parentNode);
  }
  else {
    displayError(e.target.parentNode, "Veillez renseigner une ville");
  }
}
//});

// la case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée (vérifier la première case est coché en JavaScript)
checkbox1.addEventListener("input", function (e) {
  if (checkbox1 == true) {
    removeError(e.target.parentNode);
  }
  else {
    displayError(e.target.parentNode, "cette case est obligatoire");
  }
});

//validation du formulaire (idée : créer un tableau qui récupérer tous les validations et faire une boucle avec si if ok si erreur else afficher l'erreur), ajouter confirmation quand envoie (voir p.4 du doc google)

//function validate() {}

/*form.addEventListener("submit", function (e) {
  e.preventDefault();

if (!first.value) {
  erreur = "Veuillez rentrer un prénom de plus de 2 caractères";
}

if (!last.value) {
  erreur = "Veuillez rentrer un nom de plus de 2 caractères";
}

if (!email.value) {
  erreur = "Veuillez rentrer une adresse valide";
}

if (!birthdate.value) {
  erreur = "Veuillez rentrer votre date de naissance";
}

if (!quantity.value) {
  erreur = "Veuillez sélectionner une ville ";
}

if (!location.value) {
  erreur = "Veuillez sélectionner une ville "; //pas a jour, comment faire pour récupérer le tableau ?
}

if (!checkbox1.value) {
  erreur = "Veuillez acceptez les termes des conditions";
}

if (erreur) {
  e.preventDefault();
  //aller chercher la const formData pour lui indiqué erreur et lui changé sa (classe/input ???)
  return false;
}

else {
  alert('Merci, votre inscription est bien prise en compte !');
}*/


// trouver un moyen de conserver les données du formulaire !
