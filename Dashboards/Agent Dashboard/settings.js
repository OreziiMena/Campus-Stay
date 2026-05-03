document.addEventListener("DOMContentLoaded", () => {
    // Validating "Save Preferences" Button
    const savePreferencesBtn = document.getElementById("save-preferences-btn");
    if (savePreferencesBtn) {
        savePreferencesBtn.addEventListener("click", () => {
            const originalText = savePreferencesBtn.innerText;
            savePreferencesBtn.innerText = "Saving...";
            savePreferencesBtn.disabled = true;
            savePreferencesBtn.style.opacity = "0.7";

            // Simulate API request/save
            setTimeout(() => {
                savePreferencesBtn.innerText = "Saved!";
                savePreferencesBtn.style.opacity = "1";
                savePreferencesBtn.style.backgroundColor = "#28a745"; // Success green color
                savePreferencesBtn.style.color = "#ffffff";
                
                // Revert back to original state after 2 seconds
                setTimeout(() => {
                    savePreferencesBtn.innerText = originalText;
                    savePreferencesBtn.style.backgroundColor = "";
                    savePreferencesBtn.style.color = "";
                    savePreferencesBtn.disabled = false;
                }, 2000);
            }, 1000);
        });
    }

    // Validating Toggle Buttons (frontend validations. Actual state management would require backend integration)
    const toggleInputs = document.querySelectorAll('.custom-toggle input[type="checkbox"]');
    toggleInputs.forEach(toggle => {
        toggle.addEventListener("change", (e) => {
            // For now we just log it, but you could show a toast notification here
            const statusText = e.target.checked ? "Enabled" : "Disabled";
            const settingName = e.target.parentElement.previousElementSibling.querySelector("h4").innerText;
            console.log(`Setting '${settingName}' has been ${statusText}.`);
        });
    });

    //Validating "Deactivate Account" Button
    const deactivateBtn = document.getElementById("deactivate-account-btn");
    if (deactivateBtn) {
        deactivateBtn.addEventListener("click", () => {
            const isConfirmed = confirm("Are you sure you want to deactivate your account? All your active listings will be hidden.");
            
            if (isConfirmed) {
                const originalText = deactivateBtn.innerText;
                deactivateBtn.innerText = "Deactivating...";
                deactivateBtn.disabled = true;

                // Simulate API request
                setTimeout(() => {
                    alert("Your account has been deactivated. You will now be logged out.");
                    window.location.href = "../../Auth-pages/user-login.html"; // Redirect to login
                }, 1500);
            }
        });
    }
});
