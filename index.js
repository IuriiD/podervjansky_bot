require('dotenv').config();
const RiveScript = require('rivescript');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');

const f = require('./functions');
const phrases = require('./phrases');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const riveBot = new RiveScript({ utf8: true });

function loadingDone() {
  console.log('Bot is ready!');
  riveBot.sortReplies();
}

function loadingError(error) {
  console.log(`Error when loading files: ${error}`);
}

riveBot
  .loadDirectory('./brain')
  .then(loadingDone)
  .catch(loadingError);

bot.command(['start'], async (ctx) => {
  const username = ctx.from.first_name;
  const introPhrases = [
    `Привіт, ${username}. Я <b><bot name></b>! В мені - вся мудрість творів пана Леся`,
    `Привіт, ${username}. Мене звуть <b><bot name></b>. Я чатбот, що говорить фразами із творів Леся Подерв'янського`,
  ];
  const introStickers = ['1', '32', '48'];
  const randomWelcomePhrase = Math.round(Math.random() * introPhrases.length);
  const randomWelcomeSticker = Math.round(Math.random() * introStickers.length);

  await ctx.replyWithHTML(introPhrases[randomWelcomePhrase]);
  await ctx.replyWithSticker(
    phrases[introStickers[randomWelcomeSticker.toString()]].telegramStickerId,
    Extra.HTML().markup(m => m.inlineKeyboard([
      m.callbackButton('Слухати', '#listen'),
      m.callbackButton('Читати', '#read'),
    ])),
  );
});

bot.on('text', async (ctx) => {
  const userId = ctx.from.id;
  const replyFromRS = await riveBot.reply(userId, ctx.message.text);
  console.log(`User wrote: ${ctx.message.text}`);
  const replyWithSubs = f.getPhrase(phrases, replyFromRS);
  console.log(`\n${JSON.stringify(replyWithSubs)}`);

  if (replyWithSubs.text) {
    await ctx.replyWithHTML(replyWithSubs.text);
  }
  if (replyWithSubs.sticker) {
    await ctx.replyWithSticker(replyWithSubs.sticker);
    await ctx.replyWithHTML(
      replyWithSubs.sticker,
      Extra.HTML().markup(m => m.inlineKeyboard([
        m.callbackButton('Слухати', '#listen'),
        m.callbackButton('Читати', '#read'),
      ])),
    );
  }
});

// Other message types besides text trigger Default fallback response

bot.on('sticker', async (ctx) => {
  console.log(ctx.message);
  await ctx.replyWithHTML('It was a sticker!');
});

bot.on('photo', async (ctx) => {
  console.log(ctx.message);
  await ctx.replyWithHTML('It was a photo!');
});

bot.startPolling();
