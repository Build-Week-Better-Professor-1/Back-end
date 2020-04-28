# Back-end

The API's url is <https://betterprofessorapp.herokuapp.com/>.

### POST `/api/auth/register`

Make a post request to `/api/auth/register` with JSON in the following format:

```
{
	"name": "Schroeder",
	"email": "cats@uni.com",
	"password": "superposition"
}
```

If the registration succeeds, you will receive a response formatted in the
following way:

```
{
  "id": 1,
  "name": "Schroeder",
  "email": "cats@uni.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg4MDI5MTEzLCJleHAiOjE1ODgxMTU1MTN9.ld2n4qMoA09LRYsKD3TLSlETlNHWmovIgMwFkUDodu8"
}
```

Use the `token` field to authorize the user by putting it in the `Authorization`
header.

### POST `/api/auth/login`

Make a post request to `/api/auth/login` with JSON in the following format:

```
{
	"email": "cats@uni.com",
	"password": "superposition"
}
```

If the login succeeds, you will receive a response formatted in the following
way:

```
{
  "id": 1,
  "name": "Schroeder",
  "email": "cats@uni.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg4MDI5MTEzLCJleHAiOjE1ODgxMTU1MTN9.ld2n4qMoA09LRYsKD3TLSlETlNHWmovIgMwFkUDodu8"
}
```

Use the `token` field to authorize the user by putting it in the `Authorization`
header.

### POST `/api/students`

To access this endpoint, you must be logged in. Once you are logged in, you must
set the `Authorization` header to the token.

Make a post request to `/api/students` with JSON in the following format:

```
{
	"name": "Trevor",
	"email": "trevor@example.com"
}
```

If the registration succeeds, you will receive a response formatted in the
following way:

```
{
  "message": "Student successfully added",
  "student": {
    "id": 1,
    "professor_id": 1,
    "name": "Trevor",
    "email": "trevor@example.com"
  }
}
```

### GET `/api/students`

To access this endpoint, you must be logged in. Once you are logged in, you must
set the `Authorization` header to the token.

Make a get request to `/api/students` and you will receive a response formatted in the
following way:

```
{
  "message": "Rendering student list: ",
  "students": [
    {
      "id": 1,
      "professor_id": 1,
      "name": "Trevor",
      "email": "trevor@example.com"
    },
    {
      "id": 2,
      "professor_id": 1,
      "name": "Bob",
      "email": "bob@example.com"
    }
  ]
}
```

### GET /
