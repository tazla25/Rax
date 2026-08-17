import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { PluginManager } from './core/PluginManager';
import { Agent } from './core/Agent';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
const pluginsDir = path.join(__dirname, 'plugins');

const pluginManager = new PluginManager(pluginsDir);
let agent: Agent;

async function bootstrap() {
  await pluginManager.loadPlugins();
  agent = new Agent(pluginManager);

  app.get('/api/plugins', (req, res) => {
    const plugins = pluginManager.getPlugins().map(p => ({
      name: p.name,
      description: p.description,
      version: p.version,
      tools: p.tools.map(t => ({ name: t.name, description: t.description }))
    }));
    res.json({ plugins });
  });

  app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) {
       return res.status(400).json({ error: 'Message is required' });
    }
    
    try {
      const response = await agent.processQuery(message);
      res.json({ response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.listen(port, () => {
    console.log(`RaX Harness backend running at http://localhost:${port}`);
  });
}

bootstrap();
