(function () {
  "use strict";

  document
    .querySelector("#contact-form-button")
    .addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      // log contact form button click
      console.log("You clicked the submit button.");

      // get data from form
      let name = document.querySelector("#name").value;
      let email = document.querySelector("#mail").value;
      let message = document.querySelector("#msg").value;

      // log data from form
      console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    });
})();
