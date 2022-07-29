const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CharacterSchema = new Schema({
    name: { type: String, required: true },
    description: { type:String }
})

CharacterSchema
.virtual('url')
.get(function(){
    return '/inventory/character/'+this._id;
})

module.exports = mongoose.Model('Character', CharacterSchema);