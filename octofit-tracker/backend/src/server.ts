import express from 'express';
import { connectDatabase, databaseStatus } from './config/database';
import apiRouter from './routes';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: databaseStatus(), apiBaseUrl });
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
    console.log(`OctoFit API listening at ${apiBaseUrl}`);
  });
}

if (require.main === module) {
  void startServer();
}

export default app;