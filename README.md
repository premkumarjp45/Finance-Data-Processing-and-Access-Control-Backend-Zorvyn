# 1. User and Role Management APIs

---

### API 1

#### Path: `/api/user/register`

#### Method: `POST`

#### Description:

Creates a new user with role and status after validating input fields.

#### Request

```
{
  "name": "Prem Kumar",
  "email": "prem@gmail.com",
  "password": "prem1234",
  "role": "ADMIN",
  "status": "active"
}
```

#### Response

```
User registered successfully
```

---

### API 2

#### Path: `/api/user/register`

#### Method: `POST`

#### Description:

Returns error when required fields are missing.

#### Request

```
{}
```

#### Response

```
Required fields missing
```

---

### API 3

#### Path: `/api/user/register`

#### Method: `POST`

#### Description:

Returns error when name is missing.

#### Response

```
Name is required
```

---

### API 4

#### Path: `/api/user/register`

#### Method: `POST`

#### Description:

Returns error when email is missing.

#### Response

```
Email is required
```

---

### API 5

#### Path: `/api/user/register`

#### Method: `POST`

#### Description:

Returns error when email format is invalid.

#### Response

```
Invalid email format
```

---

### API 6

#### Path: `/api/user/register`

#### Method: `POST`

#### Description:

Returns error when password is missing.

#### Response

```
Password is required
```

---

### API 7

#### Path: `/api/user/register`

#### Method: `POST`

#### Description:

Returns error when password is less than 6 characters.

#### Response

```
Password must be at least 6 characters
```

---

### API 8

#### Path: `/api/user/register`

#### Method: `POST`

#### Description:

Returns error when role is missing.

#### Response

```
Role is required
```

---

### API 9

#### Path: `/api/user/register`

#### Method: `POST`

#### Description:

Returns error when role is invalid.

#### Response

```
Invalid Role
```

---

### API 10

#### Path: `/api/user/register`

#### Method: `POST`

#### Description:

Returns error when status is missing.

#### Response

```
Status is required
```

---

### API 11

#### Path: `/api/user/register`

#### Method: `POST`

#### Description:

Returns error when status is invalid.

#### Response

```
Invalid status
```

---

### API 12

#### Path: `/api/user/register`

#### Method: `POST`

#### Description:

Returns error when email is already registered.

#### Response

```
Email already registered
```

---

### API 13

#### Path: `/api/user/login`

#### Method: `POST`

#### Description:

Authenticates user and returns JWT token.

#### Request

```
{
  "email": "prem@gmail.com",
  "password": "prem1234"
}
```

#### Response

```
{
  "jwt_token": "token_here"
}
```

---

### API 14

#### Path: `/api/user/login`

#### Method: `POST`

#### Description:

Returns error when request body is empty.

#### Request

```
{}
```

#### Response

```
Required fields missing
```

---

### API 15

#### Path: `/api/user/login`

#### Method: `POST`

#### Description:

Returns error when email is missing.

#### Response

```
Email is required
```

---

### API 16

#### Path: `/api/user/login`

#### Method: `POST`

#### Description:

Returns error when email format is invalid.

#### Response

```
Invalid email format
```

---

### API 17

#### Path: `/api/user/login`

#### Method: `POST`

#### Description:

Returns error when password is missing.

#### Response

```
Password is required
```

---

### API 18

#### Path: `/api/user/login`

#### Method: `POST`

#### Description:

Returns error when user does not exist.

#### Response

```
User not found
```

---

### API 19

#### Path: `/api/user/login`

#### Method: `POST`

#### Description:

Returns error when password is incorrect.

#### Response

```
Invalid credentials
```

---

### API 20

#### Path: `/api/user/login`

#### Method: `POST`

#### Description:

Returns error when user account is inactive.

#### Response

```
User inactive
```

---

# Summary

```
Total User APIs = 20

Covers:
- Registration
- Login
- Validation
- Edge cases
- Security scenarios
```



# 2. Financial Records Management APIs

---

### API 1

#### Path: `/api/finance/create-record`

#### Method: `POST`

#### Description:

Creates a new financial record. Only Admin can create records.

#### Request

```
{
  "amount": 5000,
  "type": "INCOME",
  "category": "SALARY",
  "description": "Monthly salary"
}
```

#### Response

```
Record created successfully
```

---

### API 2

#### Path: `/api/finance/create-record`

#### Method: `POST`

#### Description:

Returns error when required fields are missing.

#### Response

```
Required fields missing
```

---

### API 3

#### Path: `/api/finance/create-record`

#### Method: `POST`

#### Description:

Returns error when amount is missing.

#### Response

```
Required amount
```

---

### API 4

#### Path: `/api/finance/create-record`

#### Method: `POST`

#### Description:

Returns error when type is invalid.

#### Response

```
Invalid type
```

---

### API 5

#### Path: `/api/finance/records`

#### Method: `GET`

#### Description:

Returns all financial records of the logged-in user.

#### Response

```
[
  {
    "id": "recordId",
    "amount": 5000,
    "type": "INCOME",
    "category": "SALARY",
    "description": "Monthly salary"
  }
]
```

---

### API 6

#### Path: `/api/finance/records`

#### Method: `GET`

#### Description:

Returns error when records are not found.

#### Response

```
Records not found
```

---

### API 7

#### Path: `/api/finance/record/:recordId`

#### Method: `GET`

#### Description:

Returns a single financial record.

#### Response

```
{
  "id": "recordId",
  "amount": 5000,
  "type": "INCOME",
  "category": "SALARY",
  "description": "Monthly salary"
}
```

---

### API 8

#### Path: `/api/finance/record/:recordId`

#### Method: `GET`

#### Description:

Returns error when record is not found.

#### Response

```
Record not found
```

---

### API 9

#### Path: `/api/finance/record/:recordId`

#### Method: `PUT`

#### Description:

Updates a financial record. Only Admin can update.

#### Request

```
{
  "amount": 6000
}
```

#### Response

```
Record updated successfully
```

---

### API 10

#### Path: `/api/finance/record/:recordId`

#### Method: `PUT`

#### Description:

Returns error when no fields are provided.

#### Response

```
Required fields missing
```

---

### API 11

#### Path: `/api/finance/record/:recordId`

#### Method: `PUT`

#### Description:

Returns error when record is not found.

#### Response

```
Record not found
```

---

### API 12

#### Path: `/api/finance/record/:recordId`

#### Method: `DELETE`

#### Description:

Deletes a financial record. Only Admin can delete.

#### Response

```
Record deleted successfully
```

---

### API 13

#### Path: `/api/finance/record/:recordId`

#### Method: `DELETE`

#### Description:

Returns error when record is not found.

#### Response

```
Record not found
```

---


### API 14

#### Path: `/api/finance/record/:recordId`

#### Method: `PUT`

#### Description:

Updates financial record fields based on provided input. Only Admin can update records.

---

### Scenario 1: No fields provided

#### Request

```
{}
```

#### Response

```
Required fields missing
```

---

### Scenario 2: Update all fields

#### Request

```
{
  "amount": 5000,
  "type": "INCOME",
  "category": "SALARY",
  "description": "Monthly salary"
}
```

#### Response

```
Record updated amount,type,category and description successfully
```

---

### Scenario 3: Invalid type (with all fields)

#### Request

```
{
  "amount": 5000,
  "type": "INVALID",
  "category": "SALARY",
  "description": "Monthly salary"
}
```

#### Response

```
Invalid type
```

---

### Scenario 4: Update amount + type

#### Request

```
{
  "amount": 4000,
  "type": "EXPENSE"
}
```

#### Response

```
Record updated amount,type successfully
```

---

### Scenario 5: Update amount + category

#### Request

```
{
  "amount": 3000,
  "category": "FOOD"
}
```

#### Response

```
Record updated amount,category successfully
```

---

### Scenario 6: Update amount + description

#### Request

```
{
  "amount": 2000,
  "description": "Lunch"
}
```

#### Response

```
Record updated amount,description successfully
```

---

### Scenario 7: Update type + category

#### Request

```
{
  "type": "EXPENSE",
  "category": "TRAVEL"
}
```

#### Response

```
Record updated type,category successfully
```

---

### Scenario 8: Update type + description

#### Request

```
{
  "type": "INCOME",
  "description": "Bonus"
}
```

#### Response

```
Record updated type,description successfully
```

---

### Scenario 9: Invalid type (partial update)

#### Request

```
{
  "type": "WRONG"
}
```

#### Response

```
Invalid type
```

---

### Scenario 10: Update category + description

#### Request

```
{
  "category": "FOOD",
  "description": "Dinner"
}
```

#### Response

```
Record updated category,description successfully
```

---

### Scenario 11: Update only amount

#### Request

```
{
  "amount": 6000
}
```

#### Response

```
Record updated amount successfully
```

---

### Scenario 12: Update only type

#### Request

```
{
  "type": "INCOME"
}
```

#### Response

```
Record updated type successfully
```

---

### Scenario 13: Update only category

#### Request

```
{
  "category": "ENTERTAINMENT"
}
```

#### Response

```
Record updated category successfully
```

---

### Scenario 14: Update only description

#### Request

```
{
  "description": "Movie"
}
```

#### Response

```
Record updated description successfully
```

---

### Scenario 15: Record not found

#### Description:

If record does not exist for given ID

#### Response

```
Record not Found
```

---

### Scenario 16: Invalid record ID

#### Description:

If record ID format is invalid

#### Response

```
Invalid record id
```

---

### Scenario 17: Missing JWT Token

#### Response

```
Missing JWT Token
```

---

### Scenario 18: Non-Admin Access

#### Response

```
Access denied. Admin only
```

---

# Summary

```
Total Update Scenarios: 18
Covers:
- Full update
- Partial update combinations
- Validation errors
- Authorization errors
- Edge cases
```




