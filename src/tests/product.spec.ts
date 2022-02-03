import { Product, ProductStore } from '../models';
import { client } from '../database';

const store = new ProductStore();

describe('Product Model', () => {
  const product_test: Product = {
    name: 'Awesome product',
    price: 1983,
    category: 'Technology',
  };
  const name = 'Super awesome product';

  beforeAll(async () => {
    const new_product = await store.create(product_test);
    product_test.id = new_product.id;
  });

  afterAll(async () => {
    const conn = await client.connect();
    const sql = 'TRUNCATE TABLE products RESTART IDENTITY CASCADE;';

    await conn.query(sql);
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

  it('create method should return a new product', async () => {
    const result = await store.create(product_test);

    expect(result).toEqual({
      ...product_test,
      id: result.id,
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();

    expect(result).toEqual(jasmine.any(Array));
  });

  it('show method should return a product by its id', async () => {
    const result = await store.show(product_test.id as number);

    expect(result).toEqual(product_test);
  });

  it('update method should return an updated product', async () => {
    const result: Product = await store.update({
      ...product_test,
      name,
    });

    expect(result).toEqual({
      ...product_test,
      name,
    });
  });

  it('delete method should delete a product by its id', async () => {
    const result = await store.delete(product_test.id as number);

    expect(result).toEqual({
      ...product_test,
      name,
    });
  });
});
