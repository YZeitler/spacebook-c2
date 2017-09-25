var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/spacebookDB', function() {
    console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 1) to handle getting all posts and their comments
app.get('/post', function(req, res) {
    Post.find({}, function(err, posts) {
        if (err) { return console.log("Error getting post from the DB"); }
        res.send(posts);
    });
});

// 2) to handle adding a post
app.post('/post', function(req, res) {
    var post1 = new Post(req.body);
    post1.save(function(err, posts) {
        if (err) { return console.log("Error save"); }
        res.send(posts);
    });
});

// 3) to handle deleting a post
app.delete('/post/:id', function(req, res) {
    var id = req.params.id;
    Post.findByIdAndRemove(id, function(err, post) {
        if (err) { return console.log("Error delete"); }
        res.send(post);
    });
});

// 4) to handle adding a comment to a post
app.post('/post/:id/comments', function(req, res) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if (err) { return console.log("Error delete") }
        post.comments.push(req.body)
        post.save();
        console.log(post)
        res.send(post);


    });
});


app.listen(8000, function() {
    console.log("what do you want from me! get me on 8000 ;-)");
});


// You will need to create 5 server routes
// These will define your API:





// 5) to handle deleting a comment from a post