
document.addEventListener('DOMContentLoaded', () => {
    const viewUsersButton = document.getElementById('view-users');
    const viewMembersButton = document.getElementById('view-members');
    const viewBooksButton = document.getElementById('view-books');
    const addMemberButton = document.getElementById('add-member');
    const addBookButton = document.getElementById('add-book');
    const addBookCopyButton = document.getElementById('add-book-copy');
    const checkoutRecordsButton = document.getElementById('check-out-records');
    const logoutButton = document.getElementById('log-out');
    const contentDiv = document.getElementById('content');

    viewUsersButton.addEventListener('click', async () => {
        await fetch(' http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                contentDiv.innerHTML = '<h2>Users</h2>';
                users.forEach(user => {
                    contentDiv.innerHTML += `<p>${user.id} (${user.username})</p>`;
                });
            });
    });

    // Add event listeners for other buttons here
});
