const TelegramApi = require("node-telegram-bot-api");

const TOKEN = "5704264589:AAERgeP1DoZWvVqX4LGnKk2gput_gOnQfAU";

const bot = new TelegramApi(TOKEN, { polling: true });

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
      await bot.sendSticker(
        chatId,
        "CAACAgIAAxkBAAEIblFkKcyn4jjZxGEm7cKsQZ2GrDc_tAACKgMAAs-71A4f8rUYf2WfMC8E"
      );
      return bot.sendMessage(
        chatId,
        `Добрый день, ${msg.from.first_name} ${msg.from.last_name}. Меня зовут TelegaGameBot, давай поиграем 🎮 /play`
      );
    }

    if (text === "/play") {
      await bot.sendSticker(
        chatId,
        "CAACAgIAAxkBAAEIbfxkKcRZW8WNBj5D4T3pqNUKxuSL-QACnywAAsm2UUlNG7jdAAG11vwvBA"
      );
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
