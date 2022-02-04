import { Order, OrderStore, User, UserStore } from '../models';
import { client } from '../database';

const store = new OrderStore();
const userStore = new UserStore();

describe('Order Model', () => {
  const user_test: User = {
    username: 'don_tester',
    first_name: 'Don',
    last_name: 'Tester',
    password: 'password_test',
  };
  const order_test: Order = {
    status: 'open',
    user_id: 1,
  };
  const status = 'closed';

  beforeAll(async () => {
    await userStore.create(user_test);
    const new_order = await store.create(order_test);
    order_test.id = new_order.id;
  });

  afterAll(async () => {
    const conn = await client.connect();
    const sql_users = 'TRUNCATE TABLE users RESTART IDENTITY CASCADE;';
    const sql_orders = 'TRUNCATE TABLE orders RESTART IDENTITY CASCADE;';

    await conn.query(sql_users);
    await conn.query(sql_orders);
    conn.release();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should return a new order', async () => {
    const result = await store.create(order_test);

    expect(result).toEqual({
      ...order_test,
      id: result.id,
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();

    expect(result).toEqual(jasmine.any(Array));
  });

  it('show method should return a order by its id', async () => {
    const result = await store.show(order_test.id as number);

    expect(result).toEqual(order_test);
  });

  it('update method should return an updated order', async () => {
    const result: Order = await store.update({
      ...order_test,
      status,
    });

    expect(result).toEqual({
      ...order_test,
      status,
    });
  });

  it('delete method should delete a order by its id', async () => {
    const result = await store.delete(order_test.id as number);

    expect(result).toEqual({
      ...order_test,
      status,
    });
  });
});
