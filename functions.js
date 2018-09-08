'use strict';

function getPhrase(phrases, rsReply) {
    /*
    * Function gets a reply from RiveScript 'brain' and a dictionary with phrases
    * and replaces 'phrase1/phrase10/phraseN' with corresponding phrases from L.Podervjansky's stories
    * */
    console.log(`getPhrase: rsReply - ${rsReply}`);
    let rsReplySplit = rsReply.split(' ');
    let phraseN = 0;
    for (let i=0; i<rsReplySplit.length; i++) {
        if (rsReplySplit[i].includes('phrase')) {
            try {
                phraseN = parseInt(rsReplySplit[i].split('phrase')[1]);
            } catch(err) {
                console.log(`Error: ${err}`);
            }
            if (phraseN!=0) {
                if  (phrases.hasOwnProperty(phraseN)) {
                    return rsReply.replace(`phrase${phraseN}`, `\n\n${phrases[phraseN]}`);
                    console.log(`Substituted`);
                } else {
                    return rsReply;
                }
            } else {
                return rsReply;
                console.log(`Without changes`);
            }
        }
    }
    return rsReply;
}

module.exports = {
    getPhrase
};