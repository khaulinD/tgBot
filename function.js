const db = require('./database.js')
const { collection } = require('./database')

async function foundInArray(text, wordsArray){
    if (text!='/start', '/game', '/translate', '/momot', '/music') {
        wordsArray.push(text);
    }


}




async function toDataBaseWin(nameUser,numWin,numLoose) {
    if (db.checkUsers!==null) {
      try {
     let param =  await collection.findOneAndUpdate({name:nameUser},{score:{loose:numLoose,win:numWin}},{returnOriginal:false})
      console.log('win: '+param.score.win);
      console.log('loose: '+param.score.loose);
      console.log('basa updateeeee');
      }
      catch (e) {
    
        console.log(e.message);
      }
    }
    else{
      console.log('takogo nemae');
    }
    
    }
  module.exports={

    toDataBaseWin:toDataBaseWin,
    foundInArray:foundInArray
  }