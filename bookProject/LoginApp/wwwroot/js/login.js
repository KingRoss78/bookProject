document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const message = document.getElementById("loginMessage");

    
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent normal form submission

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.message === "Login successful") {
                message.textContent = "Login successful...";
                setTimeout(() => {
                    window.location.href = "/html/index.html"; // Update path to your home page
                }, 1500);
            } else {
                message.textContent = data.message;
            }
        } catch (err) {
            message.textContent = "Error connecting to server.";
            console.error(err);
        }
    });
});

