import fs from 'fs';
import path from 'path';
import { Plugin } from './Plugin';

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();

  constructor(private pluginDir: string) {}

  public async loadPlugins(): Promise<void> {
    if (!fs.existsSync(this.pluginDir)) {
      console.warn(`Plugin directory ${this.pluginDir} does not exist.`);
      return;
    }

    const files = fs.readdirSync(this.pluginDir);
    for (const file of files) {
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        const fullPath = path.join(this.pluginDir, file);
        try {
          const module = require(fullPath);
          const pluginClass = module.default || Object.values(module)[0];
          
          if (typeof pluginClass === 'function') {
            const plugin: Plugin = new (pluginClass as any)();
            if (plugin.init) {
              await plugin.init();
            }
            this.plugins.set(plugin.name, plugin);
            console.log(`Loaded plugin: ${plugin.name} v${plugin.version}`);
          }
        } catch (error) {
          console.error(`Failed to load plugin from ${file}:`, error);
        }
      }
    }
  }

  public getPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }
}
