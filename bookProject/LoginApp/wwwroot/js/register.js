document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const message = document.getElementById("registerMessage");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent normal form submission

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (data.message === "Registration successful") {
                message.textContent = "Registration successful! Redirecting to login...";
                setTimeout(() => {
                    window.location.href = "/html/loginPage.html"; // Update path to your login page
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
