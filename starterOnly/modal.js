import Inputs from './javaScript/Input.js';

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


// valid imput form

const formValidate = {
  first: {
    name: "first",
    regex: /^[a-zA-Z]{2,}$/g,

    required: true,
    errorCustom: "Veuillez entrer 2 caractères ou plus pour ce champ."
  },
  last: {
    name: "last",

    regex: /^[a-zA-Z]{2,}$/g,
    required: true,
    errorCustom: "Veuillez entrer 2 caractères ou plus pour ce champ."
  },
  email: {
    name: "email",

    regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    required: true,
    errorCustom: "Veuillez entrer une adresse mail valide."
  },
  birthdate: {
    name: "birthdate",
    regex: /^[0-9]{4}(-[0-9]{2}){2}$/,
    required: true,
    errorCustom: "Vous devez entrer votre date de naissance."
  },
  quantity: {
    name: "quantity",
    regex: /^[0-9]{1,2}$/,
    required: true,
    errorCustom: "Vous devez entrer un nombre."
  },
  checkbox1: {
    name: "checkbox1",
    type: "checkbox",
    required: true,
    errorCustom: "Vous devez vérifier que vous acceptez les termes et conditions."
  },
  checkbox2: {
    name: "checkbox2",
    type: "checkbox",
    required: true
  }
};

const form = document.getElementById("reverve");
form.addEventListener("submit",function validate(e) {
  const inputs = form.getElementsByClassName("text-control");
  let asError = false;
  console.log(inputs)
  for (let i = 0; i< inputs.length; i++) {
    let error;
    for(const item in formValidate){
      
      if (inputs[i].name === formValidate[item].name){
        console.log(inputs[i].value);
        console.log("regex " + formValidate[item].regex.test(inputs[i].value ));
        if (!formValidate[item].regex.test(inputs[i].value)){
          console.log("erreur");
          asError = true;
          console.log("asError " + asError);
          const input = document.getElementById(inputs[i].id);
          if (input.nextElementSibling == null) {
            let p = document.createElement("p");
            input.parentNode.appendChild(p);
            console.log("p créé")
          }
          let pError = input.nextElementSibling;
          console.log(pError);
          console.log(formValidate[item].errorCustom)
          pError.innerHTML = formValidate[item].errorCustom;
        }
      }
      
      
    }
    
  }
  if (asError == true) {
    e.preventDefault();
    return false
  }

  alert('Formulaire envoyé !');
});

