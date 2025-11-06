using Microsoft.Data.Sqlite;
using Microsoft.AspNetCore.Http.Json;

// Setting up the web app so it has everything it needs before it runs
var builder = WebApplication.CreateBuilder(args); //args refers to command line arguments
var app = builder.Build(); //creating instance of app that deals with HTTP requests

// Serve static files, so files under wwwroot are accessible
app.UseStaticFiles();

// Root redirect
app.MapGet("/", () => Results.Redirect("html/index.html"));

// Login endpoint
app.MapPost("/login", async (HttpContext context) =>
{
    var loginData = await context.Request.ReadFromJsonAsync<LoginRequest>();
    if (loginData == null) return Results.BadRequest(new { message = "Invalid request" });

    using var connection = new SqliteConnection("Data Source=Data/users.db");
    connection.Open();

    var command = connection.CreateCommand();
    command.CommandText = "SELECT * FROM users WHERE email = $email AND password = $password";
    command.Parameters.AddWithValue("$email", loginData.Email);
    command.Parameters.AddWithValue("$password", loginData.Password);

    using var reader = command.ExecuteReader();
    if (reader.Read()) return Results.Json(new { message = "Login successful" });
    else return Results.Json(new { message = "Invalid email or password" });
});

// Register endpoint
app.MapPost("/register", async (HttpContext context) =>
{
    var registerData = await context.Request.ReadFromJsonAsync<RegisterRequest>();
    if (registerData == null) return Results.BadRequest(new { message = "Invalid request" });

    using var connection = new SqliteConnection("Data Source=Data/users.db");
    connection.Open();

    var command = connection.CreateCommand();
    command.CommandText = "INSERT INTO users (email, password) VALUES ($email, $password)";
    command.Parameters.AddWithValue("$email", registerData.Email);
    command.Parameters.AddWithValue("$password", registerData.Password);

    try
    {
        command.ExecuteNonQuery();
        return Results.Json(new { message = "Registration successful" });
    }
    catch
    {
        return Results.Json(new { message = "User already exists" });
    }
});

app.MapPost("/logout", async (HttpContext context) =>
{
    context.Response.Cookies.Delete("sessionId"); 
    return Results.Json(new { message = "Logged out successfully" });
});       

app.Run();

// Records for deserializing requests
record LoginRequest(string Email, string Password);
record RegisterRequest(string Name, string Email, string Password);
