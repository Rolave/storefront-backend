import { app } from './app';

const port = process.env.port || 3000;
const address = `0.0.0.0:${port}`;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`starting app on: ${address}`);
});
