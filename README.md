1. User and Role Management APIs
API 1
Path: /api/user/register
Method: POST
Description:

Creates a new user with role and status after validating input fields.

Request
{
  "name": "Prem Kumar",
  "email": "prem@gmail.com",
  "password": "prem1234",
  "role": "ADMIN",
  "status": "active"
}
Response
User registered successfully
API 2
Path: /api/user/register
Method: POST
Description:

Returns error when required fields are missing.

Request
{}
Response
Required fields missing
API 3
Path: /api/user/register
Method: POST
Description:

Returns error when name is missing.

Response
Name is required
API 4
Path: /api/user/register
Method: POST
Description:

Returns error when email is missing.

Response
Email is required
API 5
Path: /api/user/register
Method: POST
Description:

Returns error when email format is invalid.

Response
Invalid email format
API 6
Path: /api/user/register
Method: POST
Description:

Returns error when password is missing.

Response
Password is required
API 7
Path: /api/user/register
Method: POST
Description:

Returns error when password is less than 6 characters.

Response
Password must be at least 6 characters
API 8
Path: /api/user/register
Method: POST
Description:

Returns error when role is missing.

Response
Role is required
API 9
Path: /api/user/register
Method: POST
Description:

Returns error when role is invalid.

Response
Invalid Role
API 10
Path: /api/user/register
Method: POST
Description:

Returns error when status is missing.

Response
Status is required
API 11
Path: /api/user/register
Method: POST
Description:

Returns error when status is invalid.

Response
Invalid status
API 12
Path: /api/user/register
Method: POST
Description:

Returns error when email is already registered.

Response
Email already registered
API 13
Path: /api/user/login
Method: POST
Description:

Authenticates user and returns JWT token.

Request
{
  "email": "prem@gmail.com",
  "password": "prem1234"
}
Response
{
  "jwt_token": "token_here"
}
API 14
Path: /api/user/login
Method: POST
Description:

Returns error when request body is empty.

Request
{}
Response
Required fields missing
API 15
Path: /api/user/login
Method: POST
Description:

Returns error when email is missing.

Response
Email is required
API 16
Path: /api/user/login
Method: POST
Description:

Returns error when email format is invalid.

Response
Invalid email format
API 17
Path: /api/user/login
Method: POST
Description:

Returns error when password is missing.

Response
Password is required
API 18
Path: /api/user/login
Method: POST
Description:

Returns error when user does not exist.

Response
User not found
API 19
Path: /api/user/login
Method: POST
Description:

Returns error when password is incorrect.

Response
Invalid credentials
API 20
Path: /api/user/login
Method: POST
Description:

Returns error when user account is inactive.

Response
User inactive