document.addEventListener('DOMContentLoaded', () => {
    const logout = document.getElementById('log-out');

    logout.addEventListener('click', () => {
        // Ask the user for confirmation
        const confirmation = confirm("Are you sure you want to log out?");

        if (confirmation) {
            // Clear user session data
            sessionStorage.removeItem("user");

            // Redirect to the login page
            reloadLogin();
        } else {
            console.log("Logout canceled.");
        }
    });

    function reloadLogin() {
        console.log('Redirecting to login page...');
        window.location.replace('login.html'); // Adjust this path if necessary
    }
});
