document.addEventListener("DOMContentLoaded", () => {
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

});