/**
 * PHP Email Form Validation - v3.1
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
(function () {
  "use strict";

  let forms = document.querySelectorAll(".php-email-form");

  forms.forEach(function (e) {
    e.addEventListener("submit", function (event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute("action");

      if (!action) {
        displayError(thisForm, "The form action property is not set!");
        return;
      }
      thisForm.querySelector(".loading").classList.add("d-block");
      thisForm.querySelector(".error-message").classList.remove("d-block");
      thisForm.querySelector(".sent-message").classList.remove("d-block");

      const formData = new FormData(thisForm);
      php_email_form_submit(thisForm, action, formData);
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    let purpose = formData.getAll("purpose-of-order");
    if (purpose) {
      purpose.join(", ");
    }

    fetch(action, {
      method: "POST",
      body: JSON.stringify({
        requestType: formData.get("requestType"),
        name: formData.get("name"),
        contact: formData.get("contact"),
        companyName: formData.get("companyName"),
        email: formData.get("email"),
        purpose: purpose,
        comments: formData.get("comments"),
      }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(`Something went wrong! Please try again.`);
        }
      })
      .then(() => {
        thisForm.querySelector(".loading").classList.remove("d-block");
        thisForm.querySelector(".sent-message").classList.add("d-block");
        thisForm.reset();
      })
      .catch((error) => {
        displayError(thisForm, `Something went wrong! Please try again.`);
      });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector(".loading").classList.remove("d-block");
    console.log("error", error);
    thisForm.querySelector(".error-message").innerHTML = error;
    thisForm.querySelector(".error-message").classList.add("d-block");
  }
})();
