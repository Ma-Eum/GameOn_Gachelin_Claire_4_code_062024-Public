function editNav() {
  if (x.className === "topnav") {
    var x = document.getElementById("myTopnav");
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form");
const submit = document.querySelector(".btn-submit");
const firstDiv = form.first.parentElement;



// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// creating a function that changes the display value
function closeModal() {
  modalbg.style.display = "none";
}
// select the close button by className
const closeBtn = document.querySelector(".close");
// on click, calling closeModal() function
closeBtn.addEventListener("click", closeModal);


const formEntries = document.querySelectorAll(".formData");
let isValid = {
    "first": false,
    "last": false,
    "email": false,
    "birthdate": false,
    "quantity": false,
    "location1": false,
    "checkbox1": false
}

function validInputHighlight(input) {
  input.style.border = "2px solid green";
}
function invalidInputHighlight(input) {
  input.style.border = "2px solid red";
}

formEntries.forEach(formEntry => {
  const input = formEntry.querySelector("input");
  const inputName = input.id;
  const inputSpan = document.createElement("span");
  let errorMessage = "";

  if (inputName !== "location1" && inputName !== "checkbox1") {
    input.addEventListener("blur", function() {
      switch (inputName) {
        case "first":
        case "last":
          regex = /\w{2,}/;
          errorMessage = "Le champ doit contenir au moins 2 caractères";
          break;
        case "email":
          regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          errorMessage = "L'adresse mail doit être valide";
          break;
        case "birthdate":
          regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
          errorMessage = "doit contenir une date valide";
          break;
        case "quantity":
          regex = /^0*?[0-9]\d*$/;
          errorMessage = "Le champ doit contenir une valeur numérique";
          break;
      }
      if (regex.test(input.value)) {
        validInputHighlight(input);
        inputSpan.innerText = "";
        isValid[inputName] = true;
      } else {
        invalidInputHighlight(input);
        isValid[inputName] = false;
        inputSpan.innerText = errorMessage;
        formEntry.appendChild(inputSpan);
        inputSpan.classList.add("form-warning");
      }
    });
    input.addEventListener("focus", function() {
      inputSpan.innerText = "";
    });

  } else if (inputName === "location1") {
    errorMessage = "Vous devez choisir une option."
    const radioButtons = document.querySelectorAll("[type=radio]");
    for (const btn of radioButtons) {
        submit.addEventListener("click", function(event) {
        if (btn.checked) {
          isValid[inputName] = true;
        } else {
          inputSpan.innerText = errorMessage;
          inputSpan.classList.add("form-warning");
          formEntry.appendChild(inputSpan);
        }
        btn.addEventListener("change", function(event) {
          if(this.checked) {
            inputSpan.innerText = "";
          }
        })
      })
    }
  } else if (inputName === "checkbox1") {
    submit.addEventListener("click", function() {
      if (input.checked) {
        inputSpan.innerText = "";
        isValid[inputName] = true;
      } else {
        isValid[inputName] = false;
        errorMessage = "Vous devez vérifier que vous acceptez les termes et conditions.";
        inputSpan.innerText = errorMessage;
        formEntry.appendChild(inputSpan);
        inputSpan.classList.add("form-warning");
      }
    })
  }
  input.addEventListener("focus", function() {
    const inputSpan = document.createElement("span");
    inputSpan.innerText = "";
  })
});

submit.addEventListener("click", function(event) {
  event.preventDefault();
  Object.entries(isValid).forEach(entry => {
    console.log(entry[1]);
    console.log(entry[0]);
    if (!entry[1]) {
      invalidInputHighlight(document.getElementById(entry[0]));
    };
  })
})
