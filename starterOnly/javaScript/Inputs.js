export default class Inputs{
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.error = error;
    }
    verifyError() {
        if (this.type == "text" && this.value.lenght < 2){
            this.error = `Veuillez entrer 2 caractères ou plus pour le champ du #{name}`
            this.showError();
        }
    }
    showError() {
       document.getElementById(`#{name}`).after(span).innerHTML= error;

    }
};

