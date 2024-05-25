


document.addEventListener('DOMContentLoaded', () => {
    const viewbooksButton = document.getElementById('view-books');
    const contentDiv = document.getElementById('content');


    viewbooksButton.addEventListener('click', async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (!user || !user.accessToken) {
                throw new Error('Network response was not ok'); // Exit the function early
            }

            const response = await fetch(apiUrl + "/books", {
                method: 'GET',
                headers: {
                    'Access-Token': user.accessToken // Ensure this matches what your server expects
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const books = (await response.json()).data;
            console.log(books);

            // Clear existing content
            contentDiv.innerHTML = '';
            // Create card element

            const card = document.createElement('div');
            card.className = 'card bg-light text-dark mb-3';
            card.innerHTML = `
                    <div  class="container-sm">
                        <h3>List of Books</h3>
                        <div style="max-height: 400px; overflow-y: auto;">
                            <table class="table table-hover" style="font-size: 12px;">
                                <thead>
                                    <tr>
                                        <th scope="col">ISBN</th>
                                        <th scope="col">Book Title</th>
                                        <th scope="col">Maximum Check-out Length</th>
                                        <th scope="col">Authors</th>
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

            // Insert book data into table
            const tableBody = document.getElementById('table-body');
            books.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                        <td>${book.isbn}</td>
                        <td>${book.title}</td>
                        <td>${book.max_checkout_length}</td>
                        <td>${book.authors}</td>
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


