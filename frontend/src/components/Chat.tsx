import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev: {sender: string, text: string}[]) => [...prev, { sender: 'User', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await response.json();
      setMessages((prev: {sender: string, text: string}[]) => [...prev, { sender: 'RaX Agent', text: data.response }]);
    } catch (error) {
      setMessages((prev: {sender: string, text: string}[]) => [...prev, { sender: 'System', text: 'Error connecting to backend.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3 min-h-[300px]">
        {messages.length === 0 && (
          <div className="text-gray-400 text-center mt-10">Start chatting with RaX Agent...</div>
        )}
        {messages.map((msg: {sender: string, text: string}, i: number) => (
          <div key={i} className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'User' ? 'bg-blue-600 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}>
            <span className="text-xs font-bold block mb-1 opacity-70">{msg.sender}</span>
            <span className="whitespace-pre-wrap">{msg.text}</span>
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm ml-2">Agent is typing...</div>}
      </div>
      <div className="p-3 border-t flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask something..."
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
