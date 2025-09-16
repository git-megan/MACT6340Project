"use strict";

(() => {
  document.querySelector("#testButton").addEventListener("click", handleClick);

  function handleClick() {
    alert("Thank you for clicking");
    console.log("Click happened!");
  }
})();
