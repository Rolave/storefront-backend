import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { client } from '../database';

dotenv.config();

const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds } = process.env;

export type User = {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users(username, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds as string)
      );
      const result = await conn.query(sql, [
        user.username,
        user.first_name,
        user.last_name,
        hash,
      ]);
      const newUser = result.rows[0];

      conn.release();

      return newUser;
    } catch (error) {
      throw new Error(`Unable to create user (${user.username}): ${error}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      const users = result.rows;

      conn.release();

      return users;
    } catch (error) {
      throw new Error(`Unable to show the users: ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT id, username, first_name, last_name FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (error) {
      throw new Error(
        `Unable to get information from user id (${id}): ${error}`
      );
    }
  }

  async update(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE users SET username = ($2), first_name = ($3), last_name = ($4), password = ($5) WHERE id = ($1) RETURNING id, username, first_name, last_name';
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds as string)
      );
      const result = await conn.query(sql, [
        user.id,
        user.username,
        user.first_name,
        user.last_name,
        hash,
      ]);
      const updatedUser = result.rows[0];

      conn.release();

      return updatedUser;
    } catch (error) {
      throw new Error(`Unable to update user (${user.username}): ${error}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id = ($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      const deletedUser = result.rows[0];

      conn.release();

      return deletedUser;
    } catch (error) {
      throw new Error(`Unable to delete user (${id}): ${error}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = 'SELECT password FROM users WHERE username = ($1)';
    const result = await conn.query(sql, [username]);

    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }

    conn.release();
    return null;
  }
}
