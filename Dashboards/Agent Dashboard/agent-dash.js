document.addEventListener("DOMContentLoaded", () => {
 //Apperanace toggle logic
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = document.getElementById("theme-icon");

    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add("dark-mode");
            if (themeIcon) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
                themeIcon.style.color = "#f1c40f"; // Yellow sun
            }
        } else {
            document.body.classList.remove("dark-mode");
            if (themeIcon) {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
                themeIcon.style.color = ""; // Default moon
            }
        }
    }

    const savedTheme = localStorage.getItem("campus_stay_theme");
    if (savedTheme === "dark") {
        applyTheme(true); // Turn on dark mode immediately
    }

    if (themeToggleBtn && themeIcon) {
        themeToggleBtn.addEventListener("click", () => {
            const isCurrentlyDark = document.body.classList.contains("dark-mode");
            
            if (isCurrentlyDark) {
                applyTheme(false);
                localStorage.setItem("campus_stay_theme", "light");
            } 
            else {
                applyTheme(true);
                localStorage.setItem("campus_stay_theme", "dark");
            }
        });
    }

    
    // Authentication check-Backend should also verify this on every request to protected endpoints to prevent unauthorized access to the dashboard
    // This is a simple client-side check to prevent unauthorized access to the dashboard.

    //sidebar logic
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menu-toggle");
    const closeSidebarBtn = document.getElementById("close-sidebar");

    // Open sidebar on mobile
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.add("active");
        });
    }

    // Close sidebar on mobile
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener("click", () => {
            sidebar.classList.remove("active");
        });
    }

    // Close sidebar if user clicks outside of it on mobile
    document.addEventListener("click", (event) => {
        if (!sidebar || !menuToggle) return;
        
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (sidebar.classList.contains("active") && !isClickInsideSidebar && !isClickOnToggle) {
            sidebar.classList.remove("active");
        }
    });

   //Profile dropdwon logic
    const profileBtn = document.getElementById("profile-dropdown-btn");
    const dropdownMenu = document.getElementById("dropdown-menu");

    if (profileBtn && dropdownMenu) {
        // Toggle the menu when clicking the profile picture/name
        profileBtn.addEventListener("click", (e) => {
            dropdownMenu.classList.toggle("active");
            e.stopPropagation(); // Stops the click from instantly closing the menu
        });

        // Close the menu if the user clicks anywhere else on the screen
        document.addEventListener("click", (e) => {
            if (!profileBtn.contains(e.target)) {
                dropdownMenu.classList.remove("active");
            }
        });
    }
// Main sidebar logout button
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            window.location.href = "../Sign-up/user-login.html"; 
        });
    }
  
    // Logout logic goes here. For now, it just redirects to the login page, but in the future, we will also want to clear any session cookies or tokens.

    //LOAD DASHBOARD DATA (API FETCH)
    async function loadDashboardData() {
        try {
            // Replace with your actual backend endpoint for dashboard data
            const response = await fetch("....");
            
            if (!response.ok) {
                // If unauthorized (401), kick them back to login
                if (response.status === 401) window.location.href = "../Sign-up/user-login.html";
                throw new Error("Failed to load dashboard data");
            }

            const data = await response.json();

            // Update Name
            const fullName = `${data.firstName} ${data.lastName}`;
            document.getElementById("welcome-name").innerText = data.firstName;
            document.getElementById("nav-profile-name").innerText = fullName;

            // Update Avatar Initials
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=d35400&color=fff`;
            document.getElementById("nav-profile-pic").src = avatarUrl;

            // --- Update Stats ---
            document.getElementById("stat-total-properties").innerText = data.stats.totalProperties;
            document.getElementById("stat-active-listings").innerText = data.stats.activeListings;
            document.getElementById("stat-new-inquiries").innerText = data.stats.newInquiries;
            document.getElementById("nav-inquiry-badge").innerText = data.stats.newInquiries;

            // --- Update Inquiries List ---
            renderInquiries(data.recentInquiries);

        } catch (error) {
            console.error("Dashboard Error:", error);
            document.getElementById("welcome-name").innerText = "Agent";
            document.getElementById("nav-profile-name").innerText = "Offline Mode";
        }
    }

    // Helper function to inject HTML for recent inquiries
    function renderInquiries(inquiries) {
        const container = document.getElementById("inquiries-container");
        
        if (!inquiries || inquiries.length === 0) {
            container.innerHTML = `<p style="color: #888; font-family: 'Open Sans', sans-serif; font-size: 14px;">No new inquiries yet.</p>`;
            return;
        }

        // Clear the "Loading..." text
        container.innerHTML = "";

        // Build the list dynamically
        inquiries.forEach(inq => {
            const item = document.createElement("div");
            item.className = "inquiry-item"; // Assuming you have this CSS class
            item.innerHTML = `
                <div style="padding: 10px; border-bottom: 1px solid #eee;">
                    <h4 style="margin: 0; font-family: 'Poppins'; color: #333;">${inq.studentName}</h4>
                    <p style="margin: 5px 0 0; font-size: 13px; color: #666;">Interested in: <strong>${inq.propertyName}</strong></p>
                </div>
            `;
            container.appendChild(item);
        });
    }

    // Trigger the fetch immediately on page load
    loadDashboardData();
    
});