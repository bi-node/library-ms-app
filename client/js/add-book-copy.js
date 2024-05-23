document.addEventListener('DOMContentLoaded', () => {
    const addBookButton = document.getElementById('add-book-copy');
    const contentDiv = document.getElementById('content');

    addBookButton.addEventListener('click', () => {
        // Clear existing content
        contentDiv.innerHTML = '';

        // Create form element
        const form = document.createElement('form');
        form.id = 'check-book-form';
        form.innerHTML = `
            <div>
                <h2>Check Book</h2>
                <div>
                    <label for="isbn">ISBN</label>
                    <input type="text" id="isbn" name="isbn" required>
                </div>
                <div>
                    <button type="submit" id="checkBook">Check Book</button>
                </div>
            </div>
        `;

        contentDiv.appendChild(form);
        const isbn = document.getElementById('isbn');
        const checkBookButton = document.getElementById('checkBook');

        checkBookButton.addEventListener('click', async (event) => {
            event.preventDefault(); // Prevent form submission

            const isbnValue = isbn.value;
            await fetch(`http://localhost:3000/books/?isbn=${isbnValue}`)
                .then(response => response.json())
                .then(books => {
                    const book = books.find(x => x.isbn === isbnValue);
                    if (!book) {
                        alert("Book is not in the database. Please add book first");
                    } else {
                        // Check if the add-book-form already exists
                        if (!document.getElementById('add-book-form')) {
                            const addForm = document.createElement('form');
                            addForm.id = 'add-book-form';
                            addForm.innerHTML = `
                                <div>
                                    <h2>Add Book Copy</h2>
                                    <div>
                                        <label for="noCopies">Number of Copies to add</label>
                                        <input type="number" id="noCopies" name="noCopies" required>
                                    </div>
                                    <div>
                                        <button type="submit" id="addBookCopy">Add Book Copies</button>
                                    </div>
                                </div>
                            `;
                            contentDiv.appendChild(addForm);
                            const noCopies = document.getElementById('noCopies');
                            const submitAddCopy = document.getElementById('addBookCopy');

                            addForm.addEventListener('submit', async (event) => {
                                event.preventDefault(); // Prevent form submission
                                const copiesValue = parseInt(noCopies.value, 10);
                                const bookData = {
                                    isbn: isbnValue,
                                    noCopies: copiesValue
                                };

                                try {
                                        await fetch('http://localhost:3000/books/addbookcopy', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(bookData)
                                        });
                                    alert('Book copies added successfully!');
                                    addForm.reset();
                                } catch (error) {
                                    console.error('Error:', error);
                                    alert('Failed to add book copies');
                                }
                            });
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to check book');
                });
        });
    });
});
