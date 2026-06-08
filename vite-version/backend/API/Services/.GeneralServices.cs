using MySqlConnector;

namespace MyAPI.Services;

public static class GeneralServices
{
    public static MySqlConnection OpenConnection(IConfiguration config)
    {
        return new MySqlConnection(
            config.GetConnectionString("DefaultConnection")
        );
    }

    public static DateTime GetCurrentTimeZone()
    {
        var tz = TimeZoneInfo.FindSystemTimeZoneById("Singapore Standard Time");
        return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, tz);
    }

    public static DateTime GetCurrentDate()
    {
        var now = GetCurrentTimeZone();

        return new DateTime(
            now.Year,
            now.Month,
            now.Day,
            now.Hour,
            now.Minute,
            now.Second
        );
    }
}