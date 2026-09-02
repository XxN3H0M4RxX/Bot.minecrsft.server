const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'pepe.play.hosting',
    port: 34777,
    username: 'Bot_AntiLimbo',
    version: '1.20.1' // Ajusta a la versión de tu server
  });

  bot.on('spawn', () => {
    console.log('Bot conectado al server fino.');
    // Salta cada 30 seg para que el server no lo bote por AFK
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