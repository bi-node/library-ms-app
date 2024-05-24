


document.addEventListener('DOMContentLoaded', () => {
    const viewbooksButton = document.getElementById('view-books');
    const contentDiv = document.getElementById('content');


    viewbooksButton.addEventListener('click', async () => {
        
    
        await fetch(apiUrl+'/books')
            .then(response => response.json())
            .then(books => {
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
            });
    });
});
