import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models';
import { verifyAuthToken } from '../utilities';

const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const product = await store.show(id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const { name, price, category } = req.body;
  try {
    const product: Product = {
      name,
      price,
      category,
    };
    const newProduct = await store.create(product);

    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: Product = {
      id: parseInt(req.params.id),
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const updatedProduct = await store.update(product);

    res.json(updatedProduct);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const deletedProduct = await store.delete(id);

    res.json(deletedProduct);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

export const products_routes = (app: express.Application): void => {
  app.post('/products', verifyAuthToken, create);
  app.get('/products', index);
  app.get('/products/:id', show);
  app.put('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', verifyAuthToken, destroy);
};
