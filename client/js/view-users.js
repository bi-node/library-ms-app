document.addEventListener('DOMContentLoaded', () => {
    const viewUsersButton = document.getElementById('view-users');
    const contentDiv = document.getElementById('content');

    viewUsersButton.addEventListener('click', async () => {
        await fetch(apiUrl+'/users')
            .then(response => response.json())
            .then(users => {
                // Clear existing content
                contentDiv.innerHTML = '';

                // Create card element
                const card = document.createElement('div');
                card.className = 'card bg-light text-dark mb-3';
                card.innerHTML = `
                    <div  class="container-sm">
                        <h3>Users</h3>
                        <div style="max-height: 400px; overflow-y: auto;" >
                            <table class="table table-hover" style="font-size: 12px;">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Role</th>
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
