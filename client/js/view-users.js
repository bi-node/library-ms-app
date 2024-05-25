document.addEventListener('DOMContentLoaded', () => {
    const viewUsersButton = document.getElementById('view-users');
    const contentDiv = document.getElementById('content');

    viewUsersButton.addEventListener('click', async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (!user || !user.accessToken) {
                throw new Error('Network response was not ok'); // Exit the function early
            }

            const response = await fetch(apiUrl + "/users", {
                method: 'GET',
                headers: {
                    'Access-Token': user.accessToken // Ensure this matches what your server expects
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const users = (await response.json()).data;
            console.log(users);
            

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
        } catch (error) {

            setTimeout(reloadLogin(), 5000);
            console.error('Fetch error:', error);
        }
    });

    function reloadLogin() {
        console.log('Redirecting to login page...');
        window.location.replace(clientUrlAdditive + '/login.html');
    }
});
