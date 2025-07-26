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
      
      if (!response.ok) throw new Error('Erro no servidor');
      
      const data = await response.json();
      setBusinesses(data.results || []);
    } catch (error) {
      alert(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="App">
      <h1>🛰️ Google Maps Scraper</h1>
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="niche"
          value={form.niche}
          onChange={handleChange}
          placeholder="Tipo de negócio"
          required
        />
        
        <input
          type="text"
          name="region"
          value={form.region}
          onChange={handleChange}
          placeholder="Localização"
          required
        />
        
        <input
          type="number"
          name="maxResults"
          value={form.maxResults}
          onChange={handleChange}
          placeholder="Quantidade"
          min="1"
          max="50"
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? '🔄 Buscando...' : '🔍 Buscar Negócios'}
        </button>
      </form>

      <div className="results">
        {businesses.length > 0 ? (
          businesses.map((biz, i) => (
            <div key={i} className="card">
              <h3>{biz.name || 'Sem nome'}</h3>
              <p><strong>Categoria:</strong> {biz.category || 'Não informada'}</p>
              <p><strong>Avaliação:</strong> {biz.rating ? `⭐ ${biz.rating}` : 'N/A'}</p>
            </div>
          ))
        ) : (
          <p>Nenhum resultado encontrado. Faça uma busca!</p>
        )}
      </div>
      
      <footer>
        <p>Tecnologia <strong>Magnológica</strong> © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
