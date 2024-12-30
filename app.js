require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
require("./bot/bot.js"); // Подключаем бот

const app = express();
const PORT = process.env.PORT || 4999;

// Middleware
app.use(bodyParser.json());

// Запускаем сервер Express
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
