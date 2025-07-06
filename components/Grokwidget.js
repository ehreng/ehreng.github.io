// components/GrokWidget.js
import { useState } from 'react';

export default function GrokWidget() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/grok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      });
      const data = await res.json();
      setResponse(data.answer);
    } catch (err) {
      setResponse('Error contacting Grok.');
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Ask Grok about Venus..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          padding: '0.75rem 1rem',
          width: '60%',
          maxWidth: '400px',
          fontSize: '1rem',
          borderRadius: '5px',
          marginRight: '1rem',
        }}
      />
      <button
        onClick={handleAsk}
        style={{
          background: '#0ff',
          border: 'none',
          color: 'black',
          fontWeight: 'bold',
          padding: '0.75rem 1.5rem',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        disabled={loading || !input}
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>
      {response && (
        <div style={{ marginTop: '1rem', maxWidth: '600px', margin: '1rem auto', fontStyle: 'italic' }}>
          {response}
        </div>
      )}
    </div>
  );
}
