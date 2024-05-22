document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');


    async function loadPage(page) {
        try {
            console.log('Loading page:', page);
            const response = await fetch(`pages/${page}.html`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const html = await response.text();
            content.innerHTML = html;

            // Remove any previously added script
            const existingScript = document.getElementById('page-script');
            if (existingScript) {
                existingScript.remove();
            }

            // Load the associated JavaScript if any
            const script = document.createElement('script');
            script.id = 'page-script';
            script.src = `pages/${page}.js`;
            content.appendChild(script);

            console.log(`Loaded page: ${page} and its script.`);
        } catch (error) {
            console.error('Error loading page:', error);
            content.innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
        }
    }

    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        console.log('Hash changed:', hash);
        loadPage(hash);
    });

    if (window.location.hash) {
        loadPage(window.location.hash.substring(1));
    } else {
        loadPage('view-users');
    }
});
