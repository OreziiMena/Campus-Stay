document.addEventListener("DOMContentLoaded", () => {
    // Looks for either the student form OR the agent form dynamically
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


    //I used this to test the username validation logic
    const takenUsernames = ["orezi", "campus_stay", "admin123", "student2026"];

    usernameInput.addEventListener("input", () => {
        if (usernameInput.value.startsWith("@")) {
            usernameInput.value = usernameInput.value.substring(1);
        }

        // Getting clean value for checking
        const currentUsername = usernameInput.value.toLowerCase();

        //Validation Logic
        if (takenUsernames.includes(currentUsername) && currentUsername !== "") {
            usernameInput.classList.add("invalid-input");
            usernameErrorText.style.display = "block";
            usernameSuccessText.style.display = "none";
        } else {
            usernameInput.classList.remove("invalid-input");
            usernameErrorText.style.display = "none";
            usernameSuccessText.style.display = "block";
        }
    });

    passwordInput.addEventListener("input", () => {
        if (strongPasswordRegex.test(passwordInput.value)) {
            passwordReqsText.style.color = "#28a745";
            passwordInput.classList.remove("invalid-input");
        } else {
            passwordReqsText.style.color = "#dc3545";
            passwordInput.classList.add("invalid-input");
        }
    });

    form.addEventListener("submit", (e) => {
        let isValid = true;
        
        // Clean username one last time before final check
        if (usernameInput.value.startsWith("@")) {
            usernameInput.value = usernameInput.value.substring(1);
        }
        const finalUsername = usernameInput.value.toLowerCase();

        //Checking if username is taken 
        if (takenUsernames.includes(finalUsername)) {
            e.preventDefault(); 
            usernameInput.classList.add("invalid-input");
            usernameErrorText.style.display = "block";
            isValid = false;
        }

        //Checking strong password
        if (!strongPasswordRegex.test(passwordInput.value)) {
            e.preventDefault();
            passwordInput.classList.add("invalid-input");
            alert("Please ensure your password meets all the security requirements.");
            isValid = false;
        }

        //Checking if passwords match
        if (passwordInput.value !== confirmInput.value) {
            e.preventDefault(); 
            confirmInput.classList.add("invalid-input");
            passwordErrorText.style.display = "block"; 
            isValid = false;
        } else {
            confirmInput.classList.remove("invalid-input");
            passwordErrorText.style.display = "none";
        }

        if (isValid) {
            // Success logic will go here
            // console.log("Final username to save: @" + finalUsername);
        }
    });
});