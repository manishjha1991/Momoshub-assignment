
 # Momoshub-assignment

Node.js Role Based Authorization API

```
Start App :
    1.Install Nodejs
    2.Install Npm
    3.Install Mongodb 
    4.npm install
    5.npm start
    
```


**Step 1 -> Create Admin from Below Curl call Because without creating Admin you will not able to Create normal user**

```
curl --location --request POST 'localhost:4000/users/register-admin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Manish",
    "lastName": "Jha",
    "username": "manish",
    "password": "123456",
    "role":"Admin"
}'
```

**Step 2 -> Call Authenticate Api to get jwt token and pass that token to each and every request to verify request and authorize that request is coming from Admin only to Create User or Get restricted information from another endpoint.**

```
curl --location --request POST 'localhost:4000/users/authenticate' \
--header 'Content-Type: application/json' \
--data-raw '{"username": "manish", "password": "123456"}'

```

**Step 3 ->Create Normal User Via Admin only(Pass Admin based taken that you will get with authentication api) if you try to pass with user based token that you will get from authentication api then you will not able to create User.(Try authenticate with normal user and get that token and pass to create user api you will see error resposne)**

```
curl --location --request POST 'localhost:4000/users/register' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDU4NDZjNTMxNWRiMjQ5MTc3NTY3NWUiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2MTYzOTg0OTAsImV4cCI6MTYxNzAwMzI5MH0.RT7NM6KMQwX-Jfp-EsK9S4ZZbc0tX0AsR3PYG-JTEHM' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Test",
    "lastName": "One",
    "username": "test",
    "password": "123456",
    "role":"User"
}'

```

**Step 4 -> To Get All user infomration via Admin only(Pass admin token only)**

```
curl --location --request GET 'localhost:4000/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDU4NDZjNTMxNWRiMjQ5MTc3NTY3NWUiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2MTYzOTkwMDQsImV4cCI6MTYxNzAwMzgwNH0.aotvcdw5zE8NFK0gpGtvZAQWoamM021Ocn4XfF4etqw'

```

**Step 4 -> To Get Other user infomration via Admin only(Pass admin token only) u cant see other user information if you are not logged in with Admin permission**

```
curl --location --request GET 'localhost:4000/users/605846c5315db2491775675e' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDU4NDZjNTMxNWRiMjQ5MTc3NTY3NWUiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2MTYzOTkwMDQsImV4cCI6MTYxNzAwMzgwNH0.aotvcdw5zE8NFK0gpGtvZAQWoamM021Ocn4XfF4etqw' \
--data-raw ''

```
