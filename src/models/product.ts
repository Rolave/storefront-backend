import { client } from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      const newProduct = result.rows[0];

      conn.release();

      return newProduct;
    } catch (error) {
      throw new Error(`Unable to create product (${product.name}): ${error}`);
    }
  }

  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      const products = result.rows;

      conn.release();

      return products;
    } catch (error) {
      throw new Error(`Unable to show the products: ${error}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];

      conn.release();

      return product;
    } catch (error) {
      throw new Error(
        `Unable to get information from product id (${id}): ${error}`
      );
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE products SET name = ($2), price = ($3), category = ($4) WHERE id = ($1)  RETURNING *';
      const result = await conn.query(sql, [
        product.id,
        product.name,
        product.price,
        product.category,
      ]);
      const updatedProduct = result.rows[0];

      conn.release();

      return updatedProduct;
    } catch (error) {
      throw new Error(`Unable to update product (${product.name}): ${error}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM products WHERE id = ($1)  RETURNING *';
      const result = await conn.query(sql, [id]);
      const deletedProduct = result.rows[0];

      conn.release();

      return deletedProduct;
    } catch (error) {
      throw new Error(`Unable to delete product id (${id}): ${error}`);
    }
  }
}
