const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    _id: {type:String},
    data:{type:Object},
    User:{
        type:mongoose.Schema.Types.DocumentArray, ref:'User'
    }
},{
    timestamps: true,
});

const Document = mongoose.model('document', documentSchema)

module.exports = Document