CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price FLOAT(2) NOT NULL,
    category VARCHAR(100) NOT NULL
);
