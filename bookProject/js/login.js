document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        // Perform login logic here
        console.log(`Logging in with Email: ${email} and Password: ${password}`);
        
        document.getElementById('loginForm').reset();
    }
});