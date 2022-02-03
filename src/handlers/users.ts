import { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../utilities';
import { User, UserStore } from '../models';

dotenv.config();

const store = new UserStore();
const { SECRET_TOKEN: secretToken } = process.env;

const create = async (req: Request, res: Response): Promise<void> => {
  const { username, first_name, last_name, password } = req.body;
  const user: User = {
    username,
    first_name,
    last_name,
    password,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ newUser }, secretToken as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json({ err, user });
  }
};

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const user = await store.show(id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = {
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };
    const updatedUser = await store.update(user);
    res.send(updatedUser);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const deletedUser = await store.delete(id);
    res.send(deletedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const authUser = await store.authenticate(username, password);
    const token = jwt.sign({ user: authUser }, secretToken as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

export const users_routes = (app: Application) => {
  app.post('/users', create);
  app.get('/users', index);
  app.get('/users/:id', show);
  app.put('/users/:id', verifyAuthToken, update);
  app.delete('/users/:id', verifyAuthToken, destroy);
  app.post('/users/auth', authenticate);
};
