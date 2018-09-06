// Les' Podervjansky's texts parser
// Let's split texts into phrases/sentences and mark each sentence with the name of story and phrase #
// Then I'll manually choose phrases-candidates for replies/stickers
// Texts from http://doslidy.org.ua/?page_id=123

'use strict';

const fs = require('fs');

const doslidy = 'Дiя перша.\n' +
    'Ліс, зроблений з папьє-маше. Входить натовп. Натовп дико і страшно реве. Подекуди можна почути обривки розлючених фраз типу: “Хлопці! Хорош ноги бить. Начальство очки гребе, а ми синці лопатою вигребаємо.” Входить Данко та стріля з пістолету в повітря.\n' +
    '\n' +
    'Данко. Мовчать!\n' +
    '\n' +
    'Всі мовчать так, що навіть стає ніяково.\n' +
    'Данко. Не розмишлять! Чмо японське! Іттіть!\n' +
    'Голос. Та куди ж іттіть?\n' +
    'Данко. Іттіть. Контра. Кто не хоче, вб’ю нахуй!\n' +
    '\n' +
    'Данко вириває з грудей сердце, яке світить карасиновим світом, і вимахує ним як фонарем.\n' +
    'Голос з натовпу. Ні хуя собі!\n' +
    'Данко. (Кричить.) Урааа! Вперьод, чмо японське!\n' +
    '\n' +
    'Всі біжать за Данком у напрямку протилежному тому з якого прийшли.\n' +
    '\n' +
    'Дія друга.\n' +
    'Болото. Входить натовп з Данком.\n' +
    '\n' +
    'Данко. Іттіть!\n' +
    'Голос з натовпу. Та вже мабуть прийшли.\n' +
    'Данко. Контра. Не пиздіть. Іттіть.\n' +
    'Голос з натовпу. Я їбав таку жизнь.\n' +
    'Данко. Харош, пизда ваша мати. Шо поставали?\n' +
    'Запопадливий голос з натовпу. Данко! Серце згасне!\n' +
    '\n' +
    'Справді. Серце в руці Данко починає гаснути. Данко кидає його з розмаху об кочку і затаптує ногами. Потім вирива у себа печінку. Печінка відразу ж починає горіти синім вогнем.\n' +
    'Данко. (несамовито реве) Іттіть!\n' +
    '\n' +
    'Данко і натовп зниккають у напрямку протилежному тому з якого прийшли.\n' +
    '\n' +
    'Дія третя.\n' +
    'Пустиня. Входить натовп з Данком.\n' +
    'Данко. (шуткує) Вот ніхуйова пагодка. (Натовп мовчить)\n' +
    'Данко. Шо мовчите? Га? Де Ізергіль, стара блядь!\n' +
    'Голос з натовпу. Вчора здохла.\n' +
    'Данко. (Невпевнено) Іттіть.\n' +
    'Голос з натовпу. А не пішов би ти на хуй!\n' +
    'Запопадливий голос з натовпу. Данко! Печінка згасає. (Данко кида об пол смердючу згорілу печінку)\n' +
    'Запопадливий голос з натовпу. Данко! Нирки рви – вони горітимуть. (Данко вирива нирки. Вони горять,але не так яскраво, як хотілося. Тоді Данко і їх кидає у пісок.)\n' +
    'Данко. Що, падлюки. Тепер довольні? (Натовп мовчить)\n' +
    'Данко. Тепер Вам піздєц! (помирає)\n' +
    'Голос з натовпу. Ніхуя нє піздєц! Ми тут в пустині сад зробимо!\n' +
    'Голоси. А вірно хлопці! А діло каже!\n' +
    'Голос. Ураааааа! Вперед, чмо японське!\n' +
    'Всі. Ураааааа!\n' +
    'Завіса.';

const storyName = 'Данко';

let rawPhrases = doslidy.split(/[\n.]/);
let finalPhrases = {};
for (let n=0; n<rawPhrases.length; n++) {
    let phrase = rawPhrases[n].trim();
    let sliceDot = '';
    phrase[phrase.length - 1] === '.' ? sliceDot = phrase.slice(0, -1) : sliceDot = phrase;
    if (sliceDot !== '') {
        finalPhrases[`["${storyName}", фраза ${n+1}]`] = sliceDot;
    }
}

fs.writeFile(`${storyName}.txt`, JSON.stringify(finalPhrases), (err, data) => {
   if (err) console.log(`Error: ${err}`);
});


console.log(finalPhrases);