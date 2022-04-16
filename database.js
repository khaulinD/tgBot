const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');



require('dotenv').config();
const uri = process.env.uriDatabase
const { Schema } =mongoose;
async function main(){

    mongoose.connect(uri,
         {useNewUrlParser: true ,
        useUnifiedTopology: true});
    console.log('vse ok');
}
main().catch(e=>console.log(e));
const userSchema = new Schema({
    name:String,
    words:Array,
    score:{
        loose:Number,
        win:Number
    }
},{timestamps:true})
const messageSchema = new Schema({
    name:String,
    text:String,
    textId:Number
},{timestamps:true})

const userCollection = mongoose.model('users', userSchema)

async function newUser(nameUser, wordsArray){
    const checkUsers = await userCollection.findOne({name:nameUser});
  const numWin =0
    
    if(checkUsers==null){
        let user = await userCollection.create({
            name:nameUser,
            words:wordsArray,
            score:{
                loose:numWin,
                win:numWin
              }
        })
     console.log(user.name);

    }
    else {
    console.log('vse isnue');


    }
  module.exports={
      checkUsers: checkUsers,
      numWin:numWin

     
 } 
    
}

module.exports={
    newUser: newUser,
    messageSchema:messageSchema,
    userCollection : userCollection
  
}
