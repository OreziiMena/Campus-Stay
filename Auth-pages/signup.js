document.addEventListener("DOMContentLoaded", () => {
    // Looks for either the student form OR the agent form 
    const form = document.getElementById("student-signup-form") || document.getElementById("agent-signup-form");
    if (!form) 
        return;

    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirm-password");
    const passwordReqsText = document.getElementById("password-reqs");
    const passwordErrorText = document.getElementById("password-error");
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const usernameInput = document.getElementById("username");
    const usernameErrorText = document.getElementById("username-error");
    const usernameSuccessText = document.getElementById("username-success");
    const togglePasswordIcon = document.getElementById("toggle-password-icon");
    const toggleConfirmPasswordIcon = document.getElementById("toggle-confirm-password-icon");
    const termsCheckbox = document.getElementById("terms-checkbox");
    const termsErrorText = document.getElementById("terms-error");

    // Toggle password icon
    if (togglePasswordIcon && passwordInput) {
        togglePasswordIcon.addEventListener("click", () => {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            togglePasswordIcon.classList.toggle("fa-eye");
            togglePasswordIcon.classList.toggle("fa-eye-slash");
        });
    }

    if (toggleConfirmPasswordIcon && confirmInput) {
        toggleConfirmPasswordIcon.addEventListener("click", () => {
            const type = confirmInput.getAttribute("type") === "password" ? "text" : "password";
            confirmInput.setAttribute("type", type);
            toggleConfirmPasswordIcon.classList.toggle("fa-eye");
            toggleConfirmPasswordIcon.classList.toggle("fa-eye-slash");
        });
    }


    // Live formatting for username
    usernameInput.addEventListener("input", () => {
        // 1. If they manually typed an @, remove it so we don't have @@
        if (usernameInput.value.startsWith("@")) {
            usernameInput.value = usernameInput.value.substring(1);
        }

        // 2. Hide any previous error states while they are typing
        usernameInput.classList.remove("invalid-input");
        if (usernameErrorText) usernameErrorText.style.display = "none";
        if (usernameSuccessText) usernameSuccessText.style.display = "none";
    });

    // Live validation for password strength
    passwordInput.addEventListener("input", () => {
        if (strongPasswordRegex.test(passwordInput.value)) {
            passwordReqsText.style.color = "#28a745"; // Turns green
            passwordInput.classList.remove("invalid-input");
        } else {
            passwordReqsText.style.color = "#dc3545"; // Turns red
            passwordInput.classList.add("invalid-input");
        }
    });

    form.addEventListener("submit", (e) => {
        let isValid = true;
        
        if (usernameInput.value.startsWith("@")) {
            usernameInput.value = usernameInput.value.substring(1);
        }
        const finalUsername = usernameInput.value.toLowerCase();

        // Checking strong password
        if (!strongPasswordRegex.test(passwordInput.value)) {
            e.preventDefault();
            passwordInput.classList.add("invalid-input");
            alert("Please ensure your password meets all the security requirements.");
            isValid = false;
        }

        // Checking if passwords match
        if (passwordInput.value !== confirmInput.value) {
            e.preventDefault(); 
            confirmInput.classList.add("invalid-input");
            passwordErrorText.style.display = "block"; 
            isValid = false;
        } else {
            confirmInput.classList.remove("invalid-input");
            passwordErrorText.style.display = "none";
        }

            //Terms and Conditions
        if (!termsCheckbox.checked) {
            e.preventDefault(); 
            termsErrorText.style.display = "block"; // Show the error
            isValid = false;
        } else {
            termsErrorText.style.display = "none";  // Hide the error
        }
        if (isValid) {
            // Success logic will go here
            // This is where the future fetch() call to the backend will happen.
        }
    });
});