const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 


// create Schema
const ItemSchema = new Schema({
    todo: {
        type:String, 
        required:true
    }, 
    memo: {
        type:String
    }, 
    date: {
        type:Date, 
        required:true
       // default: Date.now()
    }
})

module.exports = Item = mongoose.model('item', ItemSchema);

