# Storefront Backend
Project for Udacity's Full Stack JavaScript Developer Nanodegree Program

To get started right away:

### Install

    npm install

### Run the app

    npm start

### Run the tests

    npm run test
## Users
### Requests and body parameters

      POST '/users'        -> CREATE / Creates a new user
        body: {
          "username": "don_tester",
          "first_name": "Don",
          "last_name": "Tester",
          "password": "p4s5w0rD73sT"
        }

      GET '/users'         -> INDEX / Get all users

      GET '/users/:id'     -> SHOW / Get an user by its ID, authentication needit

      PUT '/users/:id'     -> UPDATE / Update user info by its ID, authentication needit
        body: {
          "username": "don_tester",
          "first_name": "Don",
          "last_name": "Tester",
          "password": "p4s5w0rD73sT"
        }

      DELETE '/users/:id'  -> DELETE / Delete an user by its ID, authentication needit

      POST '/users/auth'   -> AUTHENTICATE / Authenticate an user
        body: {
          "username": "don_tester",
          "password": "p4s5w0rD73sT"
        }

