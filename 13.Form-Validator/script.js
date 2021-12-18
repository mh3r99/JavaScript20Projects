const form = document.querySelector("#form"),
  password1El = document.querySelector("#password1"),
  password2El = document.querySelector("#password2"),
  messageContainer = document.querySelector(".message-container"),
  message = document.querySelector("#message");

let isValid = false;
let passwordsMatch = false;

function validateForm() {
  // Using Constraint API
  isValid = form.checkValidity();
  //   Style main message for an error
  if (!isValid) {
    message.textContent = "Please fill out all fields";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
  }
  //   Check to see if password match
  if (password1El.value === password2El.value) {
    passwordsMatch = true;
    password1El.style.borderColor = "green";
    password2El.style.borderColor = "green";
  } else {
    passwordsMatch = false;
    message.textContent = "Make sure passwords match.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    password1El.style.borderColor = "red";
    password2El.style.borderColor = "red";
    return;
  }
  //   If form is valid and passwords match
  if (isValid && passwordsMatch) {
    message.textContent = "Successfully Registered!";
    message.style.color = "green";
    messageContainer.style.borderColor = "green";
  }
}

function processFormData(e) {
  e.preventDefault();
  //   Validate Form
  validateForm();
  //   Submit Data if valid
  if (isValid && passwordsMatch) {
    storeFormData();
  }
}

function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value,
  };
  //   Do something with user data
  console.log(user);
}

//   Event Listener
form.addEventListener("submit", processFormData);
