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
    let firstName = document.querySelector("#contact-first").value;
    let lastName = document.querySelector("#contact-last").value;
    let email = document.querySelector("#contact-email-addr").value;
    let message = document.querySelector("#contact-question").value;

    let obj = {
      sub: `${firstName} submitted a contact form!`,
      txt: `${firstName} ${lastName} submitted a message from your artist website. Contact email: ${email}. Message: ${message}.`,
    };

    // send the data
    fetch("/mail", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((r) => r.json())
      .then((response) => {
        document.querySelector("#contact-button-response").innerHTML =
          response.result;
      })
      .then(() => {
        setTimeout(() => {
          document.querySelector(("#contact-button-response".innerHTML = ""));
        }, "5000");
      });
  }
})();
