let hiddenSections = document.querySelectorAll('.form-part2, .form-part3');
hiddenSections.forEach(e => { e.style.display = "none"; });
document.querySelector('footer').style.marginTop = "10vh";
const showPart2 = function () {
    let part1Fields = document.querySelectorAll('div.form-part1 input');
    let part1Complete = true;
    part1Fields.forEach(e => {
        if (e.value == null || e.value == "") {
            part1Complete = false;
        }
    });
    if (!part1Complete)
        return false;
    let part2 = document.querySelectorAll('.form-part2');
    $('.form-part2').fadeIn();
}
var dstClicked = false;
const onDstClick = function () {
    if (dstClicked) {
        $('.form-part2 input:checked + label').fadeTo(200, 1);
    }
    else {
        dstClicked = true;
        let part3 = document.querySelectorAll('form-part3');
        $('.form-part3').fadeIn();
    }
    $('.form-part2 input:not(:checked) + label').fadeTo(400, 0.4);
}
let dstRadios = document.querySelectorAll('.form-part2 input');
document.getElementById('postal-code').addEventListener('input', showPart2);
dstRadios.forEach(e => e.addEventListener('input', onDstClick));

// Validation
const validPrompt = function (field, valid, formPart) {
    if (!valid) {
        field.style.borderBottomColor = "red";
        document.querySelector('div.form-part' + formPart + '.validMsg p').textContent = ((formPart == 3) ? "Your planned trip must be at least 3 days long and in more than one week from now. " : "") + "Please correct the fields marked in red.";
        setTimeout((() => { document.querySelector('div.form-part' + formPart + '.validMsg p').textContent = ""; }), 5000);
        return false;
    }
    else {
        field.style.borderBottomColor = "black";
        return true;
    }
}

var emailValid;
var phoneValid;
var postalValid;
var arrivalValid;
var departureValid;

// Part 1
let emailInput = document.querySelector('#email');
let phoneInput = document.querySelector('#phone');
let postalInput = document.querySelector('#postal-code');
emailInput.onblur = () => {
    const rx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emailValid = rx.test(String(emailInput.value).toLowerCase());
    validPrompt(emailInput, emailValid, 1);
};
phoneInput.onblur = () => {
    const rx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    phoneValid = rx.test(String(phoneInput.value));
    validPrompt(phoneInput, phoneValid, 1);
}
postalInput.onblur = () => {
    const rx = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    postalValid = rx.test(String(postalInput.value));
    validPrompt(postalInput, postalValid, 1);
}

// Part 3
let arrivalInput = document.querySelector('#arrival');
let departureInput = document.querySelector('#departure');
arrivalInput.onchange = () => {
    let minDate = new Date();
    minDate.setDate(minDate.getDate() + 7);
    let date = new Date(arrivalInput.value);
    arrivalValid = date >= minDate;
    validPrompt(arrivalInput, arrivalValid, 3);
}
departureInput.onchange = () => {
    let arrivalDate = new Date(arrivalInput.value);
    let departureDate = new Date(departureInput.value);
    let minDate = arrivalDate;
    minDate.setDate(minDate.getDate() + 3);
    departureValid = departureDate >= minDate;
    validPrompt(departureInput, departureValid, 3);
}

// submit button
document.querySelector('.submit').onclick = (e) => {
    e.preventDefault();
    if (!emailValid || !phoneValid || !postalValid || !arrivalValid || !departureValid) {
        alert("Invalid submission. Please ensure all required fields are completed and correct the field(s) marked in red.");
    }
    else {
        for (const field of document.querySelectorAll("[required]")) {
            if (!field.reportValidity()) {
                return;
            }
        }
        document.querySelector('form').submit();
    }
}