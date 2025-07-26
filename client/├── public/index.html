import React, { useState } from 'react';
import './App.css';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    niche: 'restaurantes',
    region: 'São Paulo',
    maxResults: 5
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      setBusinesses(data.results || []);
    } catch (error) {
      alert(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Google Maps Scraper</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={form.niche}
          onChange={(e) => setForm({...form, niche: e.target.value})}
          placeholder="Tipo de negócio"
        />
        <input
          type="text"
          value={form.region}
          onChange={(e) => setForm({...form, region: e.target.value})}
          placeholder="Localização"
        />
        <input
          type="number"
          value={form.maxResults}
          onChange={(e) => setForm({...form, maxResults: e.target.value})}
          placeholder="Quantidade"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Scrapear'}
        </button>
      </form>

      <div className="results">
        {businesses.map((biz, i) => (
          <div key={i} className="card">
            <h3>{biz.name || 'Sem nome'}</h3>
            <p>Categoria: {biz.category || 'Não informada'}</p>
            <p>Avaliação: {biz.rating || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
