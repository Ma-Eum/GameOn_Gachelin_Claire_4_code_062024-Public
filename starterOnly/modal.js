function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function effacerChamp() {
  document.getElementById("birthdate").value = "";
}

/**
 * const elements
 */
const btnMessage = document.querySelectorAll(".closeBtnMessage");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const arrayError = [
  "errorNom",
  "errorEmail",
  "errorPrenom",
  "errorQuantity",
  "errorBirthday",
  "errorButtonRadio",
  "errorButtonCondition",
];

/**
 * close message box
 */
btnMessage.forEach((btn) => btn.addEventListener("click", closeMessage));
function closeMessage() {
  location.reload();
  modalbg.style.display = "none"; //Onclick
}

/**
 * launch modal open
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
function launchModal() {
  initModal();
  modalbg.style.display = "block"; //Onclick
}

/**
 * issue #1: fermeture de la modale via Btn(X)
 */
modalClose.addEventListener("click", closeModal);
function closeModal() {
  location.reload();
  modalbg.style.display = "none"; //Onclick
}

/**
 * fonction which init content modal window
 */
function initModal() {
  let baliseNom = document.forms.reserve.last;
  baliseNom.value = "";
  let balisePrenom = document.getElementById("first");
  balisePrenom.value = "";
  let baliseEmail = document.getElementById("email");
  baliseEmail.value = "";
  let baliseQuantity = document.getElementById("quantity");
  baliseQuantity.value = "";
  initBirthday = document.getElementById("birthdate");
  initBirthday.value = "jj/mm/aaaa";
  //delete error managment
  for (let element of arrayError) {
    let error = document.getElementById(element);
    error.removeAttribute("data-error-visible");
    error.removeAttribute("data-error");
  }
}

/**
 * La fonction affiche un message pour indiquer au joueur que son inscription à été faite
 * @returns null
 */
function sendMessage() {
  let form = document.getElementsByName("reserve")[0];
  form.style.display = "none";
  let div = document.getElementById("message");
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.justifyContent = "start";
  div.style.alignItems = "center";
  div.style.gap ="255px";
  return null;
}

//issue #2 and #3: implemented error message validation form
/**
 * Le champ Prénom a un minimum de 2 caractères / n'est pas vide et sans chiffres.
 * @param {*} nom
 * @returns
 */
function validerNom(nom) {
  let longueur = false;

  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s(--)]+$/;
  const estValide = regex.test(nom)
  if (nom.length > 1) { longueur = true };

  let resultat = longueur && estValide;

  if (!resultat) {
    throw new Error("#1:Veuillez entrer 2 caractères ou plus sans chiffres");
  } else {
    return resultat;
  }
}

/**
 * Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide et sans chiffres.
 * @param {*} prenom
 * @returns
 */
function validerPrenom(prenom) {
  let longueur = false;
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s(--)]+$/;
  const estValide = regex.test(prenom)
  if (prenom.length > 1) { longueur = true };

  let resultat = longueur && estValide;

  if (!resultat) {
    throw new Error("#2:Veuillez entrer 2 caractères ou plus sans chiffres");
  } else {
    return resultat;
  }
}

/**
 * L'adresse électronique dois etre valide.
 * @param {*} email
 * @returns
 */
function validerEmail(email) {
  let valid = false;
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(email)) {
    throw new Error("#3:Cet adresse email n'est pas valide.");
  } else {
    valid = true;
  }
  return valid;
}

/**
 * Pour le nombre de concours, une valeur numérique dois etre saisie.
 * @param {*} quantity
 * @returns
 */
function validerQuantity(quantity) {
  let valid = false;
  if (quantity === "") {
    throw new Error("#4:Vous devez répondre à la question.");
  } else {
    valid = true;
  }
  return valid;
}

/**
 * La date de naissance dois etre valide.
 * @param {*} birthday
 * @returns
 */
function validerBirthday(birthday) {
  let valid = true;
  const message = "#5:Respecter le format."
  const dateAujourdhui = new Date();
  // Analyser la date saisie
  const [jour, mois, annee] = birthday.split('/').map(Number);
  if (([jour] <= 0) || ([jour] > 31)) { throw new Error(message); }
  if (([mois] <= 0) || ([mois] > 12)) { throw new Error(message); }

  // Créer un objet date à partir de la date saisie
  if ((isNaN([jour]) || isNaN([mois]) || isNaN([annee])) === true) {
    valid = false;
    throw new Error(message);
  } else {
    const dateSaisieObj = new Date(annee, mois, jour);
    // Comparer la date saisie avec la date du jour
    if (dateSaisieObj > dateAujourdhui) {
      valid = false;
      throw new Error(message);
    } else {
      valid = true;
    }
  }
  return valid;
}

/**
 * cette fonction retourne true si il y a un bouton radio de coché
 * @param {*} listeBtnRadio
 * @returns
 */
function validerButtonsRadio(listeBtnRadio) {
  let valid = false;

  for (let index = 0; index < listeBtnRadio.length; index++) {
    if (listeBtnRadio[index].checked) {
      valid = true;
      break; // Sortir de la boucle dès qu'un bouton radio est sélectionné
    }
  }
  if (!valid) {
    throw new Error("#6: Vous devez choisir une option.");
  }
  return valid;
}

/**
 * cette fonction valide le choix des conditions d'utilisations
 * @param {*} conditionUtilisation
 * @returns
 */
function validerButtonCondition(conditionUtilisation) {
  let valid = false;
  if (!conditionUtilisation.checked) {
    throw new Error(
      "#7:Vous devez acceptez les termes et conditions."
    );
  } else {
    valid = true;
  }
  return valid;
}

/**
 * cette fonction permet de valider l'envoie du formulaire lorsque tous les champs sont
 * remplis sans erreur et ensuite recharge la page.
 *
 */
let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  //avoid re-load web page
  event.preventDefault();

  try {
    let baliseNom = document.getElementById("last");
    let nom = baliseNom.value;
    let validName = validerNom(nom);

    let balisePrenom = document.getElementById("first");
    let prenom = balisePrenom.value;
    let validPrenom = validerPrenom(prenom);

    let baliseEmail = document.getElementById("email");
    let email = baliseEmail.value;
    let validEmail = validerEmail(email);

    let baliseQuantity = document.getElementById("quantity");
    let quantity = baliseQuantity.value;
    let validQuantity = validerQuantity(quantity);

    let baliseBirthday = document.getElementById("birthdate");
    let birthdate = baliseBirthday.value;
    let validBirthday = validerBirthday(birthdate);

    let listeBtnRadio = document.getElementsByName("location");
    let validButtonRadio = validerButtonsRadio(listeBtnRadio);

    let conditionUtilisation = document.getElementById("checkbox1");
    let validBtnCondition = validerButtonCondition(conditionUtilisation);

    let formValid =
      validName &&
      validPrenom &&
      validEmail &&
      validQuantity &&
      validBirthday &&
      validButtonRadio &&
      validBtnCondition;

    if (formValid) {
      //all field are correct

      //because the last!
      let errorButtonCondition = document.getElementById(
        "errorButtonCondition"
      );
      //initialisation
      errorButtonCondition.setAttribute("data-error-visible", "false");
      errorButtonCondition.setAttribute("data-error", " ");

      //#4:envoie confirmation d'envoie réussi
      sendMessage();
    }

  } catch (erreur) {
    console.log(erreur.message);
    afficherMessageError(erreur.message);
  }
});

/**
 * cette fonction affiche le message d'erreur passé en paramètre et selectionne l'element HTML parent.
 *
 * @param {string} message
 */
function afficherMessageError(message) {
  let firstTwoCaractere = message.substring(0, 2);

  if (firstTwoCaractere === "#1") {
    let errorNom = document.getElementById("errorNom");
    errorNom.setAttribute("data-error-visible", "true");
    errorNom.setAttribute("data-error", message.substring(3));
  } else {
    errorNom.removeAttribute("data-error-visible");
    errorNom.removeAttribute("data-error");
  }

  if (firstTwoCaractere === "#2") {
    let errorPrenom = document.getElementById("errorPrenom");
    errorPrenom.setAttribute("data-error-visible", "true");
    errorPrenom.setAttribute("data-error", message.substring(3));
  } else {
    errorPrenom.removeAttribute("data-error-visible");
    errorPrenom.removeAttribute("data-error");
  }

  if (firstTwoCaractere === "#3") {
    let errorEmail = document.getElementById("errorEmail");
    errorEmail.setAttribute("data-error-visible", "true");
    errorEmail.setAttribute("data-error", message.substring(3));
  } else {
    errorEmail.removeAttribute("data-error-visible");
    errorEmail.removeAttribute("data-error");
  }

  if (firstTwoCaractere === "#4") {
    let errorQuantity = document.getElementById("errorQuantity");
    errorQuantity.setAttribute("data-error-visible", "true");
    errorQuantity.setAttribute("data-error", message.substring(3));
  } else {
    errorQuantity.removeAttribute("data-error-visible");
    errorQuantity.removeAttribute("data-error");
  }

  if (firstTwoCaractere === "#5") {
    let errorBirthday = document.getElementById("errorBirthday");
    errorBirthday.setAttribute("data-error-visible", "true");
    errorBirthday.setAttribute("data-error", message.substring(3));
  } else {
    errorBirthday.removeAttribute("data-error-visible");
    errorBirthday.removeAttribute("data-error");
  }

  if (firstTwoCaractere === "#6") {
    let errorButtonRadio = document.getElementById("errorButtonRadio");
    errorButtonRadio.setAttribute("data-error-visible", "true");
    errorButtonRadio.setAttribute("data-error", message.substring(3));
  } else {
    errorButtonRadio.removeAttribute("data-error-visible");
    errorButtonRadio.removeAttribute("data-error");
  }

  if (firstTwoCaractere === "#7") {
    let errorButtonCondition = document.getElementById("errorButtonCondition");
    errorButtonCondition.setAttribute("data-error-visible", "true");
    errorButtonCondition.setAttribute("data-error", message.substring(3));
  } else {
    errorButtonCondition.removeAttribute("data-error-visible");
    errorButtonCondition.removeAttribute("data-error");
  }
}

function validate() {
  //have to do
}
