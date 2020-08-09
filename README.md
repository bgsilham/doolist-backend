# Doolist
Write what you want to do here!

## API Link
`http://54.144.221.209:8100/`

## Stacks
- NodeJS
- ExpressJS
- MySQL

## Dependencies
- [ExpressJs](#ExpressJs) - The server for handling and routing HTTP requests
- [dotenv ](#dotenv) - A zero-dependency module that loads environment variables from a ```.env``` file into ```process.env```
- [Mysql](#Mysql) - NodeJs driver for MySQL
- [body-parser ](#body-parser) - Node.js body parsing middleware
- [JWT](#JWT) - Are an open, industry standard RFC 7519 method for representing claims securely between two parties.
- [Nodemon](#Nodemon) - A tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [CORS](#CORS) - A node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [Moment](#Moment) - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.

## Features
- User management
- Book management
- User review
- JWT token
- Upload image
- Data sorting (search, sort, limit, page)

## Installation
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Setup .env file
4. Create a database with the name doolist, and Import file [doolist.sql](liferary.sql)
5. Run the project with `nodemon` command in your terminal

## End Point
**1. GET**

* `/todos/user/1` (Get todo by user)

**2. POST**

* `/users` (Register user)
    * ``` { "email": "david@mail.com", "password": "secret123"} ```

* `/users/login` (Login user)
    * ``` { "email": "david@mail.com", "password": "secret123"} ```

* `/todos` (Create todo)
    * ``` { "note": "boil water", "user": "1" } ```

**3. PATCH**

* `/todos/1` 
    * ``` { "note": "boil water" } ```
   
**4. DELETE**

* `/todos/1` 


Crafted with love by [Ilham Bagas Saputra](https://instagram.com/ilhambagasaputra)
