require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error(
    "Токен бота не найден! Убедитесь, что BOT_TOKEN указан в .env."
  );
}

const bot = new Telegraf(BOT_TOKEN);

// Функция для создания клавиатуры
function createMainKeyboard() {
  return Markup.keyboard([
    [{ text: "/start ▶️" }],
    [{ text: "ℹ️ Информация" }, { text: "📄 Помощь" }],
  ])
    .resize() // Уменьшаем размер кнопок
    .oneTime(); // Клавиатура исчезнет после первого нажатия
}

bot.start(async (ctx) => {
  const userData = {
    id: ctx.from.id,
    first_name: ctx.from.first_name || "",
    last_name: ctx.from.last_name || "",
    username: ctx.from.username || "",
    language_code: ctx.from.language_code || "",
  };

  const tgWebAppData = encodeURIComponent(JSON.stringify(userData));
  const link = `https://host-ten-sandy.vercel.app/?tgWebAppData=${tgWebAppData}`;

  ctx.reply(
    `Привет, ${
      ctx.from.first_name || "пользователь"
    }! Добро пожаловать в Task Manager Bot! Нажмите на кнопку ниже, чтобы открыть Mini App.`,
    Markup.inlineKeyboard([Markup.button.webApp("Открыть приложение", link)])
  );

  // Отправляем клавиатуру
  ctx.reply("Выберите действие:", createMainKeyboard());
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
