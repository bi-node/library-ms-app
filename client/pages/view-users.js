document.addEventListener('DOMContentLoaded', () => {
    console.log('view-users.js loaded');

    const userList = document.getElementById('user-list');

    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:3000/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            userList.innerHTML = '<p>Failed to load users. Please try again later.</p>';
        }
    }

    function displayUsers(users) {
        if (users.length === 0) {
            userList.innerHTML = '<p>No users found.</p>';
            return;
        }

        const userTable = document.createElement('table');
        userTable.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.role}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        userList.innerHTML = '';
        userList.appendChild(userTable);
    }

    fetchUsers();
});
