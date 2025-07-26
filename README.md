# 🗺️ Google Maps Scraper Fullstack

Aplicação completa para extração de dados de negócios do Google Maps

## 🚀 Como Executar Localmente

```bash
# Backend
cd server
npm install
npm start

# Frontend (em outro terminal)
cd ../client
npm install
npm start
```

## 🌐 URLs Locais
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## ⚙️ Variáveis de Ambiente
Crie um arquivo `.env` na pasta `server` com:
```env
PORT=3001
```

## 🚄 Deploy no Railway
1. Conecte seu repositório no Railway.app
2. Adicione variáveis:
   - `PORT = 3001`
   - `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = true`
3. Deploy automático!
