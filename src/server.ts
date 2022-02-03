import { app } from './app';

const port = process.env.port || 3000;
const address: string = `0.0.0.0:${port}`;

app.listen(port, () => {
  console.log(`starting app on: ${address}`);
});
