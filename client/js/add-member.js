document.addEventListener('DOMContentLoaded', () => {
    const addBookButton = document.getElementById('add-member');
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
                            <div>
                                <label for="firstname">First Name</label>
                                <input type="text" id="firstname" name="firstname" required>
                            </div>
                            <div>
                                <label for="lastname">Last Name</label>
                                <input type="text" id="lastname" name="lastname" required>
                            </div>
                            <div>
                                <label for="telephone">Cell Phone No.</label>
                                <input type="text" id="telephone" name="telephone" required>
                            </div>
                            <div>
                                <label for="address">Address</label>
                                <input type="text" id="address" name="address" required>
                            </div>
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        contentDiv.appendChild(form);

        // Handle form submission
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const memberData = {
                firstname: document.getElementById('firstname').value,
                lastname: document.getElementById('lastname').value,
                telephone: document.getElementById('telephone').value,
                address: document.getElementById('address').value
            };

            await fetch('http://localhost:3000/members', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(memberData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Member added successfully!');
                form.reset(); // Reset the form
            })
            .catch(error => {
                console.error('Error adding member:', error);
            });
        });
    });
});
