import express, { Application } from 'express';
import bodyParser from 'body-parser';
import {
  dashboards_routes,
  orders_routes,
  products_routes,
  users_routes,
} from './handlers';

export const app: Application = express();

app.use(bodyParser.json());
dashboards_routes(app);
orders_routes(app);
products_routes(app);
users_routes(app);
