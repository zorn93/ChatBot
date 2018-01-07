var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');
var Message = mongoose.model('Message');

var CanalSchema = new Schema({
    name : String,
    admin :[{ type : mongoose.Schema.Types.ObjectId, ref : "User"}],
    users : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],
    messages :[{type :  mongoose.Schema.Types.ObjectId,ref : "Message"}]
});

var Channel = mongoose.model('Channel' ,ChannelSchema);

module.exports = Channel;