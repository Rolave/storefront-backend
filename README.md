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

      GET '/users/:id'     -> SHOW / Get an user by its ID, authentication needed

      PUT '/users/:id'     -> UPDATE / Update user info by its ID, authentication needed
        body: {
          "username": "don_tester",
          "first_name": "Don",
          "last_name": "Tester",
          "password": "p4s5w0rD73sT"
        }

      DELETE '/users/:id'  -> DELETE / Delete an user by its ID, authentication needed

      POST '/users/auth'   -> AUTHENTICATE / Authenticate an user
        body: {
          "username": "don_tester",
          "password": "p4s5w0rD73sT"
        }
## Products
### Requests and body parameters

      POST '/products'        -> CREATE / Creates a new product
        body: {
          "name": "Awesome product",
          "price": 1983,
          "category": "Technology"
        }

      GET '/products'         -> INDEX / Get all products

      GET '/products/:id'     -> SHOW / Get an product by its ID

      PUT '/products/:id'     -> UPDATE / Update product info by its ID, authentication needed
        body: {
          "name": "Super awesome product",
          "price": 1983,
          "category": "Technology"
        }

      DELETE '/products/:id'  -> DELETE / Delete an product by its ID, authentication needed

## Orders
### Requests and body parameters

      POST '/orders'               -> CREATE / Creates a new order
        body: {
          "user_id": 1,
        }

      GET '/orders'                -> INDEX / Get all orders

      GET '/orders/:id'            -> SHOW / Get an order by its ID

      PUT '/orders/:id'            -> UPDATE / Update order info by its ID, authentication needed
        body: {
          "status": "closed",
          "user_id": 1,
        }

      DELETE '/orders/:id'         -> DELETE / Delete an order by its ID, authentication needed

      POST '/orders/:id/products'  -> ADD PRODUCT / Delete an order by its ID

## Dashboards
### Requests and body parameters

      GET '/five-most-expensive'         -> INDEX / Gets name and price from five more expensive products

      GET '/products-in-orders'          -> INDEX / Gets name, price and order_id from products assigned to an order

      GET '/users-with-orders'           -> SHOW / Gets first_name and last_name from all users wich have orders
