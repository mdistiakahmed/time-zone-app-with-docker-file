package com.istiak.timezone.constants;

public interface ErrorMessageConstants {
    // Time zone error messages
    String TIMEZONE_DELETE_PERMISSION = "User doesn't have permission to delete";
    String TIMEZONE_NOT_EXIST = "This timezone doesn't exist";
    String TIMEZONE_ALREADY_EXIST = "TimeZone with same name already present. Use different name";
    String TIMEZONE_INVALID_DATA = "Invalid time zone data";
    String TIMEZONE_NAME_EMPTY = "Name can not be empty or only spaces";
    String TIMEZONE_CITY_EMPTY = "City can not be empty or only spaces";
    String TIMEZONE_HOUR_RANGE = "Hour Difference should be between -14 to 12";
    String TIMEZONE_MINUTE_RANGE = "Minute Difference should be between 0 to 59";

    // user error messages
    String USER_ACCOUNT_ALREADY_EXISTS = "Account with this email already exists";
    String USER_ACCOUNT_NOT_EXISTS = "Account with this email does not exists";
    String USER_INVALID_DATA = "User data is invalid";
    String USER_INVALID_EMAIL = "Email is not valid.";
    String USER_INVALID_PASSWORD = "Password must be between 6 to 20 characters long.";
    String USER_OWN_DATA_MODIFY = "Can't modify own data";
}
