import { displayAlert } from './alert.js';

document.addEventListener('DOMContentLoaded', () => {
    const addBookButton = document.getElementById('add-book-copy');
    const contentDiv = document.getElementById('content');

    addBookButton.addEventListener('click', () => {
        // Clear existing content
        contentDiv.innerHTML = '';

        // Create form element for checking book by ISBN
        const form = document.createElement('form');
        form.id = 'check-book-form';
        form.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <div id="checkBookDiv">
                            <h2>Check Book</h2>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Enter ISBN" id="isbn" name="isbn" required>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="submit" id="checkBook">
                                        <i class="fa fa-search"></i> Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        contentDiv.appendChild(form);
        const isbn = document.getElementById('isbn');

        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent form submission

            const isbnValue = isbn.value;
            console.log(isbnValue);
            

            try {
                const user = JSON.parse(sessionStorage.getItem('user'));
                if (!user || !user.accessToken) {
                    throw new Error('User not authenticated');
                }

                const response = await fetch(apiUrl+`/books/?isbn=${isbnValue}`, {
                    method: 'GET',
                    headers: {
                        'Access-Token': user.accessToken // Ensure this matches what your server expects
                    }
                });
    

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const books = data.data;
                const book = books.find(x => x.isbn === isbnValue);

                if (!book) {
                    displayAlert("Book is not in the database. Please add the book first", 'warning');
                    form.reset();
                } else {
                    displayAlert("Book found in the database.", 'success');

                    // Disable the form
                    Array.from(form.elements).forEach(element => element.disabled = true);

                    // Check if the add-book-form already exists
                    if (!document.getElementById('add-book-form')) {
                        const addForm = document.createElement('form');
                        addForm.id = 'add-book-form';
                        addForm.innerHTML = `
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div id="addBookCopyDiv">
                                            <h2>Add Book Copy</h2>
                                            <div class="form-group">
                                                <label for="noCopies">Number of Copies to add</label>
                                                <input type="number" class="form-control" id="noCopies" name="noCopies" required>
                                            </div>
                                            <div class="form-group">
                                                <button type="submit" class="btn btn-primary" id="addBookCopy">Add Book Copies</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        contentDiv.appendChild(addForm);
                        const noCopies = document.getElementById('noCopies');

                        addForm.addEventListener('submit', async (event) => {
                            event.preventDefault(); // Prevent form submission
                            const copiesValue = parseInt(noCopies.value, 10);
                            const bookData = {
                                isbn: isbnValue,
                                noCopies: copiesValue
                            };

                            try {
                                const user = JSON.parse(sessionStorage.getItem('user'));
                                if (!user || !user.accessToken) {
                                    throw new Error('Network response was not ok'); // Exit the function early
                                }
                                const addCopyResponse = await fetch(apiUrl + '/books/addbookcopy', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Access-Token': user.accessToken
                                    },
                                    body: JSON.stringify(bookData)
                                });

                                if (!addCopyResponse.ok) {
                                    throw new Error('Failed to add book copies');
                                }

                                displayAlert('Book copies added successfully!', 'success');
                                addForm.reset();
                                form.reset();
                            } catch (error) {
                                console.error('Error:', error);
                                setTimeout(reloadLogin(), 5000);
                                console.error('Fetch error:', error);
                                displayAlert('Failed to add book copies', 'danger');
                            }
                        });
                    }
                }
            } catch (error) {


                console.error('Error:', error);
                displayAlert('Failed to check book', 'danger');
                setTimeout(reloadLogin(), 5000);
                console.error('Fetch error:', error);
                //form.reset();
            }
        });
    });

    function reloadLogin() {
        console.log('Redirecting to login page...');
        window.location.replace(clientUrlAdditive + '/login.html');
    }

});
