using Microsoft.Data.Sqlite;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Serve static files (wwwroot)
app.UseStaticFiles();

// Redirect root to index.html
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
    var registerData = await context.Request.ReadFromJsonAsync<LoginRequest>();
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

app.Run();

record LoginRequest(string Email, string Password);
