import React, { useState } from 'react';
import axios from 'axios';

export const BusquedaChatGPT = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:3001/api/chat', {
        prompt: prompt,
      });

      setResponse(result.data.message);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };

  return (
    <div>
      <h1>Chat con GPT</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Escribe tu pregunta"
        />
        <button type="submit">Enviar</button>
      </form>
      {response && (
        <div>
          <h2>Respuesta de GPT:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};
