document.addEventListener('DOMContentLoaded', () => {
    const addBookButton = document.getElementById('check-out');
    const contentDiv = document.getElementById('content');

    addBookButton.addEventListener('click', () => {
        // Clear existing content
        contentDiv.innerHTML = '';

        // Create form element for checking book by ISBN
        const form = document.createElement('form');
        form.id = 'check-book-form';
        form.innerHTML = `
            <div>
                <h2>Check-out Entry</h2>
                <div>
                    <label for="isbn">ISBN</label>
                    <input type="text" id="isbn" name="isbn" required>
                </div>
                <div>
                    <label for="memberid">Library Member ID</label>
                    <input type="text" id="memberid" name="memberid" required>
                </div>
                <div>
                    <button type="submit" id="search">Search</button>
                </div>
            </div>
        `;

        contentDiv.appendChild(form);

        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent form submission

            const isbnValue = document.getElementById('isbn').value;
            const memberidValue = document.getElementById('memberid').value;

            try {
                const isBookCopyAvailableResponse = await fetch(`http://localhost:3000/bookcopy/avail/${isbnValue}`);
                const ismemberidAvailableResponse = await fetch(`http://localhost:3000/members/?memberid=${memberidValue}`);

                if (isBookCopyAvailableResponse.ok && ismemberidAvailableResponse.ok) {
                    const bookCopyData = await isBookCopyAvailableResponse.json();
                    const memberData = await ismemberidAvailableResponse.json();

                    // Disable the form using an anonymous function
                    (function(form) {
                        const elements = form.elements;
                        for (let i = 0; i < elements.length; i++) {
                            elements[i].disabled = true;
                        }
                    })(form);

                    const memberid = memberData.memberid;
                    const copyid = bookCopyData.copyid;
                    const isbn = isbnValue;
                    
                    // Display message that the book is found
                    alert("Book found in the database.");

                    // Check if the add-entry-form already exists
                    if (!document.getElementById('add-entry-form')) {
                        const addForm = document.createElement('form');
                        addForm.id = 'add-entry-form';
                        addForm.innerHTML = `
                            <div>
                                <h3>Add Check Out Entry</h3>
                                <div>
                                    <label for="checkoutdate">Check-out Date</label>
                                    <input type="text" id="checkoutdate" name="checkoutdate" required>
                                </div>
                                <div>
                                    <label for="duedate">Due Date</label>
                                    <input type="text" id="duedate" name="duedate" required>
                                </div>
                                <div>
                                    <button type="submit" id="addEntry">Add Entry</button>
                                </div>
                            </div>
                        `;
                        contentDiv.appendChild(addForm);

                        addForm.addEventListener('submit', async (event) => {
                            event.preventDefault(); // Prevent form submission
                            const checkoutdate = document.getElementById('checkoutdate').value;
                            const duedate = document.getElementById('duedate').value;
                            const entryData = {
                                isbn: isbn,
                                memberid: memberid,
                                issued_bookno: copyid,
                                checkoutdate: checkoutdate,
                                duedate: duedate
                            };

                            try {
                                await fetch('http://localhost:3000/checkoutentries', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(entryData)
                                });
                                //updating the book copy database to set status to unavailable for the book
                                await fetch(`http://localhost:3000/bookcopy/avail/${isbn}`, {
                                    method: 'PUT'
                                });

                                alert('Book entry added successfully!');
                                addForm.reset();
                                form.reset();
                            } catch (error) {
                                console.error('Error:', error);
                                alert('Failed to add book entry');
                            }
                        });
                    }
                } else {
                    alert('Either the book copy or the member ID is not available.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to check availability');
            }
        });
    });
});
