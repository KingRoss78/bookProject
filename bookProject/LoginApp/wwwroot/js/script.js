document.getElementById('addBookButton').addEventListener('click', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('author').value;
    
    if (title && author) {
        const bookList = document.getElementById('bookList');
        const listItem = document.createElement('li');
        
        // Create text span for book info
        const bookInfo = document.createElement('span');
        bookInfo.textContent = `${title} by ${author}`;
        
        // Create status dropdown
        const statusSelect = document.createElement('select');
        const statuses = ['To Read', 'Reading', 'Completed'];
        
        statuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            statusSelect.appendChild(option);
        });
        
        // Add the elements to the list item
        listItem.appendChild(bookInfo);
        listItem.appendChild(statusSelect);
        bookList.appendChild(listItem);
        
        document.getElementById('bookForm').reset();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
   const logOutButton = document.getElementById('logOutButton');
    console.log('Logout button element:', logOutButton);

    if (logOutButton) {
        logOutButton.addEventListener('click', async () => {
            console.log('Logout clicked');
            try {
                const response = await fetch('/logout', { method: 'POST' });
                console.log('Logout response status:', response.status, response.statusText);
                const text = await response.text(); // read raw body
                console.log('Logout raw response text:', text);

                let data = null;
                if (text) {
                    try {
                        data = JSON.parse(text);
                    } catch (parseErr) {
                        console.warn('Failed to parse logout response as JSON', parseErr);
                    }
                }

                // Treat 200/204 as success; fallback to checking data.message if present
                if (response.status === 204 || response.status === 200 || (data && data.message === 'Logged out successfully')) {
                    console.log('Logout successful', data);
                    window.location.href = '/html/loginPage.html';
                } else {
                    console.warn('Unexpected logout response', { status: response.status, data, text });
                }
            } catch (error) {
                console.error('Logout failed:', error);
            }
        });
    } else {
        console.error('Logout button not found');
    }
});