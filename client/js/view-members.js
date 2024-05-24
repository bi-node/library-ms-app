document.addEventListener('DOMContentLoaded', () => {
    const viewMembersButton = document.getElementById('view-members');
    const contentDiv = document.getElementById('content');

    viewMembersButton.addEventListener('click', async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (!user || !user.accessToken) {
                throw new Error('Network response was not ok'); // Exit the function early
            }

            const response = await fetch(apiUrl + "/members", {
                method: 'GET',
                headers: {
                    'Access-Token': user.accessToken // Ensure this matches what your server expects
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const members = (await response.json()).data;

            // Ensure members is an array
            if (!Array.isArray(members)) {
                throw new Error('Expected an array of members');
            }

            // Clear existing content
            contentDiv.innerHTML = '';

            // Create card element
            const card = document.createElement('div');
            card.className = 'card bg-light text-dark mb-3';
            card.innerHTML = `
                <div class="container-sm">
                    <h3>Library Members</h3>
                    <div style="max-height: 400px; overflow-y: auto;">
                        <table class="table table-hover" style="font-size: 12px;">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Telephone</th>
                                    <th scope="col">Address</th>
                                </tr>
                            </thead>
                            <tbody id="members-container">
                                <!-- Rows will be dynamically inserted here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            contentDiv.appendChild(card);

            // Insert member data into the table
            const membersContainer = document.getElementById('members-container');
            members.forEach(member => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${member.memberid}</td>
                    <td>${member.firstname}</td>
                    <td>${member.lastname}</td>
                    <td>${member.telephone}</td>
                    <td>${member.address}</td>
                `;
                membersContainer.appendChild(row);
            });
        } catch (error) {

            setTimeout(reloadLogin(),5000);
            console.error('Fetch error:', error);
        }
    });

    function reloadLogin() {
        console.log('Redirecting to login page...');
        window.location.replace(clientUrlAdditive + '/login.html');
    }
});
