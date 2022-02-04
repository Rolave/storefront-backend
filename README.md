# Storefront Backend
Project for Udacity's Full Stack JavaScript Developer Nanodegree Program

To get started right away.
### Install

    npm install

### Run the app

    npm start

### Run the tests

    npm run test
### Environment variables
You should set all the proyect values on a .env file.
```
ENV=dev
PORT=3000
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_db
POSTGRES_DB_TEST=storefront_db_test
POSTGRES_USER=storefront_admin
POSTGRES_TEST_USER=storefront_admin_test
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD=pepper123
SALT_ROUNDS=10
SECRET_TOKEN=my_secret_token
```
## Server port
    0.0.0.0:3000

## Create Development Database

    CREATE DATABASE storefront_db;
## Create User for Development Database

    CREATE USER storefront_admin WITH ENCRYPTED PASSWORD 'password123';
    GRANT ALL PRIVILEGES ON DATABASE storefront_db TO storefront_admin;
## Create Test Database

    CREATE DATABASE storefront_db_test;
## Create User for Test Database

    CREATE USER storefront_admin_test WITH ENCRYPTED PASSWORD 'password123';
    GRANT ALL PRIVILEGES ON DATABASE storefront_db_test TO storefront_admin_test;

## Database Port
    127.0.0.1
## Database Migrations
After creating the data and user, you must run the migrations, so that generate the tables that are needed in this API.

### Bring the migration up 
      db-migrate up
### Bring the migration down
      db-migrate down
