function validateSignupForm() {
    // Get the form element
    var form = document.getElementById("signup-form");
  
    // Get the input elements
    var emailInput = form.elements["email"];
    var passwordInput = form.elements["password"];
    var confirmPasswordInput = form.elements["confirm-password"];
    var firstNameInput = form.elements["first-name"];
    var lastNameInput = form.elements["last-name"];
  
    // Initialize error messages
    var emailError = "";
    var passwordError = "";
    var confirmPasswordError = "";
    var firstNameError = "";
    var lastNameError = "";
  
    // Validate email
    if (emailInput.value.length < 3) {
      emailError = "email must be at least 3 characters long.";
    }
  
    // Validate password
    if (passwordInput.value.length < 8) {
      passwordError = "Password must be at least 8 characters long.";
    }
  
    // Validate confirm password
    if (confirmPasswordInput.value !== passwordInput.value) {
      confirmPasswordError = "Passwords do not match.";
    }

    if (firstNameInput.value == "") {
        firstNameError = "First name cannot be empty"
    }

    if (lastNameInput.value == "") {
        lastNameError = "Last name cannot be empty"
    }
  
    // Set error messages
    document.getElementById("email-error").innerHTML = emailError;
    document.getElementById("password-error").innerHTML = passwordError;
    document.getElementById("confirm-password-error").innerHTML = confirmPasswordError;
    document.getElementById("firstname-error").innerHTML = firstNameError;
    document.getElementById("lastname-error").innerHTML = lastNameError;
  
    // Return whether the form is valid or not
    return emailError === "" && passwordError === "" && confirmPasswordError === "" && firstNameError === "" && lastNameError === "";
  }