'use strict';

const RiveScript = require('rivescript');
const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');

const keys = require('./keys');
const f = require('./functions');
const projectName = 'Poet';
const phrases = require('./phrases');

const bot = new Telegraf(keys.TELEGRAM_TOKEN);

const riveBot = new RiveScript({utf8: true});
const punctuation = new RegExp(/[.,!;:]/g);

riveBot.loadDirectory('./brain').then(loading_done).catch(loading_error);

function loading_done (batch_num) {
    console.log('Bot is ready!');
    riveBot.sortReplies();
}

function loading_error (error) {
    console.log("Error when loading files: " + error);
}

bot.command(['start'], async ctx => {
    const username = ctx.from.first_name;
    await ctx.replyWithHTML(`Hi, <b>${username}</b>! I'm a ${projectName}Bot`);
});

bot.on('text', async ctx => {
    console.log(ctx.message);
    const userId = ctx.from.id;
    let replyFromRS = await riveBot.reply(userId, ctx.message.text);
    let replyWithSubs = f.getPhrase(phrases, replyFromRS);
    console.log(`replyFromRS: ${replyFromRS}\nreplyWithSubs: ${replyWithSubs}`);
    await ctx.replyWithHTML(replyWithSubs);
});

bot.on('sticker', async ctx => {
    console.log(ctx.message);
    await ctx.replyWithHTML(`It was a sticker!`);
});

bot.on('photo', async ctx => {
    console.log(ctx.message);
    await ctx.replyWithHTML(`It was a photo!`);
});


bot.startPolling();