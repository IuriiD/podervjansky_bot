require('dotenv').config();
const RiveScript = require('rivescript');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');

const f = require('./functions');
const phrases = require('./phrases');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const riveBot = new RiveScript({ utf8: true });
const punctuation = new RegExp(/[.,!;:]/g);

riveBot
  .loadDirectory('./brain')
  .then(loading_done)
  .catch(loading_error);

function loading_done(batch_num) {
  console.log('Bot is ready!');
  riveBot.sortReplies();
}

function loading_error(error) {
  console.log(`Error when loading files: ${error}`);
}

bot.command(['start'], async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.first_name;
  const replyFromRS = await riveBot.reply(userId, username);
  const replyWithSubs = f.getPhrase(phrases, replyFromRS);
  console.log(`\n\n\n${JSON.stringify(replyWithSubs)}`);
  if (replyWithSubs.text) {
    await ctx.replyWithHTML(replyWithSubs.text);
  }
  if (replyWithSubs.sticker) {
    await ctx.replyWithSticker(
      'CAADAgADBAAD09KeCnfMl_xO0kSQAg',
      Extra.HTML().markup(m => m.inlineKeyboard([
        m.callbackButton('Слухати', '#listen'),
        m.callbackButton('Читати', '#read'),
      ])),
    );
  }
});

bot.on('text', async (ctx) => {
  const userId = ctx.from.id;
  const replyFromRS = await riveBot.reply(userId, ctx.message.text);
  const replyWithSubs = f.getPhrase(phrases, replyFromRS);
  console.log(`\n\n\n${JSON.stringify(replyWithSubs)}`);
  if (replyWithSubs.text) {
    await ctx.replyWithHTML(replyWithSubs.text);
  }
  if (replyWithSubs.sticker) {
    await ctx.replyWithSticker('CAADAgADAwAD09KeCpV7FIvkzeffAg');
    await ctx.replyWithHTML(
      replyWithSubs.sticker,
      Extra.HTML().markup(m => m.inlineKeyboard([
        m.callbackButton('Слухати', '#listen'),
        m.callbackButton('Читати', '#read'),
      ])),
    );
  }
});

bot.on('sticker', async (ctx) => {
  console.log(ctx.message);
  await ctx.replyWithHTML('It was a sticker!');
});

bot.on('photo', async (ctx) => {
  console.log(ctx.message);
  await ctx.replyWithHTML('It was a photo!');
});

bot.startPolling();
