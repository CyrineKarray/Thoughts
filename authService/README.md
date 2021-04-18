# Authentication Service

## Installation
1- npm install

2- Set a jwt private key as environement variable in your current directory (where the app.js is located). 

Command used (windows): set authService_jwtPrivateKey=example

3- Run MongoDB using "mongod" command

4- node app.js

## Description
This authentification service api has three endpoints:

1- /auth/register that can register a user with email, username and password. It returns "User already registered." message if the user is already registered, otherwise it returns the whole user object ('_id','username','email').

2- /auth/login that returns a token if the login if successful. An error message otherwise.

3- /auth/isAuthenticated that tests if the user is authenticated or not. You should provide the token in the headers with the attribute 'x-auth-token' as shown in the screenshot below.

Screenshot: https://imgur.com/a/5HXKhOw

