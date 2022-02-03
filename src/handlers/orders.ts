import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models';
import { verifyAuthToken } from '../utilities';

const store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const order = await store.show(id);
    res.json(order);
    console.log('TRY', order);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = req.body;
  try {
    const order: Order = {
      status: 'active',
      user_id,
    };
    const newOrder = await store.create(order);

    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const { status, user_id } = req.body;
  try {
    const order: Order = {
      status,
      user_id,
    };
    const updatedOrder = await store.update(order);
    res.json(updatedOrder);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const deletedOrder = await store.delete(id);

    res.json(deletedOrder);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  const { id: order_id } = req.params;
  const { product_id, quantity } = req.body;
  try {
    const addedProduct = await store.addProduct(
      parseInt(quantity),
      order_id,
      product_id
    );
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

export const orders_routes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.put('/orders/:id', verifyAuthToken, update);
  app.delete('/orders/:id', verifyAuthToken, destroy);
  app.post('/orders/:id/products', addProduct);
};
