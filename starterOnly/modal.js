function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


//Modification de la couleur au choix des éléments de navigation

document.addEventListener('DOMContentLoaded', function () {
  
  function removeActiveClass() {
    navItems.forEach(function (item) {
      item.classList.remove('active');
    });
  }

  navItems.forEach(function (item) {
    item.addEventListener('click', function () {

      removeActiveClass();
      this.classList.add('active');
    });
  });
});


document.addEventListener('DOMContentLoaded', (event) => {
  const closeButton = document.getElementById('closeButton');
  closeButton.addEventListener('click', closeSuccessMessage);
});

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// const formContent = document.getElementById("formContent");
const mainPage = document.getElementById("main-page");
const mainForm = document.getElementById("main-form");
const closeModalBtn = document.querySelector(".close");
const closeModalSuccessBtn = document.querySelector(".close-btn");
const form = document.querySelector('form');
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const tournamentNumber = document.getElementById("quantity");
const tournamentPlace = document.querySelectorAll('input[name="location"]');
const conditions = document.getElementById("checkbox1");
const newsletter = document.getElementById("checkbox2");
const success = document.getElementById("success-message");
const navItems = document.querySelectorAll('.topnav a');


mainForm.addEventListener("submit", (event) => {
  // console.log("click");
})

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  mainPage.classList.add('displayer');
  
}

//Fermeture du formulaire
closeModalBtn.addEventListener("click", closeModal);
closeModalSuccessBtn.addEventListener("click", closeSuccessScreen);

function closeModal() {
  modalbg.style.display = "none";
  mainPage.classList.remove('displayer');
  form.reset(); //reset du formulaire à la fermeture
}

//Fonction pour supprimer la div d'erreur si elle existe
function deleteDivError(idValue) {
  let existingError = idValue.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

}

//Fonction pour supprimer la div d'erreur si elle existe, dans les boutons à checker
function deleteDivErrorList(idValue) {
  if (idValue instanceof NodeList) {
    let tournamentDiv = document.getElementById("tournamentLocation");
    let existingError = tournamentDiv.nextElementSibling;
    if (existingError && existingError.classList.contains("error-message")) {
      existingError.remove();
    }
  } else {
    let existingError = idValue.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
  }
}

//Fonction pour afficher les erreurs dans le HTML
function createDivError(idValue, messageError) {

  deleteDivError(idValue)

  let divError = document.createElement("div");
  divError.classList.add("error-message");
  let paraError = document.createElement("p");
  divError.appendChild(paraError);
  paraError.textContent = messageError;


  if (idValue.type === "checkbox") {
    let labelForCheckbox = document.querySelector(`label[for="${idValue.id}"]`);
    if (labelForCheckbox) {
      labelForCheckbox.parentNode.insertBefore(divError, labelForCheckbox.nextSibling);
      return;
    }
  }
  idValue.parentNode.insertBefore(divError, idValue.nextSibling);
}

//Fonction pour afficher les erreurs dans le HTML sous les boutons à checker
function createDivErrorList(idValue, messageError) {
  deleteDivErrorList(idValue);

  let divError = document.createElement("div");
  divError.classList.add("error-message");
  let paraError = document.createElement("p");
  divError.appendChild(paraError);
  paraError.textContent = messageError;

  if (idValue instanceof NodeList) {
    let tournamentDiv = document.getElementById("tournamentLocation");
    tournamentDiv.parentNode.insertBefore(divError, tournamentDiv.nextSibling);
  } else {

    idValue.parentNode.insertBefore(divError, idValue.nextSibling);
  }
}


//Création de fonctions pour les élémens redondants 

//Fonction qui vérifie que le champs n'est pas vide
function isEmpty(idValue, messageError) {
  // let messageError;
  if (idValue.value.trim() === "") {
    messageError = `Le champ ${idValue.name} ne doit pas être vide`;
    createDivError(idValue, messageError)
    idValue.classList.add('error-input');
    return true;

  }
  else {

    deleteDivError(idValue)
    idValue.classList.remove('error-input');
  }
  return false;
}

//Fonction qui vérifie que le champs comprend au moins 2 caractères
function checkLength(idValue, messageError) {

  if (idValue.value.trim().length < 2) {
    messageError = `Veuillez entrer 2 caractères ou plus pour le champ du  ${idValue.name}`;
    createDivError(idValue, messageError)
    idValue.classList.add('error-input');
    return false;
   
  }
  return true;

}


//Fonction qui vérifie que le champs comprend au moins 2 caractères


function checkIdentity(idValue) {
  let valid = true;

  const regex = /^[A-Za-z]+$/;

  if (isEmpty(idValue)) {
    valid = false;
  }

  else if (!checkLength(idValue)) {
    valid = false;
  }

  else if (!regex.test(idValue.value.trim())) {
    messageError = `Le champ ${idValue.name} doit contenir uniquement des lettres`;
    createDivError(idValue, messageError);
    idValue.classList.add('error-input');
    valid = false;
  }

  return valid;
}


//Fonction vérification de l'email "email"
function checkEmail(idValue) {

  const regex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");

  if (isEmpty(idValue)) {
    return false;

  }
  if (!regex.test(idValue.value.trim())) {
    messageError = `Le champ ${idValue.name} doit être de forme valide`;
    createDivError(idValue, messageError);
    idValue.classList.add('error-input');
    return false;
  }
  return true;
}

//Fonction vérification de la date de naissance "birthdate"
function checkBirthdate(idValue) {
  const currentYear = new Date().getFullYear();
  const regex = new RegExp("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(19[0-9]{2}|20[0-" + (currentYear - 2000) + "]{2})$");

  if (isEmpty(idValue)) {
    return false;

   

  }
  if (!regex.test(idValue.value.trim())) {
    messageError = "Vous devez entrer votre date de naissance.";
    createDivError(idValue, messageError)
    idValue.classList.add('error-input');
    return false;
  }
  return true;
}

//Fonction vérification du nombre de tournois
function checkTournamentNumber(idValue) {
  const intValue = parseInt(idValue.value.trim(), 10);
  if (isEmpty(idValue)) {
    return false;
  
  }
  
  if (intValue.toString() !== idValue.value.trim()) {
    messageError = `Veuillez entrer uniquement un nombre entier`;
    createDivError(idValue, messageError)
    idValue.classList.add('error-input');
    return false;
  }

  if (intValue < 0 || intValue > 99) {
    messageError = `Vous devez mettre un nombre de tournois entre 0 et 99`;
    createDivError(idValue, messageError)
    idValue.classList.add('error-input');
    return false;
  }
  return true;
};

//Fonction pour demander le prochain lieu de tournoi

function tournamentChecked(idValue) {
  deleteDivErrorList(idValue);
  

  let place = "";
  for (let i = 0; i < idValue.length; i++) {
    if (idValue[i].checked) {
      place = idValue[i].value;
      break;
    }
    
  }

  if (place === "") {
    messageError = "Vous devez choisir une option";
    createDivErrorList(idValue, messageError)
    return false;
  }
  return true;
  
}

//Fonction qui vérifie que les conditions d'utilisations sont checké
function conditionAccepted(idValue) {
  let accepted = idValue.checked;
  if (accepted) {
    deleteDivError(idValue);
    return true;
  } else {
    messageError = "Vous devez vérifier que vous acceptez les termes et conditions.";
    createDivError(idValue, messageError);
    return false;
  }
}

//Fonction qui vérifie si la newsletter est coché, facultative
function newsLetterCheck(idValue) {
  let accepted = idValue.checked;
  console.log(accepted);
}

//Fonction pour activer le display none sur le formulaire de succès
function closeSuccessScreen() {
  document.getElementById('success-message').style.display = 'none';
}

//Fonction pour fermer le message de succès sur le bouton
function closeSuccessMessage() {
  closeSuccessScreen();
  closeModal();
}


//Traitement du formulaire

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;

  isValid = checkIdentity(first) && isValid;

  isValid = checkIdentity(last) && isValid;

  isValid = checkEmail(email) && isValid;


  isValid = checkBirthdate(birthdate) && isValid;


  isValid = checkTournamentNumber(tournamentNumber) && isValid;

  isValid = tournamentChecked(tournamentPlace) && isValid;


  isValid = conditionAccepted(conditions) && isValid;

  if (isValid) {
      console.log("Le formulaire est valide !");
      success.style.display ="block";
      
      success.classList.add('success-message-container');
      mainPage.classList.add('displayer');
    
      
      form.reset();
      closeModal();
        // formContent.classList.add('displayer');
    

  } else {
      console.log("Le formulaire contient des erreurs.");
  }

})








