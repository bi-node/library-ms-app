document.addEventListener('DOMContentLoaded', () => {
    const viewUsersButton = document.getElementById('view-users');
    const contentDiv = document.getElementById('content');

    viewUsersButton.addEventListener('click', async () => {
        await fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                // Clear existing content
                contentDiv.innerHTML = '';

                // Create card element
                const card = document.createElement('div');
                card.className = 'card bg-dark text-light mb-3';
                card.innerHTML = `
                    <div class="card-body">
                        <h2 class="card-title">Users</h2>
                        <div class="table-responsive">
                            <table class="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody id="user-table-body">
                                    <!-- Rows will be dynamically inserted here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;

                // Append card to content div
                contentDiv.appendChild(card);

                // Insert user data into table
                const tableBody = document.getElementById('user-table-body');
                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.role}</td>
                    `;
                    tableBody.appendChild(row);
                });
            });
    });
});
