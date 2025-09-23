(function () {
  "use strict";

  // get the contact form
  let form = document.querySelector("#contact-form");

  document
    .querySelector("#contact-form-button")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();
      let formValid = true;
      if (!form.checkValidity()) {
        formValid = false;
      }

      form.classList.add("was-validated");

      if (formValid) {
        sendTheEmail();
      }
    });
  function sendTheEmail() {
    // get data from form
    let firstName = document.querySelector("#first-name").value;
    let lastName = document.querySelector("#last-name").value;
    let email = document.querySelector("#mail").value;
    let message = document.querySelector("#msg").value;

    // log data from form
    console.log(
      `Name: ${firsName} ${lastName}, Email: ${email}, Message: ${message}`
    );
  }
})();
