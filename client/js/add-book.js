import { displayAlert } from './alert.js';

document.addEventListener('DOMContentLoaded', () => {
    const addBookButton = document.getElementById('add-book');
    const contentDiv = document.getElementById('content');

    addBookButton.addEventListener('click', () => {
        // Clear existing content
        contentDiv.innerHTML = '';

        // Create form element
        const form = document.createElement('form');
        form.id = 'add-book-form';
        form.className = 'row g-3';
        form.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <div id="addBookDiv">
                            <h2>Add Book</h2>
                            <div class="form-group">
                                <label for="isbn">ISBN</label>
                                <input type="text" class="form-control" id="isbn" name="isbn" required>
                            </div>
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input type="text" class="form-control" id="title" name="title" required>
                            </div>
                            <div class="form-group">
                                <label for="max_checkout_length">Checkout Length</label>
                                <input type="number" class="form-control" id="max_checkout_length" name="max_checkout_length" required>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div id="authors-container">
                            <h3>Add Authors</h3>
                            <button type="button" class="btn btn-success" id="add-author-button">Add</button>
                        </div>
                    </div>
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
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <div>
                                <label for="firstname">First Name</label>
                                <input type="text" class="form-control firstname" name="firstname" required>
                            </div>
                            <div>
                                <label for="lastname">Last Name</label>
                                <input type="text" class="form-control lastname" name="lastname" required>
                            </div>
                            <div>
                                <label for="telephone">Telephone</label>
                                <input type="text" class="form-control telephone" name="telephone" required>
                            </div>
                            <div>
                                <label for="address">Address</label>
                                <input type="text" class="form-control address" name="address" required>
                            </div>
                            <div>
                                <label for="bio">Biography</label>
                                <input type="text" class="form-control bio" name="bio" required>
                            </div>
                            <div>
                                <label for="credit">Credits</label>
                                <input type="text" class="form-control credit" name="credit" required>
                            </div>
                            <button type="button" class="btn btn-danger remove-author-button">Remove Author</button>
                        </div>
                    </div>
                </div>
            `;
            authorsContainer.appendChild(authorDiv);

            const removeAuthorButton = authorDiv.querySelector('.remove-author-button');
            removeAuthorButton.addEventListener('click', () => {
                authorsContainer.removeChild(authorDiv);
            });
        });

        // Handle form submission
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const authors = [];
            const authorDivs = document.querySelectorAll('.author');

            if (authorDivs.length === 0) {
                displayAlert('Please add at least one author.', 'warning');
                return;
            }

            authorDivs.forEach(authorDiv => {
                const firstname = authorDiv.querySelector('.firstname').value;
                const lastname = authorDiv.querySelector('.lastname').value;
                const telephone = authorDiv.querySelector('.telephone').value;
                const address = authorDiv.querySelector('.address').value;
                const bio = authorDiv.querySelector('.bio').value;
                const credit = authorDiv.querySelector('.credit').value;
                authors.push({
                    firstname: firstname,
                    lastname: lastname,
                    telephone: telephone,
                    address: address,
                    bio: bio,
                    credit: credit
                });
            });

            const bookData = {
                isbn: document.getElementById('isbn').value,
                title: document.getElementById('title').value,
                max_checkout_length: document.getElementById('max_checkout_length').value,
                authors: authors
            };

            try {
                const response = await fetch('http://localhost:3000/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookData)
                });

                if (!response.ok) {
                    throw new Error('Book could not be added.');
                }

                displayAlert('Book added successfully!', 'success');
                form.reset();
                authorsContainer.innerHTML = '<h3>Add Authors</h3><button type="button" class="btn btn-success" id="add-author-button">Add</button>';
            } catch (error) {
                console.error('Error adding book:', error);
                displayAlert('Error adding book. Please try again.', 'danger');
            }
        });
    });
});
