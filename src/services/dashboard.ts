import { client } from '../database';

export class DashboardQueries {
  async getFiveMostExpensive(): Promise<{ name: string; price: number }[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable get products by price: ${err}`);
    }
  }

  async getProductsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.id';
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable get products and orders: ${err}`);
    }
  }

  async getUsersWithOrders(): Promise<
    { firstName: string; lastName: string }[]
  > {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id';
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable get users with orders: ${err}`);
    }
  }
}
