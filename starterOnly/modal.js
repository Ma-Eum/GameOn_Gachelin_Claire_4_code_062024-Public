function editNav() {
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
        x.className += ' responsive';
    } else {
        x.className = 'topnav';
    }
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const closeBtn = document.getElementById('close-btn');
const closeBtnpage = document.getElementById('close-button-confirmation-page');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = 'block';
}

// ******************* Ferme modal***************

// close modal event

closeBtn.addEventListener('click', closeModal);
closeBtnpage.addEventListener('click', closeModal);

// close Modal function

function closeModal() {
    modalbg.style.display = 'none';
    document.querySelector('.modal-body').style.display = 'block';
    document.querySelector('.confirm-validation').style.display = 'none';
    clearFrom();
}

// ***************** Implémenter entrées du formulaire*******************
const firstNameInputEl = document.getElementById('first');
const firstNameErrorMessageEl = document.getElementById('first-error');
const lastNameInputEl = document.getElementById('last');
const lastNameErrorMessageEl = document.getElementById('last-error');
const emailInputEl = document.getElementById('email');
const emailErrorMessageEl = document.getElementById('email-error');
const birthDateInputEl = document.getElementById('birthdate');
const birthDateErrorMessageEl = document.getElementById('birthdate-error');
const numberParticipateEl = document.getElementById('quantity');
const numberParticipateErrorMessageEl = document.getElementById('quantity-error');
const location1 = document.getElementById('location1');
const location2 = document.getElementById('location2');
const location3 = document.getElementById('location3');
const location4 = document.getElementById('location4');
const location5 = document.getElementById('location5');
const location6 = document.getElementById('location6');
const locationErrorMessageEl = document.getElementById('location-error');
const checkBox1 = document.getElementById('checkbox1');
const checkBoxErrorMessageEl = document.getElementById('checkbox-error');

const emailValidation = () => {
    let isEmailValid = true;
    const email = emailInputEl.value;
    if (!Validation.isRequired(email)) {
        emailErrorMessageEl.innerHTML = 'Cette case ne peut pas être laissée vide.';
        emailInputEl.classList.add('error-form');
        isEmailValid = false;
    } else if (!Validation.checkEmail(email)) {
        emailErrorMessageEl.innerHTML = 'Adresse e-mail invalide';
        emailInputEl.classList.add('error-form');
        isEmailValid = false;
    } else {
        emailErrorMessageEl.innerHTML = '';
        emailInputEl.classList.remove('error-form');
    }

    return isEmailValid;
};

// add function for onchange emanil input
emailInputEl.addEventListener('keyup', emailValidation);

const validate = () => {
    let isFormValid = true;

    //first name validation
    const firstName = firstNameInputEl.value;
    const isFirstNameValid = Validation.minLength(firstName, 2) && Validation.isRequired(firstName);
    isFormValid = isFormValid && isFirstNameValid;
    //  set error message
    if (!Validation.isRequired(firstName)) {
        firstNameErrorMessageEl.innerHTML = 'Cette case ne peut pas être laissée vide.';
        firstNameInputEl.classList.add('error-form');
    } else if (!isFirstNameValid) {
        firstNameErrorMessageEl.innerHTML = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
        firstNameInputEl.classList.add('error-form');
    } else {
        firstNameErrorMessageEl.innerHTML = '';
        firstNameInputEl.classList.remove('error-form');
    }

    //last name validation
    const lastName = lastNameInputEl.value;
    const isLastNameValid = Validation.minLength(lastName, 2) && Validation.isRequired(lastName);
    isFormValid = isFormValid && isLastNameValid;
    // set error message
    if (!Validation.isRequired(lastName)) {
        lastNameErrorMessageEl.innerHTML = 'Cette case ne peut pas être laissée vide.';
        lastNameInputEl.classList.add('error-form');
    } else if (!isLastNameValid) {
        lastNameErrorMessageEl.innerHTML = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
        lastNameInputEl.classList.add('error-form');
    } else {
        lastNameErrorMessageEl.innerHTML = '';
        lastNameInputEl.classList.remove('error-form');
    }

    //email validation
    const isEmailValid = emailValidation();
    isFormValid = isFormValid && isEmailValid;

    //birthdate validation
    const birthDate = birthDateInputEl.value;
    const isBirthDateValid = Validation.checkBirthDate(birthDate);
    isFormValid = isFormValid && isBirthDateValid;
    // set error message
    if (!isBirthDateValid) {
        birthDateErrorMessageEl.innerHTML = 'Vous devez entrer votre date de naissance';
        birthDateInputEl.classList.add('error-form');
    } else {
        birthDateErrorMessageEl.innerHTML = '';
        birthDateInputEl.classList.remove('error-form');
    }

    //participate count validation
    const numberParticipate = numberParticipateEl.value;
    const isNumberParticipateValid = Validation.checkNumber(numberParticipate);
    isFormValid = isFormValid && isNumberParticipateValid;
    if (!isNumberParticipateValid) {
        numberParticipateErrorMessageEl.innerHTML = 'Vous devez entrer votre date de naissance';
        numberParticipateEl.classList.add('error-form');
    } else {
        numberParticipateErrorMessageEl.innerHTML = '';
        numberParticipateEl.classList.remove('error-form');
    }

    //location validation
    const locationValues = [
        location1.checked,
        location2.checked,
        location3.checked,
        location4.checked,
        location5.checked,
        location6.checked,
    ];
    const isLocationValid = Validation.isAnyChecked(locationValues);
    isFormValid = isFormValid && isLocationValid;
    // set error message
    if (!isLocationValid) {
        locationErrorMessageEl.innerHTML = 'Vous devez choisir une option';
    } else {
        locationErrorMessageEl.innerHTML = '';
    }

    //is condition accept
    const checkBoxValid = checkBox1.checked;
    isFormValid = isFormValid && checkBoxValid;
    if (!checkBoxValid) {
        checkBoxErrorMessageEl.innerHTML = 'Vous devez vérifier que vous acceptez les termes et conditions.';
    } else {
        checkBoxErrorMessageEl.innerHTML = '';
    }

    if (isFormValid) {
        document.querySelector('.modal-body').style.display = 'none';
        document.querySelector('.confirm-validation').style.display = 'block';
    }

    return false;
};

//clear form input

const clearFrom = () => {
    const allInputValue = document.querySelectorAll('div.formData input');
    allInputValue.forEach((inputEl) => inputEl.classList.remove('error-form'));

    // solution with reset
    const form = document.querySelector('form');
    form.reset();

    const errorMessageElements = document.querySelectorAll('form div.error');
    console.log(errorMessageElements);
    errorMessageElements.forEach((element) => (element.innerHTML = ''));
};
