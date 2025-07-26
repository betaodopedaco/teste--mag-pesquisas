require('dotenv').config();
const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const chromium = require('@sparticuz/chromium');

// Configurar modo stealth
puppeteer.use(StealthPlugin());

const app = express();
app.use(cors());
app.use(express.json());

// Rota principal da API
app.post('/api/scrape', async (req, res) => {
  const { niche, region, maxResults = 5 } = req.body;
  
  try {
    console.log(`Iniciando scraping para: ${niche} em ${region}`);
    
    const browser = await puppeteer.launch({
      headless: true,
      args: chromium.args,
      executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath(),
      ignoreHTTPSErrors: true
    });

    // Restante do seu código permanece igual...
    const page = await browser.newPage();
    
    // ... (seu código existente)

  } catch (error) {
    console.error('Erro no scraping:', error);
    res.status(500).json({ 
      error: 'Erro durante o scraping',
      message: error.message
    });
  }
});

// ... (restante do seu código)
