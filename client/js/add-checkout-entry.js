import { displayAlert } from './alert.js';

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
        <div class="container">
        <h2>Check-out Entry</h2>
        <div class="form-group">
            <label for="isbn">ISBN</label>
            <input type="text" class="form-control" id="isbn" name="isbn" required>
        </div>
        <div class="form-group">
            <label for="memberid">Library Member ID</label>
            <input type="text" class="form-control" id="memberid" name="memberid" required>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary" id="search">Search</button>
        </div>
    </div>
    
        `;

        contentDiv.appendChild(form);

        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent form submission

            const isbnValue = document.getElementById('isbn').value;
            const memberidValue = document.getElementById('memberid').value;

            try {

                const user = JSON.parse(sessionStorage.getItem('user'));
                if (!user || !user.accessToken) {
                    throw new Error('User not authenticated');
                }
                const isBookCopyAvailableResponse = await fetch(apiUrl+`/bookcopy/avail/${isbnValue}`,
                {
                    method: 'GET',
                    headers: {
                        'Access-Token': user.accessToken // Ensure this matches what your server expects
                    }
                });
                const ismemberidAvailableResponse = await fetch(apiUrl+`/members/?memberid=${memberidValue}`,
                {
                    method: 'GET',
                    headers: {
                        'Access-Token': user.accessToken // Ensure this matches what your server expects
                    }
                });

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
                    displayAlert("Book found in the database.",'success');

                    // Check if the add-entry-form already exists
                    if (!document.getElementById('add-entry-form')) {
                        const addForm = document.createElement('form');
                        addForm.id = 'add-entry-form';
                        addForm.innerHTML = `
                        <div class="container">
                        <h3>Add Check Out Entry</h3>
                        <div class="form-group">
                            <label for="checkoutdate">Check-out Date</label>
                            <input type="text" id="checkoutdate" class="form-control" name="checkoutdate" required>
                        </div>
                        <div class="form-group">
                            <label for="duedate">Due Date</label>
                            <input type="text" id="duedate" class="form-control" name="duedate" required>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary" id="addEntry">Add Entry</button>
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
                                const user = JSON.parse(sessionStorage.getItem('user'));
                                if (!user || !user.accessToken) {
                                    throw new Error('Network response was not ok'); // Exit the function early
                                }  

                                await fetch(apiUrl+'/checkoutentries', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Access-Token': user.accessToken
                                    },
                                    body: JSON.stringify(entryData)
                                });
                                //updating the book copy database to set status to unavailable for the book
                                await fetch(`apiUrl+'/bookcopy/avail/${isbn}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Access-Token': user.accessToken
                                    }
                                });

                                displayAlert('Book entry added successfully!','success');
                                addForm.reset();
                                form.reset();
                            } catch (error) {
                                console.error('Error:', error);
                                displayAlert('Failed to add book entry','danger');
                                setTimeout(reloadLogin(), 5000);

                            }
                        });
                    }
                } else {
                    displayAlert('Either the book copy or the member ID is not available.','warning');
                }
            } catch (error) {
                console.error('Error:', error);
                displayAlert('Failed to check availability','danger');
                setTimeout(reloadLogin(), 5000);
            }
        });
    });
    function reloadLogin() {
        console.log('Redirecting to login page...');
        window.location.replace(clientUrlAdditive + '/login.html');
    }
});
