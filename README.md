# RaX Harness

RaX Harness is a simple, open-source AI agent harness that runs locally with a clean web UI. It acts as a plugin-based system where you can easily extend functionalities by adding new tools and behaviors.

## Project Structure

- `backend/`: A TypeScript Express server managing the agent, plugins, and tool execution.
- `frontend/`: A React + Vite frontend using TailwindCSS for the web interface.

## Prerequisites

- Node.js (v16+ recommended)
- npm

## Running Locally

1. **Install Dependencies:**
   First, ensure all dependencies are installed for both the backend and frontend. You can install concurrently at the root level first:
   ```shell
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Start the Development Servers:**
   From the root directory, run the dev script.
   This will start both the backend server (on `http://localhost:3001`) and the Vite frontend server.

## Building for Production

To build both projects, run the build script from package.json.
To start the backend server after building, run the start script.

## Adding Plugins

The system is designed to be easily extensible. To add a new plugin:

1. Navigate to `backend/src/plugins/`.
2. Create a new `.ts` file (e.g., `MyCustomPlugin.ts`).
3. Implement the `Plugin` interface (defined in `backend/src/core/Plugin.ts`):
   ```typescript
   import { Plugin } from '../core/Plugin';
   import { Tool } from '../core/Tool';

   export default class MyCustomPlugin implements Plugin {
     name = 'MyCustomPlugin';
     description = 'Does something awesome';
     version = '1.0.0';

     tools: Tool[] = [
       {
         name: 'myTool',
         description: 'A tool that does exactly what you need',
         execute: async (args: any) => {
           // Your logic here
           return { success: true };
         }
       }
     ];
   }
   ```
4. The backend uses a `PluginManager` that dynamically loads all `.ts` or `.js` files from the `plugins/` directory. Restart the backend, and your new plugin will be automatically loaded and available in the UI.
