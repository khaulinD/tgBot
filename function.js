const db = require('./database.js')
//const { userCollection } = require('./database')
const {newUser,user,userCollection,numWin}= require('./database')
const wordsArray = require('./app')
async function foundInArray(text, wordsArray){
    if (text!='/start' &&'/game' && '/translate'&& '/momot'&& '/music') {
        wordsArray.push(text);
    }


}




async function toDataBaseLoose(nameUser) {
    if (db.checkUsers!==null) {
     let param = await userCollection.findOneAndUpdate({name:nameUser})

      try {
    await userCollection.findOneAndUpdate({name:nameUser},{score:{loose:param.score.loose+1,win:param.score.win}},{returnOriginal:false})
     console.log('win: '+param.score.win);
     console.log('loose: '+param.score.loose);
      console.log('basa updateeeee');

      }
      catch (e) {
        console.log(e.message);
      }
    }
    else{
      try {db.newUser(nameUser, wordsArray)}
      catch (e) {console.log(e)}
      console.log('takogo nemaeeeeeee');
    }
    
    }
    async function toDataBaseWin(nameUser) {
      if (db.checkUsers!==null) {
       let param = await userCollection.findOneAndUpdate({name:nameUser})
    
        try {
       await userCollection.findOneAndUpdate({name:nameUser},{score:{loose:param.score.loose,win:param.score.win+1}},{returnOriginal:false})
       console.log('win: '+param.score.win);
       console.log('loose: '+param.score.loose);
        console.log('basa updateeeee');
        }
        catch (e) {
          console.log(e.message);
        }
      }
      else{
        try {db.newUser(nameUser, wordsArray)}
        catch (e) {console.log(e)}
        console.log('takogo nemaeeeeeee');
      }
      
      }
  module.exports={
    toDataBaseLoose:toDataBaseLoose,
    toDataBaseWin:toDataBaseWin,
    foundInArray:foundInArray
  }