import { client } from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      const orders = result.rows;

      conn.release();

      return orders;
    } catch (error) {
      throw new Error(`Unable to show the orders: ${error}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (error) {
      throw new Error(
        `Unable to get information from order id (${id}): ${error}`
      );
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [order.status, order.user_id]);
      const newOrder = result.rows[0];

      conn.release();

      return newOrder;
    } catch (error) {
      throw new Error(`Unable to create order: ${error}`);
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE orders SET status = ($2), user_id = ($3) WHERE id = ($1)  RETURNING *';
      const result = await conn.query(sql, [
        order.id,
        order.status,
        order.user_id,
      ]);
      const updatedOrder = result.rows[0];

      conn.release();

      return updatedOrder;
    } catch (error) {
      throw new Error(`Unable to update order (${order.id}): ${error}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM orders WHERE id = ($1)  RETURNING *';
      const result = await conn.query(sql, [id]);
      const deletedOrder = result.rows[0];

      conn.release();

      return deletedOrder;
    } catch (error) {
      throw new Error(`Unable to delete order id (${id}): ${error}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [orderId]);

      const order = result.rows[0];

      if (order.status !== 'open') {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order id (${orderId}): ${err}`
      );
    }
  }
}
