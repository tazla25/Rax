import { useEffect, useState } from 'react';

type PluginData = {
  name: string;
  description: string;
  version: string;
  tools: { name: string, description: string }[];
};

export default function PluginManager() {
  const [plugins, setPlugins] = useState<PluginData[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/plugins')
      .then(res => res.json())
      .then(data => setPlugins(data.plugins || []))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Loaded Plugins</h2>
      {plugins.length === 0 ? (
        <p className="text-gray-500">No plugins loaded.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {plugins.map((p: PluginData) => (
            <div key={p.name} className="border p-3 rounded bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-blue-600">{p.name} <span className="text-sm font-normal text-gray-500">v{p.version}</span></h3>
              </div>
              <p className="text-sm text-gray-700 mb-2">{p.description}</p>
              <div>
                <span className="text-xs font-semibold uppercase text-gray-500">Available Tools:</span>
                <ul className="list-disc pl-5 mt-1">
                  {p.tools.map((t: {name: string, description: string}) => (
                    <li key={t.name} className="text-sm">
                      <span className="font-medium">{t.name}</span> - {t.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
