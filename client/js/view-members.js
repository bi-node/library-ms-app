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
                    <div>
                        <h2>members</h2>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Telephone</th>
                                        <th>Address</th>
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
