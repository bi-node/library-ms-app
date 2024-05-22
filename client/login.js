document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            //for testing
           
            document.getElementById('message').textContent = 'Login successful';
            document.getElementById('message').style.color = 'green';
            window.location.href = 'index.html';
            // window.location.replace('/home.html');
        } else {
            document.getElementById('message').textContent = data;
            document.getElementById('message').style.color = 'red';
        }
    } catch (error) {
        document.getElementById('message').textContent = 'An error occurred. Please try again.';
        document.getElementById('message').style.color = 'red';
    }
});
