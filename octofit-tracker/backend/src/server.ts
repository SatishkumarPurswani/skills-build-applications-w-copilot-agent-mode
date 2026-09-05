import express from 'express';
import { connectDatabase, databaseStatus } from './config/database';
import apiRouter from './routes';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: databaseStatus() });
});

app.use('/api', apiRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(400).json({ error: 'Request could not be completed' });
});

export async function startServer(): Promise<void> {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('Database unavailable:', error);
  }

  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
}

if (require.main === module) {
  void startServer();
}

export default app;