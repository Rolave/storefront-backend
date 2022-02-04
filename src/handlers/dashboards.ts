import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

const getFiveMostExpensive = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await dashboard.getFiveMostExpensive();

    res.json(products);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const getProductsInOrders = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await dashboard.getProductsInOrders();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const getUsersWithOrders = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await dashboard.getUsersWithOrders();

    res.json(users);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

export const dashboards_routes = (app: express.Application): void => {
  app.get('/five-most-expensive', getFiveMostExpensive);
  app.get('/products-in-orders', getProductsInOrders);
  app.get('/users-with-orders', getUsersWithOrders);
};
