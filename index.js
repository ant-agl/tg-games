const TelegramApi = require('node-telegram-bot-api')

const TOKEN = '5704264589:AAERgeP1DoZWvVqX4LGnKk2gput_gOnQfAU'

const bot = new TelegramApi(TOKEN, {polling: true})

const games = [
    {
        id: "TelegramGames",
        name: 'Крестики-Нолики',
        link: 'https://ant-agl.github.io/other/tic-tac-toe/',
    },
    {
        id: "sapper",
        name: 'Саппёр',
        link: 'https://ant-agl.github.io/other/sapper/',
    },
]

let inline_keyboard_1 = [];
let inline_keyboard_2 = [];
games.forEach(game => {
    let obj = {
        text: game.name,
        callback_data: game.id
    };
    if (inline_keyboard_1.length <= inline_keyboard_2.length) {
        inline_keyboard_1.push(obj);
    } else {
        inline_keyboard_2.push(obj);
    }
});

const gameOptions = {
    reply_markup: JSON.stringify({
       inline_keyboard: [
            inline_keyboard_1,
            inline_keyboard_2
        ]
    })
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/play', description: 'Начать играть'},
    ])
    
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start') {
            return bot.sendMessage(chatId, `Добрый день, ${msg.from.first_name} ${msg.from.last_name}. Меня зовут TelegaGameBot, давай поиграем 🎮`);
        }
    
        if (text === '/play') {
            return bot.sendMessage(chatId,'Выберите игру, в которую хотели бы поиграть:', gameOptions);
        }
        return bot.sendMessage(chatId, `Вы ввели неизвестный запрос, выберите задачу из приведённых в списке`);
    })

    bot.on('callback_query', query => {
        const id = query.data;
        const chatId = query.message.chat.id;

        let gameId = games.find(game => {
            return game.id == id
        })?.id;
        let gameurl = games.find(game => {
            return game.id == query?.game_short_name
        })?.link;

        if (gameurl) {
            bot.answerCallbackQuery({
                callback_query_id: query.id,
                url: gameurl
            });
        } else {
            bot.sendGame(chatId, gameId);
        }
    })
}

start()