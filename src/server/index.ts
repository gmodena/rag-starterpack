import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { RetrieverQueryEngine } from 'llamaindex';
import { createQueryEngine } from './queryEngine.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '../../dist/client/');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(DIST_DIR));

app.use(express.static(DIST_DIR, {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
  }
}));

interface QueryRequest {
  query: string;
}

class ServerError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ServerError';
  }
}

let queryEngine: RetrieverQueryEngine | null = null;

app.post('/query', async (req, res) => {
  try {
    const { query } = req.body as QueryRequest;
    
    if (!query?.trim()) {
      throw new ServerError(400, 'Query is required');
    }
    
    if (!queryEngine) {
      throw new ServerError(503, 'Service not ready');
    }
    
    const response = await queryEngine.query({ query });
    res.json(response);
  } catch (error) {
    const statusCode = error instanceof ServerError ? error.statusCode : 500;
    const message = error instanceof Error ? error.message : 'Internal server error';
    
    console.error('Query error:', error);
    res.status(statusCode).json({ error: message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

async function startServer() {
  try {
    queryEngine = await createQueryEngine();
    
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();