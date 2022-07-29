const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CharacterSchema = new Schema({
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    description: { type:String }
})

CharacterSchema
.virtual('url')
.get(function(){
    return '/inventory/character/'+this._id;
})

module.exports = mongoose.model('Character', CharacterSchema);