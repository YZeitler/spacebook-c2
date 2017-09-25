var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/spacebook');
//design the two schema below and use sub docs 
//to define the relationship between posts and comments

//you don't need a comments collection
//you only need a posts collection

var commentSchema = new Schema({
    text: String,
    user: String
});


var postSchema = new Schema({
    text: String,
    comments: [commentSchema]
});

var Post = mongoose.model('post', postSchema)



module.exports = Post;