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