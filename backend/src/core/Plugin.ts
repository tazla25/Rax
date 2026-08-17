import { Tool } from './Tool';

export interface Plugin {
  name: string;
  description: string;
  version: string;
  tools: Tool[];
  init?: () => Promise<void> | void;
}
