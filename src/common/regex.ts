// Password Regex
// At least one upper case letter (?=.*?[A-Z])
// At least one lower case letter (?=.*?[a-z])
// At least one number (?=.*?[0-9])
// At least one special character from the set #?!@$%^&- (?=.?[#?!@$%^&*-])
// A minimum length of 8 characters (minimum length can be changed by modifying {8,} to the desired length).
export const passwordRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';