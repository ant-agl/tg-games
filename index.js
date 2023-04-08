const TelegramApi = require("node-telegram-bot-api");

const TOKEN = "5704264589:AAERgeP1DoZWvVqX4LGnKk2gput_gOnQfAU";

const bot = new TelegramApi(TOKEN, { polling: true });

const stickersHy = [
  "CAACAgIAAxkBAAEIbl9kKc6SZRAB0E8PshHCo1SlQM24ZAACdgsAAi8P8AbH0wunOwbMXi8E",
  "CAACAgIAAxkBAAEIgzRkMdVuQdfLHoxP7EEF1a0xrP3ErgACOAMAAs-71A43zgaKKQqPbS8E",
  "CAACAgIAAxkBAAEIgzZkMdV9jGJR5CNr07UajoKgEYnaBgACSgMAAs-71A5eHOsvbWT29y8E",
  "CAACAgIAAxkBAAEIgzhkMdXXqMepROGMSuW5h0nzTIGOYAACPAADwDZPE9eVZhJ0WTE5LwQ",
  "CAACAgIAAxkBAAEIgzpkMdXi4q1rlvYlCsqF2NdbZmNYjQACvgEAAhZCawqtjbpyIClJ1C8E",
  "CAACAgIAAxkBAAEIgzxkMdXwgAABrcKs4DFqajVP3Gq5XloAAlUCAAJWnb0KrEssgk-jFd8vBA",
  "CAACAgIAAxkBAAEIgz5kMdX8xOpo6vNXBqUpb55Ilw2f9gAC0wADVp29CvUyj5fVEvk9LwQ",
  "CAACAgIAAxkBAAEIg0BkMdYS2Xh2BX3FixqUoV8jOqBPyQACbwADwZxgDMsOfYvA3U1WLwQ",
  "CAACAgIAAxkBAAEIg0JkMdYf78xj9jB4n41B-Tdm70_hAQAC2A8AAkjyYEsV-8TaeHRrmC8E",
  "CAACAgIAAxkBAAEIg0RkMdY-Y9NFHv1w3TCQuuxKAAHQTfEAAlQAA0G1Vgxqt_jHCI0B-i8E",
];
const stickersPlay = [
  "CAACAgIAAxkBAAEIbmFkKc6_Ob806ZD3qlQ1UI7XWaHpAwACZwsAAi8P8AZEB7odlreLly8E",
  "CAACAgIAAxkBAAEIg0ZkMdahiCWPdR8uwA8zEVMcwFfE0QACIgIAAladvQoWnIBwuI2eCi8E",
  "CAACAgIAAxkBAAEIg0hkMdbvM3u0BNYHBS7QHW47KRmLoAAC8wEAApb6EgVp-ZJeRE0VdC8E",
  "CAACAgEAAxkBAAEIg0pkMdb_JIVMK0VHMEUyatwyxxgq6gACDQADXLJBT6sdhC8SR51pLwQ",
  "CAACAgIAAxkBAAEIg0xkMdceJs2LyYI5pm7dqiXozF_fcAACPQADDbbSGa8UnEXVDgHzLwQ",
  "CAACAgIAAxkBAAEIg05kMdchcSkv-YPXSkdhLBRXoad7QwACOgADDbbSGReRh2EuIXGBLwQ",
  "CAACAgIAAxkBAAEIg1BkMddAZ0enw5mLxgh2CchwgZ9bLQACZAkAAgi3GQITUrVNl2Qf8C8E",
  "CAACAgIAAxkBAAEIg1JkMddSQhSKJApPbqlfOXrdKyUJ1wACdgcAApb6EgWCi_CTmGpeuC8E",
  "CAACAgIAAxkBAAEIg1lkMdd-flWPMyshoph_Si7uxxIvLQACdwEAAgeGFQfg4yKYEeHboS8E",
  "CAACAgIAAxkBAAEIg1tkMdeV1e95m5BqwNT29i0bi59x9QACbQEAAgeGFQfadHKlB3PdJC8E",
];

const games = [
  {
    id: "Ya1",
    name: "Hunter Assassin",
    link: "https://yandex.ru/games/app/168142",
  },
  {
    id: "Ya2",
    name: "Шахматы",
    link: "https://yandex.ru/games/app/165384",
  },
  {
    id: "Ya3",
    name: "Cut the Rope2",
    link: "https://yandex.ru/games/app/151508",
  },
  {
    id: "Ya4",
    name: "Park My Car!",
    link: "https://yandex.ru/games/app/219246",
  },
  {
    id: "Ya5",
    name: "Морской Бой классический",
    link: "https://yandex.ru/games/app/214025",
  },
  {
    id: "Ya6",
    name: "Сапёр Мания",
    link: "https://yandex.ru/games/app/102170",
  },
  {
    id: "Ya7",
    name: "Битва за территории",
    link: "https://yandex.ru/games/app/191972",
  },
  {
    id: "Ya8",
    name: "Paint.io",
    link: "https://yandex.ru/games/app/186214",
  },
  {
    id: "Ya9",
    name: "Mini Shooters",
    link: "https://yandex.ru/games/app/178620",
  },
  {
    id: "Ya10",
    name: "FIFA World Cup 2022",
    link: "https://yandex.ru/games/app/200667",
  },
];

let inline_keyboard = [];
games.forEach((game, i) => {
  let obj = {
    text: game.name,
    callback_data: game.id,
  };

  if (i % 2 == 0) {
    inline_keyboard.push([obj]);
  } else {
    inline_keyboard[Math.floor(i / 2)].push(obj);
  }
});

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: inline_keyboard,
  }),
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/play", description: "Начать играть" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(chatId, getRandomStickers(stickersHy));
      return bot.sendMessage(
        chatId,
        `Добрый день, ${msg.from.first_name} ${msg.from.last_name}. Меня зовут TelegaGameBot, давай поиграем 🎮 /play`
      );
    }

    if (text === "/play") {
      await bot.sendSticker(chatId, getRandomStickers(stickersPlay));
      return bot.sendMessage(
        chatId,
        "Выберите игру, в которую хотели бы поиграть:",
        gameOptions
      );
    }
    return bot.sendMessage(
      chatId,
      `Вы ввели неизвестный запрос, выберите задачу из приведённых в списке`
    );
  });

  bot.on("callback_query", (query) => {
    const id = query.data;
    const chatId = query.message.chat.id;

    let gameId = games.find((game) => {
      return game.id == id;
    })?.id;
    let gameurl = games.find((game) => {
      return game.id == query?.game_short_name;
    })?.link;

    if (gameurl) {
      bot.answerCallbackQuery({
        callback_query_id: query.id,
        url: gameurl,
      });
    } else {
      bot.sendGame(chatId, gameId);
    }
  });
};

start();

function getRandomStickers(stickers) {
  let randIndex = Math.floor(Math.random() * stickers.length + 1);
  return stickers[randIndex];
}
