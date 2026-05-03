document.addEventListener("DOMContentLoaded", () => {
    //TAB SWITCHING LOGIC
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => {
                content.style.display = "none";
                content.classList.remove("active");
            });

            button.classList.add("active");
            const targetId = button.getAttribute("data-target");
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = "block";
                setTimeout(() => targetContent.classList.add("active"), 10);
            }
        });
    });

    // 2. INITIALIZE PROFILE DATA
   async function loadProfileData() {
        try {
            // Replace with your the GET endpoint
            const response = await fetch("...."); 
            
            if (!response.ok) throw new Error("Failed to load profile data");
            
            const data = await response.json();
            updateProfileUI(data);
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("display-name").innerText = "Error loading profile";
        }
    }

    function updateProfileUI(data) {
        // Update Header & Avatar
        document.getElementById("display-name").innerText = `${data.firstName} ${data.lastName}`;
        document.getElementById("display-email").innerText = data.email;
        
        // Generating Initials (First letter of first and last name)
        const initials = (data.firstName.charAt(0) + data.lastName.charAt(0)).toUpperCase();
        document.getElementById("avatar-initials").innerText = initials;

        // Pre-filling Personal Details Form
        document.getElementById("input-first-name").value = data.firstName;
        document.getElementById("input-last-name").value = data.lastName;
        document.getElementById("input-phone").value = data.phone;
        document.getElementById("input-agency").value = data.agencyName;
        document.getElementById("input-bio").value = data.bio;

        // Handle Verification Badges
        if (data.isVerified) {
            document.getElementById("agent-badge").style.display = "inline-block";
            document.getElementById("status-pill").innerText = "Verified Agent";
            document.getElementById("status-pill").className = "status-pill verified";
            document.getElementById("banner-verified").style.display = "flex";
            document.getElementById("banner-unverified").style.display = "none";
            document.getElementById("verification-form").style.display = "none";
        }
    }

    loadProfileData();

    //PERSONAL DETAILS (SAVE CHANGES BUTTON)
   
    const profileForm = document.getElementById("profile-form");
    profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = profileForm.querySelector("button[type='submit']");
        setButtonLoading(btn, true);

        // Gather data into JSON
        const updatedData = {
            firstName: document.getElementById("input-first-name").value.trim(),
            lastName: document.getElementById("input-last-name").value.trim(),
            phone: document.getElementById("input-phone").value.trim(),
            agencyName: document.getElementById("input-agency").value.trim(),
            bio: document.getElementById("input-bio").value.trim(),
        };

        //FUTURE BACKEND FETCH GOES HERE


       // Simulate API Success
        setTimeout(() => {
            setButtonLoading(btn, false, "Saved!");
            // Dynamically update the header name/initials without reloading the page
            currentUserData = { ...currentUserData, ...updatedData };
            updateProfileUI(currentUserData);
        }, 1500);
    });

    //IDENTITY VERIFICATION (FILE UPLOAD)
    const verificationForm = document.getElementById("verification-form");
    const fileInput = document.getElementById("nin-upload");
    const uploadText = document.querySelector(".file-upload p"); // Make sure this matches your HTML class
    const submitReviewBtn = verificationForm.querySelector("button[type='submit']");

    //Show selected file name
    if (fileInput && uploadText) {
        fileInput.addEventListener("change", function() {
            if (this.files && this.files.length > 0) {
                uploadText.innerHTML = `Selected file: <strong>${this.files[0].name}</strong>`;
                submitReviewBtn.disabled = false;
            }
        });
    }

    verificationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        setButtonLoading(submitReviewBtn, true);

        const formData = new FormData();
        formData.append("ninDocument", fileInput.files[0]);

        // FUTURE BACKEND FETCH GOES HERE 

        // Simulate API Success
        setTimeout(() => {
            setButtonLoading(submitReviewBtn, false, "Submitted successfully!");
            submitReviewBtn.disabled = true;
            uploadText.innerHTML = "Document sent for review. Please wait for admin approval.";
        }, 2000);
    });

    //SECURITY (CHANGE PASSWORD)
    const securityForm = document.getElementById("security-form");
    securityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = securityForm.querySelector("button[type='submit']");
        const currentPassword = securityForm.querySelectorAll("input[type='password']")[0].value;
        const newPassword = securityForm.querySelectorAll("input[type='password']")[1].value;

        // Basic Frontend Validation
        if (newPassword.length < 8) {
            alert("New password must be at least 8 characters long.");
            return;
        }

        setButtonLoading(btn, true);

        // FUTURE BACKEND FETCH GOES HERE (Also handle error cases like incorrect current password, weak new password, etc.)


        // Simulate API Success
        setTimeout(() => {
            setButtonLoading(btn, false, "Password Updated!");
            securityForm.reset(); 
        }, 1500);
    });

    //BUTTON LOADING STATE
  
    function setButtonLoading(button, isLoading, successText = "") {
        if (isLoading) {
            button.dataset.originalText = button.innerText;
            button.innerText = "Processing...";
            button.style.opacity = "0.7";
            button.disabled = true;
        } else {
            button.innerText = successText || button.dataset.originalText;
            button.style.opacity = "1";
            button.style.backgroundColor = "#28a745"; // Flash green
            
            // Reset back to original state after 2 seconds
            setTimeout(() => {
                button.innerText = button.dataset.originalText;
                button.style.backgroundColor = ""; 
                button.disabled = false;
            }, 2000);
        }
    }
});