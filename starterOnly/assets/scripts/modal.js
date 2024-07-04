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
const closeModal = document.querySelector(".close");
const form = document.forms["reserve"];
const confirmationModal = document.getElementById("confirmation-modal");
const closeConfirmation = document.getElementById("close-confirmation");

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
closeModal.addEventListener("click", closeFormModal);

function closeFormModal() {
  modalbg.style.display = "none";
}

// Close confirmation modal
closeConfirmation.addEventListener("click", closeConfirmationModal);

function closeConfirmationModal() {
  confirmationModal.style.display = "none";
  form.reset();
  modalbg.style.display = "none";
}

// Validate form
function validate(event) {
  event.preventDefault();
  let isValid = true;

  // Reset previous error messages
  formData.forEach((data) => {
    data.removeAttribute("data-error");
    data.setAttribute("data-error-visible", "false");
  });

  try {
    // Validate first name
    const firstName = form.first.value.trim();
    if (!/^[a-zA-Z]{2,}$/.test(firstName)) {
      throw {
        field: form.first,
        message: "Le prénom doit contenir au moins 2 lettres sans chiffres ni caractères spéciaux.",
      };
    }

    // Validate last name
    const lastName = form.last.value.trim();
    if (!/^[a-zA-Z]{2,}$/.test(lastName)) {
      throw {
        field: form.last,
        message: "Le nom doit contenir au moins 2 lettres sans chiffres ni caractères spéciaux.",
      };
    }

    // Validate email
    const email = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw {
        field: form.email,
        message: "Veuillez entrer un email valide.",
      };
    }

    // Validate birthdate
    const birthdate = form.birthdate.value.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
      throw {
        field: form.birthdate,
        message: "Veuillez entrer une date de naissance valide (YYYY-MM-DD).",
      };
    }

    // Validate quantity
    const quantity = form.quantity.value.trim();
    if (!/^\d+$/.test(quantity) || quantity < 0 || quantity > 99) {
      throw {
        field: form.quantity,
        message: "Veuillez entrer un nombre valide entre 0 et 99.",
      };
    }

    // Validate location
    const location = form.location.value;
    if (!location) {
      throw {
        field: form.location,
        message: "Veuillez sélectionner un lieu.",
      };
    }

    // Validate terms of use
    if (!form.checkbox1.checked) {
      throw {
        field: form.checkbox1,
        message: "Vous devez accepter les conditions d'utilisation.",
      };
    }

    // If all validations pass
    form.style.display = "none";
    confirmationModal.style.display = "block";
  } catch (error) {
    isValid = false;
    const fieldContainer = error.field.closest(".formData");
    fieldContainer.setAttribute("data-error", error.message);
    fieldContainer.setAttribute("data-error-visible", "true");
  }

  return isValid;
}

// Bind the validation function to the form submit event
form.addEventListener("submit", validate);
