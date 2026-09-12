const http = require('http');
const constport = process.env.PORT || 10000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot activo');
}).listen(constport);

const mineflayer = require('mineflayer');
require('minecraft-protocol-forge');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'pepe2026.play.hosting',
    username: 'Bot_Antilimbo',
    version: '1.20.1',
    protocol: 'forge'
  });

  bot.on('spawn', () => {
    console.log('Bot conectado al server con mods.');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('kicked', (reason) => {
    console.log('El servidor expulsó al bot:', reason);
  });

  bot.on('end', () => {
    console.log('Desconectado. Reintentando en 5s...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => console.log('Error del bot:', err));
}

createBot();
