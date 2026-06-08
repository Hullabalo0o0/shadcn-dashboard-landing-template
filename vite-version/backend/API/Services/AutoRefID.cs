using MySqlConnector;

namespace MyAPI.Services;

public static class AutoRefId
{
    public static async Task<string> RefIDAsync(
        MySqlConnection connection,
        string code)
    {
        if (!AutoRefIDModel.Rules.TryGetValue(code, out var rule))
            throw new Exception($"RefID rule not found for code: {code}");

        var year = DateTime.Now.ToString("yy");
        var month = DateTime.Now.ToString("MM");
        var datePart = $"{year}{month}";

        var likePattern = $"{rule.Prefix}-{datePart}-%";

        var sql = $@"
            SELECT {rule.ColumnName}
            FROM {rule.TableName}
            WHERE {rule.ColumnName} LIKE @pattern
            ORDER BY {rule.ColumnName} DESC
            LIMIT 1";

        await using var cmd = new MySqlCommand(sql, connection);
        cmd.Parameters.AddWithValue("@pattern", likePattern);

        var result = await cmd.ExecuteScalarAsync();

        int nextNumber = 1;

        if (result != null)
        {
            var parts = result.ToString()!.Split('-');

            if (parts.Length == 3 && int.TryParse(parts[2], out var last))
            {
                nextNumber = last + 1;
            }
        }

        return $"{rule.Prefix}-{datePart}-{nextNumber:D5}";
    }
}