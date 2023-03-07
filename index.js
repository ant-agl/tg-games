const express = require("express");
const path = require ("path");
const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "5704264589:AAERgeP1DoZWvVqX4LGnKk2gput_gOnQfAU";
const server = express();
const bot = new TelegramBot (TOKEN, {
    polling: true
});
const port = 49569;
const games = {
    ticTacToe: "TelegramGames",
    sapper: "sapper"
}
const queries = {};
server.use(express.static(path.join(__dirname, 'TelegramGames')));
bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "This bot implements a T-Rex jumping game. Say /game if you want to play."));
bot.onText(/start|game/, (msg) => {
    for (let id in games) {
        bot.sendGame(msg.from.id, games[id]);
    };
});
bot.on("callback_query", function (query) {
    let gameurl;
    switch (query.game_short_name) {
        case games.ticTacToe:
            queries[query.id] = query;
            gameurl = "https://ant-agl.github.io/other/tic-tac-toe/";
            break;

        case games.sapper:
            queries[query.id] = query;
            gameurl = "https://ant-agl.github.io/other/sapper/";
            break;
    
        default:
            bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
            return;
    }

    bot.answerCallbackQuery({
        callback_query_id: query.id,
        url: gameurl
        
    });
});
bot.on("inline_query", function (iq) {
    let arr = [];
    let i = 0;
    for (let id in games) {
        arr.push({
            type: "game",
            id: i,
            game_short_name: games[id]
        });
        i++;
    };
    bot.answerInlineQuery(iq.id, [
        {
            type: "game",
            id: "0",
            game_short_name: games.ticTacToe
        },
        {
            type: "game",
            id: "1",
            game_short_name: games.sapper
        }
    ]);
});
server.get("/highscore/:score", function (req, res, next) {
    if (!Object.hasOwnProperty.call(queries, req.query.id)) return next();
    let query = queries[req.query.id];
    let options;
    if (query.message) {
        options = {
            chat_id: query.message.chat.id ,
            message_id: query.message.message_id
        };
    } else {
        options = {
            inline_message_id: query.inline_message_id
        };
    }
    bot.setGameScore(query.from.id , parseInt(req.params.score), options,
        function (err, result) {});
});
server.listen(port);