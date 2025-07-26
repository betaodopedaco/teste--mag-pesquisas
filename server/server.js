require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { launch } = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Configurar modo stealth
launch.use(StealthPlugin());

const app = express();
app.use(cors());
app.use(express.json());

// Rota principal da API
app.post('/api/scrape', async (req, res) => {
  const { niche, region, maxResults = 5 } = req.body;
  
  try {
    console.log(`Iniciando scraping para: ${niche} em ${region}`);
    
    const browser = await launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Configurar User-Agent realista
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Navegar para o Google Maps
    const url = `https://www.google.com/maps/search/${encodeURIComponent(niche)}+${encodeURIComponent(region)}`;
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Esperar resultados carregarem
    await page.waitForSelector('.section-result', { timeout: 15000 });
    
    // Scroll para carregar mais resultados
    await autoScroll(page);
    
    // Extrair dados
    const results = await page.evaluate(() => {
      const items = document.querySelectorAll('.section-result');
      return Array.from(items).map(item => {
        return {
          name: item.querySelector('.section-result-title')?.innerText.trim() || null,
          category: item.querySelector('.section-result-details')?.innerText.trim() || null,
          rating: item.querySelector('.cards-rating-score')?.innerText.trim() || null
        };
      });
    });

    await browser.close();
    
    console.log(`Encontrados ${results.length} resultados`);
    res.json({ success: true, results: results.slice(0, maxResults) });
    
  } catch (error) {
    console.error('Erro no scraping:', error);
    res.status(500).json({ 
      error: 'Erro durante o scraping',
      message: error.message
    });
  }
});

// Função para scroll automático
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 500);
    });
  });
}

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});
