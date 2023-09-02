const Discord = require('discord.js');
const { Intents } = require('discord.js');
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Токен вашего бота Discord
const token = 'MTEwNTgwNDE2Nzk0MDk1MjA2NA.GwZCN-.BvGLnKZEYZl-iBJzwav8FaC1_iLcYGF5StPTVA';

// Ваше сообщение, которое будет отправлено каждый день
const messageContent = 'Привет, я бот!';

// Функция для отправки сообщения
function sendMessage() {
  const channel = client.channels.cache.get('1103283012755542046'); // Замените CHANNEL_ID на ID канала, в который хотите отправить сообщение

  if (!channel) {
    console.error('Неверный ID канала!');
    return;
  }

  channel.send(messageContent)
    .then(() => console.log('Сообщение успешно отправлено!'))
    .catch(console.error);
}

client.once('ready', () => {
  console.log('Бот готов к работе!');

  // Задержка перед отправкой первого сообщения (в миллисекундах)
  const delay = 24 * 60 * 60 * 1000; // 24 часа
  setTimeout(() => {
    sendMessage();
    setInterval(sendMessage, delay);
  }, delay - (Date.now() % delay));
});

client.login(token);
