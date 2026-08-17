"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
class Agent {
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
    }
    processQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const plugins = this.pluginManager.getPlugins();
            let allTools = [];
            plugins.forEach(p => allTools.push(...p.tools));
            // Simple keyword-based routing for tools (Mock AI behavior)
            for (const tool of allTools) {
                if (query.toLowerCase().includes(tool.name.toLowerCase()) || 
                    query.toLowerCase().includes(tool.description.toLowerCase().split(' ')[0])) {
                    try {
                        const result = yield tool.execute({ query });
                        return `Using ${tool.name}:\n${JSON.stringify(result)}`;
                    } catch (e) {
                        return `Error executing tool ${tool.name}: ${e}`;
                    }
                }
            }
            return `I am RaX Agent. I have ${plugins.length} plugins loaded with ${allTools.length} tools total. You said: "${query}". I couldn't find a specific tool for this.`;
        });
    }
}
exports.Agent = Agent;
