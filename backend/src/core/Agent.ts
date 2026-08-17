import { PluginManager } from './PluginManager';

export class Agent {
  constructor(private pluginManager: PluginManager) {}

  public async processQuery(query: string): Promise<string> {
    const plugins = this.pluginManager.getPlugins();
    let allTools: any[] = [];
    plugins.forEach(p => allTools.push(...p.tools));

    // Simple keyword-based routing for tools (Mock AI behavior)
    for (const tool of allTools) {
      if (query.toLowerCase().includes(tool.name.toLowerCase()) || 
          query.toLowerCase().includes(tool.description.toLowerCase().split(' ')[0])) {
        try {
           const result = await tool.execute({ query });
           return `Using ${tool.name}:\n${JSON.stringify(result)}`;
        } catch (e) {
           return `Error executing tool ${tool.name}: ${e}`;
        }
      }
    }

    return `I am RaX Agent. I have ${plugins.length} plugins loaded with ${allTools.length} tools total. You said: "${query}". I couldn't find a specific tool for this.`;
  }
}
