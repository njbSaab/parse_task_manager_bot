require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");

// Получение токена из .env
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error(
    "Токен бота не найден! Убедитесь, что BOT_TOKEN указан в .env."
  );
}

const bot = new Telegraf(BOT_TOKEN);

// Команда /start
bot.start((ctx) => {
  ctx.reply(
    `Привет, ${
      ctx.from.first_name || "пользователь"
    }! Добро пожаловать в Task Manager Bot!`,
    Markup.keyboard([["📄 Помощь", "ℹ️ Информация"]])
      .resize()
      .oneTime()
  );
});

// Обработка кнопки "Помощь"
bot.hears("📄 Помощь", (ctx) => {
  ctx.reply(
    "Я помогу вам управлять задачами. Просто нажмите на нужную кнопку!"
  );
});

// Обработка кнопки "Информация"
bot.hears("ℹ️ Информация", (ctx) => {
  ctx.reply("Это Task Manager Bot, созданный для управления вашими задачами!");
});

// Запуск бота
bot
  .launch()
  .then(() => {
    console.log("Бот успешно запущен!");
  })
  .catch((error) => {
    console.error("Ошибка при запуске бота:", error.message);
  });

// Учитываем остановку сервера для корректного завершения бота
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
