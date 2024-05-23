document.addEventListener('DOMContentLoaded', () => {
    const viewmembersButton = document.getElementById('view-members');
    const contentDiv = document.getElementById('content');

    viewmembersButton.addEventListener('click', async () => {
        await fetch('http://localhost:3000/members')
            .then(response => response.json())
            .then(members => {
                // Clear existing content
                contentDiv.innerHTML = '';
                 // Create card element
                const card = document.createElement('div');
                card.className = 'card bg-light text-dark mb-3';
                card.innerHTML = `
                    <div class="container-sm">
                        <h3>Library Members</h3>
                        <div>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Telephone</th>
                                        <th scope="col">Address</th>
                                    </tr>
                                </thead>
                                <tbody id="table-body">
                                    <!-- Rows will be dynamically inserted here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;

                contentDiv.appendChild(card);

                // Insert member data into table
                const tableBody = document.getElementById('table-body');
                members.forEach(member => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${member.memberid}</td>
                        <td>${member.firstname}</td>
                        <td>${member.lastname}</td>
                        <td>${member.telephone}</td>
                        <td>${member.address}</td>
                    `;
                    tableBody.appendChild(row);
                });
            });
    });
});
