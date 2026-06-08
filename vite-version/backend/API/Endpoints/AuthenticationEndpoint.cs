using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using MySqlConnector;
using MyAPI.Api.Models;
using MyAPI.Services;

namespace MyAPI.Api.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(
        this WebApplication app,
        string connectionString,
        string jwtKey,
        string jwtIssuer)
    {
        // Signup
        app.MapPost("/api/auth/signup", async (SignupRequest signup) =>
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(signup.Password);

            await using var connection = new MySqlConnection(connectionString);
            await connection.OpenAsync();

            var sql = @"
                INSERT INTO user_tbl
                (RefID, FirstName, LastName, EmailAddress, Username, PasswordHash, Role, IsActive, CreateBy, CreateDate)
                VALUES
                (@RefID, @FirstName, @LastName, @EmailAddress, @Username, @PasswordHash, 'User', 1, 'System', @CreateDate);
            ";

            await using var cmd = new MySqlCommand(sql, connection);

            cmd.Parameters.AddWithValue("@RefID", await AutoRefId.RefIDAsync(connection, "USR"));
            cmd.Parameters.AddWithValue("@FirstName", signup.FirstName);
            cmd.Parameters.AddWithValue("@LastName", signup.LastName);
            cmd.Parameters.AddWithValue("@EmailAddress", signup.EmailAddress);
            cmd.Parameters.AddWithValue("@Username", signup.Username);
            cmd.Parameters.AddWithValue("@PasswordHash", hashedPassword);
            cmd.Parameters.AddWithValue("@CreateDate", GeneralServices.GetCurrentDate());

            await cmd.ExecuteNonQueryAsync();

            return Results.Created();
        });

        // Login
        app.MapPost("/api/auth/login", async (LoginRequest login) =>
        {
            if (string.IsNullOrWhiteSpace(login.Username) || string.IsNullOrWhiteSpace(login.Password))
                return Results.BadRequest(new { error = "Username and password are required" });

            await using var connection = new MySqlConnection(connectionString);
            await connection.OpenAsync();

            var sql = @"
                SELECT RefID, FirstName, LastName, Username, PasswordHash
                FROM user_tbl
                WHERE Username = @u
                LIMIT 1;
            ";

            await using var cmd = new MySqlCommand(sql, connection);
            cmd.Parameters.AddWithValue("@u", login.Username);

            await using var reader = await cmd.ExecuteReaderAsync();

            if (!await reader.ReadAsync())
                return Results.Unauthorized();

            var refId = reader.GetString("RefID");
            var firstName = reader.GetString("FirstName");
            var lastName = reader.GetString("LastName");
            var username = reader.GetString("Username");
            var storedHash = reader.GetString("PasswordHash");

            var verified = BCrypt.Net.BCrypt.Verify(login.Password, storedHash);

            if (!verified)
                return Results.Unauthorized();

            // JWT
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, refId),
                new Claim(ClaimTypes.Name, username),
                new Claim("FirstName", firstName),
                new Claim("LastName", lastName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtIssuer,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds
            );

            var tokenStr = new JwtSecurityTokenHandler().WriteToken(token);

            return Results.Ok(new
            {
                token = tokenStr,
                user = new
                {
                    refId,
                    firstName,
                    lastName,
                    username
                }
            });
        });

        // Forgot Password
        app.MapPost("/api/auth/forgot-password", async (ForgotRequest req) =>
        {
            if (string.IsNullOrWhiteSpace(req.Email))
                return Results.BadRequest(new { error = "Email is required" });

            // TODO: implement sending a real reset email. For now return 200.
            return Results.Ok(new { status = "ok" });
        });
    }
}