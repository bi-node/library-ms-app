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
                <h2>Add Book Copy</h2>
                <div>
                    <label for="isbn">ISBN</label>
                    <input type="text" id="isbn" name="isbn" required>
                </div>
                <div>
                    <button type="submit" id="checkBook">Check Book</button>
                </div>
            </div>
        `;
        const isbn=document.getElementById('isbn');
        const checkBookButton=document.getElementById('checkBook');

        checkBookButton.addEventListener('click', async () => {
            await fetch(`http://localhost:3000/books/?isbn=${isbn}`)
                .then(response => response.json())
                .then(books => {

                });
            });








       
    });
});
