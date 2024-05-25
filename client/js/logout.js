

document.addEventListener('DOMContentLoaded', () => {
    const logout = document.getElementById('log-out');
    const confirmLogoutButton = document.getElementById('confirm-logout');

    logout.addEventListener('click', () => {
        // Show the logout confirmation modal
        $('#logoutModal').modal('show');
    });

    confirmLogoutButton.addEventListener('click', () => {
        // Clear user session data
        clearSessionStorage();

        // Redirect to the login page
        reloadLogin();

        // Hide the modal
        $('#logoutModal').modal('hide');
    });

    function clearSessionStorage() {
        console.log("Clearing session storage...");
        sessionStorage.clear();
    }

    function reloadLogin() {
        console.log('Redirecting to login page...');
        window.location.replace('login.html'); // Adjust this path if necessary
    }
});
