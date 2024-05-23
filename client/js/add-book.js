document.addEventListener('DOMContentLoaded', () => {
    const addBookButton = document.getElementById('add-book');
    const contentDiv = document.getElementById('content');

    addBookButton.addEventListener('click', () => {
        // Clear existing content
        contentDiv.innerHTML = '';

        // Create form element
        const form = document.createElement('form');
        form.id = 'add-book-form';
        form.innerHTML = `
            <div>
                <h2>Add Book</h2>
                <div>
                    <label for="isbn">ISBN</label>
                    <input type="text" id="isbn" name="isbn" required>
                </div>
                <div>
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" required>
                </div>
                <div>
                    <label for="max_checkout_length">Checkout Length</label>
                    <input type="number" id="max_checkout_length" name="max_checkout_length" required>
                </div>
                <div id="authors-container">
                    <h3>Authors</h3>
                    <button type="button" id="add-author-button">Add Author</button>
                </div>
                <div>
                    <button type="submit">Add Book</button>
                </div>
            </div>
        `;

        contentDiv.appendChild(form);

        const authorsContainer = document.getElementById('authors-container');
        const addAuthorButton = document.getElementById('add-author-button');

        addAuthorButton.addEventListener('click', () => {
            const authorDiv = document.createElement('div');
            authorDiv.className = 'author';
            authorDiv.innerHTML = `
                <div>
                    <label for="firstname">First Name</label>
                    <input type="text" class="firstname" name="firstname" required>
                </div>
                <div>
                    <label for="lastname">Last Name</label>
                    <input type="text" class="lastname" name="lastname" required>
                </div>
                <div>
                    <label for="telephone">Telephone</label>
                    <input type="text" class="telephone" name="telephone" required>
                </div>
                <div>
                    <label for="address">Address</label>
                    <input type="text" class="address" name="address" required>
                </div>
                <div>
                <label for="bio">Biography</label>
                <input type="text" class="bio" name="bio" required>
                </div>
                <div>
                <label for="credit">Credits</label>
                <input type="text" class="credit" name="credit" required>
                </div>
                <button type="button" class="remove-author-button">Remove Author</button>
            `;
            authorsContainer.appendChild(authorDiv);

            const removeAuthorButton = authorDiv.querySelector('.remove-author-button');
            removeAuthorButton.addEventListener('click', () => {
                authorsContainer.removeChild(authorDiv);
            });
        });

        // Handle form submission
        form.addEventListener('submit', async (event) => {
        
            const authors = [];
            document.querySelectorAll('.author').forEach(authorDiv => {
                const firstname = authorDiv.querySelector('.firstname').value;
                const lastname = authorDiv.querySelector('.lastname').value;
                const telephone = authorDiv.querySelector('.telephone').value;
                const address = authorDiv.querySelector('.address').value;
                const bio = authorDiv.querySelector('.bio').value;
                const credit = authorDiv.querySelector('.credit').value;
                authors.push(firstname.concat(" ",lastname));
            });

            const bookData = {
                isbn: document.getElementById('isbn').value,
                title: document.getElementById('title').value,
                max_checkout_length: document.getElementById('max_checkout_length').value,
                authors: authors
            };

            await fetch('http://localhost:3000/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Book added successfully!');
                form.reset();
                // Optionally clear authors container
                authorsContainer.innerHTML = '<h3>Authors</h3><button type="button" id="add-author-button">Add Author</button>';
            })
            .catch(error => {
                console.error('Error adding book:', error);
            });
        });
    });
});
