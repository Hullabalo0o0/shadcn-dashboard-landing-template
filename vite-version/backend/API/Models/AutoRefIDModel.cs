namespace MyAPI.Services;

public static class AutoRefIDModel
{
    public static readonly Dictionary<string, RefIdConfig> Rules = new()
    {
        ["USR"] = new RefIdConfig("user_tbl", "RefID", "USR")
    };
}

public record RefIdConfig(
    string TableName,
    string ColumnName,
    string Prefix
);