function getPhrase(phrases, rsReply) {
  /*
   * Function parses a reply from RiveScript 'brain' which (reply) can include
   * a) only text,
   * b) only a sticker or
   * c) text + sticker.
   * Only 1 sticker may be in each reply
  */
  console.log(`rsReply: ${rsReply}`);
  const output = { text: false, sticker: false };

  if (rsReply.includes('phrase')) {
    if (rsReply.split('phrase')[0] !== '') {
      output.text = rsReply.split('phrase')[0];
    }

    const rsReplySplit = rsReply.split(' ');
    let phraseN = 0;
    for (let i = 0; i < rsReplySplit.length; i++) {
      if (rsReplySplit[i].includes('phrase')) {
        try {
          phraseN = rsReplySplit[i].split('phrase')[1];

          if (phraseN !== 0) {
            if (phrases.hasOwnProperty(phraseN)) {
              output.sticker = phrases[phraseN].telegramStickerId;
            }
          }
        } catch (err) {
          console.log(`>> getPhrase: ${err}`);
        }
      }
    }

    if (output.text === 'Defaultfallback') {
      // If user's phrase triggered Default Fallback intent -
      // try to find plays for this phrase using ElasticSearch
      // If found list them, if not - present only the sticker
      // for Fallback Intent
      output.text = false;
    }
  } else {
    output.text = rsReply;
  }
  return output;
}

module.exports = {
  getPhrase,
};
