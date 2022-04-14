const TelegramBot = require('node-telegram-bot-api');
const { addListener } = require('nodemon');
require('dotenv').config();
const token = process.env.bot_token
const fs = require('fs');
const path = require('path');
const options = {polling: true};
const {gameOptions, againOptions, textSwapButton, stopSwap} = require('./expFile')
const bot = new TelegramBot(token, options);
const {toDataBaseWin,foundInArray} = require('./function')
const mongoose = require('mongoose')
const db = require('./database')
const { collection } = require('./database')
const anyFunction = require('./function')
//const { foundInArray } = require('./function')
//const { checkUsers } = require('./database')
const chats={};
let boolForSwapRu =false;
let boolForSwapUa =false;
const timeHour = new Date().getHours();
let boolForTime = false;


function launch() {

function goodNight(chatId) {
  let num =  Math.floor(Math.random()*10)
  if (num<=4) {
    bot.sendMessage(chatId,'Спокойной ночи,хороших снов!💕')
  }
  if (num>4 && num<6) {
    bot.sendMessage(chatId,'Спи ты никому, не нужен')
  }
  if (num>=6) {
    bot.sendMessage(chatId,`Уже позно,
Надеюсь, ты увидишь меня в мире грез.💕`)
  }
}
function goodMorning(chatId) {
  let num =  Math.floor(Math.random()*10)
  if (num<=4) {
    bot.sendMessage(chatId,'Вставай зайка, уже утро💕')
  }
  if (num>4 && num<6) {
    bot.sendMessage(chatId,'Вставай, начались новые бесполезные сутки')
  }
  if (num>=6) {
    bot.sendMessage(chatId,`Доброе утро, радость моя,
удачного дня, люблю я тебя💕💕`)
  }
}




function swapForRu(chatId, text){
    let g = text.split('')
  const input = `QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>qwertyuiop[]asdfghjkl;'zxcvbnm,. ?/`
  const output= `ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю ?/`
  let hole = ''
  for (let i = 0; i < g.length; i++) {
   let ind = input.indexOf(g[i])
    hole+=output[ind]
    
  }

 return bot.sendMessage(chatId, hole.toString())
  }
function swapForUa(chatId, text){
  let g = text.split('')
const input = `QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>qwertyuiop[]asdfghjkl;'zxcvbnm,. ?`
const output= `ЙЦУКЕНГШЩЗХЇФІВАПРОЛДЖЄЯЧСМИТЬБЮйцукенгшщзхїфівапролджєячсмитьбю ?`
let hole = ''
for (let i = 0; i < g.length; i++) {
 let ind = input.indexOf(g[i])
  hole+=output[ind]
  
}
return bot.sendMessage(chatId, hole.toString())

}
async function startGame(chatId) {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать',gameOptions)
    const randomNumber = Math.floor(Math.random()*10)
    chats[chatId]= randomNumber;
};
function humanReadable (chatId) {
  const timeOfDeparture = new Date(2022, 03, 01, 08, 00,00);
let dateNow =Date.now()
 let time = (dateNow-timeOfDeparture)/1000;

  if (time < 0 ) {
    return null
  }
  if (time === 0) {
    return '00:00:00'
  }
  let days = Math.floor(time/86400)
  time = time - (days * 86400)
  if (days <10) {
    days= '0'+days
  }

let HH= Math.floor(time /3600)
time = time - (HH*3600)
if (HH<10) {
  HH= '0'+HH
}

let MM= Math.floor(time /60)
time = Math.floor(time)- (MM*60)
if (MM<10) {
  MM= '0'+MM

}
if (time <10) {
  time= '0'+Math.floor(time)
}
bot.sendMessage(chatId,`<b>З від'їздy Кєнта пройшло:\n Днів ${days}\n Годин ${HH}:${MM}:${time}</b>`,{parse_mode : "HTML"})
};
function sayIlove(chatId){

  var text = function makePhrases(chatId) {
  var words1 = ["Я", "Лиза сказа что она", "Твоя девочка" ,'Фантомочка говорит что'];
  var words2 = ['любит без памяти', "любит", 'безума от', 'тоже обожает', 'тоже влюбилась в'];
  var words3 = [ "Івана", 'Ваню', 'тебя', 'Момота'];

  var rand1 = Math.floor(Math.random() * words1.length);
  var rand2 = Math.floor(Math.random() * words2.length);
  var rand3 = Math.floor(Math.random() * words3.length);

return bot.sendMessage(chatId, `${words1[rand1]} ${words2[rand2]} ${words3[rand3]}!`)
  }
  text(chatId)
}
function howAreYou(chatId) {

let phrase = [`Все супер, спасибо❤`,
`Ты написал и стало лудше<3`,
`Когда ты мне пишешь, становится тепло на душе❣`]
let ans =  Math.floor(Math.random()*phrase.length)

return bot.sendMessage(chatId, phrase[ans])
}
async function music(chatId) {
  let random=  Math.floor(Math.random()*10)
  await bot.sendMessage(chatId,`Может что-то по-типу етого?`)

  switch (random) {
    case 0:
      return  bot.sendAudio(chatId,src='music/Ooes - Ночь.mp3',{parse_mode : "HTML"})  
        break;
    case 1:
    return  bot.sendAudio(chatId,src='music/6-senz-function.mp3',{parse_mode : "HTML"})  
      break;
      case 2:
      return  bot.sendAudio(chatId,src='music/avtostopom_po_faze_sna_-_opianarium.mp3',{parse_mode : "HTML"})  
        break;
        case 3:
          return  bot.sendAudio(chatId,src='music/Avtostopom_po_faze_sna_-_Porno_.mp3',{parse_mode : "HTML"})  
            break;
            case 4:
            return  bot.sendAudio(chatId,src='music/JojoHF - Первый раз.mp3',{parse_mode : "HTML"})  
              break;
              case 5:
                return  bot.sendAudio(chatId,src='music/lsp-otbros.mp3',{parse_mode : "HTML"})  
                  break;
                  case 6:
                  return  bot.sendAudio(chatId,src='music/lsp-uuu.mp3',{parse_mode : "HTML"})  
                    break;
                    case 7:
                      return  bot.sendAudio(chatId,src='music/poshlaya-molli-lyubimaya-pesnya-tvoey-sestry.mp3',{parse_mode : "HTML"})  
                        break;
                        case 8:
                        return  bot.sendAudio(chatId,src='music/ROCKET_Infinite_Tsukuyomi.mp3',{parse_mode : "HTML"})  
                          break;
                          case 9:
                            return  bot.sendAudio(chatId,src='music/xxxtentacion-revenge.mp3',{parse_mode : "HTML"})  
                              break;
                              case 10:
                              return  bot.sendAudio(chatId,src='music/Полматери - Ярче Звёзд.mp3',{parse_mode : "HTML"})  
                                break;
    default:
      console.log(random);
      break;
  }
}

//  if (boolForTime==false) {
// bot.editMessageText( `Уже позно,
// Надеюсь, ты увидишь меня в мире грез.💕`)

// //   bot.sendMessage(,`Уже позно,
// // Надеюсь, ты увидишь меня в мире грез.💕`)

//  boolForTime=true
//   }
let wordsArray = [];
module.exports.wordsArray= wordsArray;
bot.on('message', async (msg)=>{
  const text = msg.text;
    if (text) {     
    foundInArray(text, wordsArray)  
    wordsArray =Array.from(new Set(wordsArray));
    console.log(wordsArray)
    }
})

bot.setMyCommands([
    {command: '/start', description:'start working' },
    {command: '/game', description:'!try found number!'},
    {command: '/translate', description:'swap text' },
    {command: '/momot', description:'days without Momot' },
    {command: '/music', description:'music choices' }
])
bot.on('message', async (msg)=>{
 
    const data = msg.data
    const text = msg.text;
    const chatId = msg.chat.id;
    const date = msg.date;
    const nameUser = msg.from.first_name;
    const filePath = path.join(__dirname,'usersText', `${nameUser}.txt`)
let text1 = text.toLowerCase().replace('?','')
if (boolForTime!==true) {
//  goodNight(chatId)
 // boolForTime=true
}

    if (text1=='/start') {
    
       db.newUser(nameUser, wordsArray)
      
       setInterval(async ()=> {
        if (db.checkUsers!=null) {
          try {
          await collection.findOneAndUpdate({name:nameUser},{words:wordsArray},{returnOriginal:false})
          console.log('basa update');
          }
          catch (e) {
            console.log(e.message);
          }
        }
        else{
          console.log('takogo nemae');
          try {db.newUser(nameUser, wordsArray)}
          catch (e) {console.log(e)}
        }},3600000)

    setInterval(async()=>{
      if (timeHour >= 23 && timeHour <=24) {
        goodNight(chatId)
      }
      if (timeHour >= 8 && timeHour <=9) {
        goodMorning(chatId)
      }
      
    },3600000)



    }
  

if (text1=='/momot') {
 humanReadable (chatId)
}
    if (text1=='/game') {
      startGame(chatId)
     
    }
    if (text1=='/translate') {
        bot.sendMessage(chatId,'Виберіть на яку розкладку поміняти', textSwapButton)
    }
    if (text && boolForSwapRu == true) {
      swapForRu(chatId, text)
      return bot.sendMessage(chatId,'Чтобы остановить нажми:', stopSwap)
    }
    if (text1 && boolForSwapUa == true) {
      await swapForUa(chatId, text)
    return bot.sendMessage(chatId,'Чтобы остановить нажми:', stopSwap)   
      }

      if (text1=='люблю тебя'||text1=='я люблю тебя'||text1=='хочу тебя'||text1=="не могу без тебя"||text1=='i love you'||text1=="я тебе люблю") {
      return  sayIlove(chatId)
      }

if (text1=='как ты?'||text1=='как ти'||text1=='ти как'||text1=='як ти'||text1=='как у тебя дела?') {
 return howAreYou(chatId)
}
if (text1=='хочу бить рядом с тобой'|| text1=='давай встречаться') {
  console.log('fgsd');
  bot.sendMessage(chatId,`Серь…серь…серьезно?!
Хорошо….
У нас всё получится,жаль что я лишь твоё творения…
Но на твоё призвище,Я ГОТОВА ПОМЕНЯТЬ!!!`)
bot.sendPhoto(chatId,src='img/weddingRem.jpg',{parse_mode : "HTML"})
}
if (text1=='/music') {
  music(chatId) 
 }

     
})
bot.on('callback_query', async msg=>{
    const text = msg.text;
    const chatId = msg.message.chat.id;
    const data = msg.data
    if (data=='swapRu') {
   return boolForSwapRu= true;
    }
    if (data=='swapUa') {
        return boolForSwapUa= true;
         }
         if (data=='stopSwap') {
    
            boolForSwapUa= false; 
            boolForSwapRu= false;
          }
})
let numLoose =0;
let numWin = 0;
bot.on('callback_query', async msg=>{ //game find num
    
    const text1 = msg.text;
    const chatId = msg.message.chat.id;
    const data = msg.data
    const nameUser = msg.from.first_name;
    if (data=='/again') {
       return startGame(chatId)  
    }
    if (data==chats[chatId]) {
    numWin++
     await toDataBaseWin(nameUser,numWin,numLoose)
    return  bot.sendMessage(chatId,`Ладно в той раз повезло`,againOptions)
   
    }
    if(data!==chats[chatId] && data.length==1){
      numLoose++
     await toDataBaseWin(nameUser,numWin,numLoose)
   return  bot.sendMessage(chatId,`Боже який ти камінь, правильне чысло: ${chats[chatId]}`,againOptions)
}});
}



launch()
