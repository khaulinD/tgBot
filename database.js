const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');



require('dotenv').config();
const uri = process.env.uriDatabase
const { Schema } =mongoose;
async function main(){

    mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
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
})
const collection = mongoose.model('users', userSchema)

async function newUser(nameUser, wordsArray){
    const checkUsers = await collection.findOne({name:nameUser});
  
    
    if(true){
        let user = await collection.create({
            name:nameUser,
            words:wordsArray,
            score:{
                loose:0,
                win:0
              }
        })
     console.log(user.name);

    }
    else {
    console.log('vse isnue');


    }
  module.exports.checkUsers = checkUsers  
    
}


module.exports.newUser= newUser;
module.exports.collection =collection
