import 'dotenv/config';
import { app } from './app';

export const main = async () => {
  const port: number = parseInt(process.env.SERVER_PORT);

  app.listen(port);
};

main();
