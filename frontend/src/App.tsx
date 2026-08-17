import Chat from './components/Chat';
import PluginManager from './components/PluginManager';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <header className="bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <h1 className="text-2xl font-bold tracking-tight">RaX Harness</h1>
          <span className="ml-4 px-2 py-1 bg-blue-700 rounded text-xs">Open Source AI Agent Platform</span>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 flex gap-6 mt-4">
        <div className="flex-1 flex flex-col">
          <Chat />
        </div>
        <div className="w-80 flex flex-col">
          <PluginManager />
        </div>
      </main>
    </div>
  );
}

export default App;
