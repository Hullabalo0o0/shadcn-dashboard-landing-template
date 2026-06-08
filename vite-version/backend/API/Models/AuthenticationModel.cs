namespace MyAPI.Api.Models;

public record LoginRequest(
    string Username,
    string Password
);

public record SignupRequest(
    string FirstName,
    string LastName,
    string EmailAddress,
    string Username,
    string Password
);

public record ForgotRequest(
    string Email
);