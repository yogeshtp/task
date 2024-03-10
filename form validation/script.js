"use strict";
let phoneNumber = document.querySelector("#phone_number");
let emailId = document.getElementById("email_id");
let submitBtn = document.querySelector("#submit_btn");
let phoneIsValid = document.getElementById("phoneIsValid");
let emailIsValid = document.getElementById("emailIsValid");
let allValidity = [false, false];

let yourNumber = document.getElementById("yourNumber");
let yourEmail = document.getElementById("yourEmail");

ifNotValid();

function ifNotValid() {
  submitBtn.style.color = "red";
  submitBtn.setAttribute("disabled", "");
  submitBtn.style.cursor = "not-allowed";
}

function ifValid() {
  submitBtn.style.color = "green";
  submitBtn.removeAttribute("disabled");
  submitBtn.style.cursor = "pointer";
}

function isvalidInfo() {
  // Phone
  phoneNumber.addEventListener("input", function (event) {
    let inputValue = event.target.value.replace(/\D/g, "");
    if (inputValue.length > 10) {
      event.target.value = inputValue.slice(0, 10);
    }

    if (event.target.value.length === 10) {
      allValidity[0] = true;
    } else {
      allValidity[0] = false;
    }

    phoneIsValid.innerText = allValidity[0];
    phoneIsValid.innerText === "true" && emailIsValid.innerText === "true"
      ? ifValid()
      : ifNotValid();
  });

  // Email
  emailId.addEventListener("input", function () {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    emailIsValid.innerText = emailRegex.test(emailId.value);
    allValidity[1] = emailRegex.test(emailId.value);
    phoneIsValid.innerText === "true" && emailIsValid.innerText === "true"
      ? ifValid()
      : ifNotValid();
  });

  // submit
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("form").style.display = "none";
    yourNumber.innerText += phoneNumber.value;
    yourEmail.innerText += emailId.value;
  });
}

isvalidInfo();

// let testNumber = document.getElementById("test");
// testNumber.addEventListener("input", function () {
//   console.log(typeof testNumber.value);
//   console.log("length:", testNumber.value.length);

//   if (testNumber.value.length > 10) {
//     console.log("true");
//     testNumber.value = testNumber.value.slice(0, 10);
//   }
// });

// const testNumber = document.getElementById("test");
// testNumber.addEventListener("input", () => {
//   testNumber.value = testNumber.value.slice(0, 10);
// });
