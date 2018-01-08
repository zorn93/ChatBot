var mongoose = require('mongoose');
var User = mongoose.model('User');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    content: String,
    date: Date,
    isCensured: Boolean,
    isDeleted: Boolean,
    author: {type : mongoose.Schema.Types.ObjectId, ref : "User"},
    like : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;