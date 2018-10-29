// Les' Podervjansky's texts parser
// Let's split texts into phrases/sentences and mark each sentence with the name of story and phrase #
// Then I'll manually choose phrases-candidates for replies/stickers
// Texts from http://doslidy.org.ua/?page_id=123


const fs = require('fs');

const doslidy = 'Іржик\n'
  + '\n'
  + 'Дійові особи:\n'
  + '\n'
  + 'Іржик – партізан.\n'
  + 'Смєтанка – бойова подруга Іржика.\n'
  + 'Краєчка – друг Іржика, тоже партізан\n'
  + '\n'
  + 'а також німці і партізани.\n'
  + '\n'
  + 'Дія перша\n'
  + '\n'
  + 'В горах. Іржик займає бойову позицію біля пулімьоту сракою догори. На ньому верхи сидить Смєтанка та бавиться.\n'
  + '\n'
  + 'Смєтанка: Іржик, оно диви, німці!\n'
  + 'Іржик: Де! Тра-та-та-та-та(строчить з пулімьоту).\n'
  + 'Смєтанка: Га-га-га-га-га(регоче).\n'
  + 'Іржик(сам до себе): Знову наїбала, сука.\n'
  + '\n'
  + 'Входить Дворжик\n'
  + '\n'
  + 'Дворжик: Іржик, диви, там німці!\n'
  + 'Іржик: Де! Тра-та-та-та-та(строчить з пулімьоту).\n'
  + 'Смєтанка: Га-га-га-га-га! От так наїбав.\n'
  + '\n'
  + 'З”являються німці.”';

const storyName = 'Іржик';

const rawPhrases = doslidy.split(/[\n.]/);
const finalPhrases = {};
for (let n = 0; n < rawPhrases.length; n++) {
  const phrase = rawPhrases[n].trim();
  let sliceDot = '';
  phrase[phrase.length - 1] === '.' ? (sliceDot = phrase.slice(0, -1)) : (sliceDot = phrase);
  if (sliceDot !== '') {
    finalPhrases[`["${storyName}", фраза ${n + 1}]`] = sliceDot;
  }
}

fs.writeFile(`${storyName}.txt`, JSON.stringify(finalPhrases), (err, data) => {
  if (err) console.log(`Error: ${err}`);
});

console.log(finalPhrases);
