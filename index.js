const http = require('http');
const constport = process.env.PORT || 10000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot activo');
}).listen(constport);

const mineflayer = require('mineflayer');
const { forgeHandshake } = require('mineflayer-forge'); // <--- 1. Importas el plugin de Forge

function createBot() {
  const bot = mineflayer.createBot({
    host: 'pepe2026.play.hosting',
    username: 'Bot_AntiLimbo',
    version: '1.20.1'
  });

  forgeHandshake(bot); // <--- 2. Activas el handshake aquí para aceptar los mods de TACZ

  bot.on('spawn', () => {
    console.log('Bot conectado al server fino.');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Desconectado. Reintentando en 5s...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => console.log('Error del bot:', err));
}

createBot();
