import { Plugin } from '../core/Plugin';
import { Tool } from '../core/Tool';
import os from 'os';

export default class SystemInfoPlugin implements Plugin {
  name = 'SystemInfo';
  description = 'Get system information';
  version = '1.0.0';

  tools: Tool[] = [
    {
      name: 'platform',
      description: 'platform information',
      execute: async () => {
        return { platform: os.platform(), release: os.release() };
      }
    }
  ];
}
