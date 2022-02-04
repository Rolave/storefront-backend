# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.
## Data Shapes
#### Product
- id
- name
- price
- category

#### User
- id
- username
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

# API Endpoints
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
          "status": "complete",
          "user_id": 1,
        }

      DELETE '/orders/:id'         -> DELETE / Delete an order by its ID, authentication needed

      POST '/orders/:id/products'  -> ADD PRODUCT / Delete an order by its ID

## Dashboards
### Requests and body parameters

      GET '/five-most-expensive'         -> INDEX / Gets name and price from five more expensive products

      GET '/products-in-orders'          -> INDEX / Gets name, price and order_id from products assigned to an order

      GET '/users-with-orders'           -> SHOW / Gets first_name and last_name from all users wich have orders