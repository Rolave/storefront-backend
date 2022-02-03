import { User, UserStore } from '../models';
import { client } from '../database';

const store = new UserStore();

describe('User Model', () => {
  const username = 'illest_tester';
  const user_test = {
    username: 'don_tester',
    first_name: 'Don',
    last_name: 'Tester',
  } as User;
  const password_test = 'password_test';

  beforeAll(async () => {
    const new_user = await store.create({
      ...user_test,
      password: password_test,
    });
    user_test.id = new_user.id;
  });

  afterAll(async () => {
    const conn = await client.connect();
    const sql = 'TRUNCATE TABLE users RESTART IDENTITY CASCADE;';

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

  it('should have an authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('create method should return a new user', async () => {
    const result = await store.create({
      ...user_test,
      password: password_test,
    });

    expect(result).toEqual({
      ...user_test,
      id: result.id,
      password: jasmine.any(String),
    });
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();

    expect(result).toEqual(jasmine.any(Array));
  });

  it('show method should return an user by its id', async () => {
    const result = await store.show(user_test.id as number);

    expect(result).toEqual(user_test);
  });

  it('update method should return an updated user', async () => {
    const { username: _username, ...user_test_values } = user_test;
    const result = (await store.update({
      id: user_test.id,
      username,
      ...user_test_values,
      password: password_test,
    })) as User;

    expect(result).toEqual({
      id: user_test.id,
      username,
      ...user_test_values,
    });
  });

  it('delete method should delete an user by its id', async () => {
    const result = await store.delete(user_test.id as number);

    expect(result).toEqual({
      ...user_test,
      username,
      password: jasmine.any(String),
    });
  });

  it('authenticate method should return null when the password is incorrect', async () => {
    const { username } = user_test;
    const result = (await store.authenticate(
      username,
      'fake_password'
    )) as object;

    expect(result).toBeNull();
  });

  it('authenticate method should return an user when the password is correct', async () => {
    const { username } = user_test;
    const result = (await store.authenticate(
      username,
      password_test
    )) as object;

    expect(result).toEqual({
      password: jasmine.any(String),
    });
  });
});
