document.addEventListener('DOMContentLoaded', () => {
    const addBookButton = document.getElementById('check-out');
    const contentDiv = document.getElementById('content');

    addBookButton.addEventListener('click', () => {
        // Clear existing content
        contentDiv.innerHTML = '';

        // Create form element for checking book by ISBN
        const form = document.createElement('form');
        form.id = 'check-out-form';
        form.innerHTML = `
            <div>
                <input type="text" id="isbnInput" placeholder="Enter ISBN" required>
                <button type="submit" id="checkBook">Check Book</button>
            </div>
        `;

        contentDiv.appendChild(form);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const isbn = document.getElementById('isbnInput').value;
            loadAddBookCopyPage(isbn);
        });
    });
});

function loadAddBookCopyPage(isbn) {
    // Load addBookCopy.js dynamically
    const script = document.createElement('script');
    script.src = './add-checkout-entry.js'; // Adjust the path as necessary
    script.onload = () => {
        // Assuming the script defines a function to initialize the page
        window.initializeAddBookCopyPage(isbn);
    };
    document.body.appendChild(script);
}
