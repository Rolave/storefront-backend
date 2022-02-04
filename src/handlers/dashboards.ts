import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

const fiveMostExpensive = async (_req: Request, res: Response) => {
  const users = await dashboard.fiveMostExpensive();
  res.json(users);
};

const usersWithOrders = async (_req: Request, res: Response) => {
  const users = await dashboard.usersWithOrders();
  res.json(users);
};

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders();
  res.json(products);
};

export const dashboards_routes = (app: express.Application): void => {
  app.get('/five-most-expensive', fiveMostExpensive);
  app.get('/products-in-orders', productsInOrders);
  app.get('/users-with-orders', usersWithOrders);
};
