document.addEventListener('DOMContentLoaded', () => {
    const viewbooksButton = document.getElementById('view-books');
    const contentDiv = document.getElementById('content');

    viewbooksButton.addEventListener('click', async () => {
        await fetch('http://localhost:3000/books')
            .then(response => response.json())
            .then(books => {
                // Clear existing content
                contentDiv.innerHTML = '';
                 // Create card element
                 
                const card = document.createElement('div');
                card.className = 'card bg-light text-dark mb-3';
                card.innerHTML = `
                    <div>
                        <h3>List of Books</h3>
                        <div>
                            <table class="table table-hover">
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
            //     "isbn": "978-1-23",
            //     "title": "Data Structure and Algorithm",
            //     "max_checkout_length": 7,
            //     "authors": [
            //       "William Munny"
            //     ]
            //   },
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
            });
    });
});