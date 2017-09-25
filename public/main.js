var SpacebookApp = function() {

    var posts = [];


    function _fetchData() {
        $.ajax({
            method: "GET",
            url: '/post',
            success: function(data) {
                posts = (data);
                _renderPosts();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }


    var $posts = $(".posts");



    function _renderPosts() {
        console.log("rendering")
        $posts.empty();
        var source = $('#post-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < posts.length; i++) {
            var newHTML = template(posts[i]);

            $posts.append(newHTML);
            _renderComments(i)
        }
    }

    function addPost(postData) {
        $.ajax({
            method: "POST",
            url: '/post/',
            data: postData,
            success: function(data) {
                posts.push(data);
                _renderPosts();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }


    function _renderComments(postIndex) {
        var post = $(".post")[postIndex];
        $commentsList = $(post).find('.comments-list')
        $commentsList.empty();
        var source = $('#comment-template').html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < posts[postIndex].comments.length; i++) {
            var newHTML = template(posts[postIndex].comments[i]);
            $commentsList.append(newHTML);
        }
    }

    var removePost = function(id) {

        $.ajax({
            method: "DELETE",
            url: '/post/' + id,
            success: function(data) {
                // var index = 
                console.log(data);
                var id = data._id;
                for (i = 0; i < posts.length; i++) {
                    if (id === posts[i]._id) {
                        posts.splice(i, 1);
                        _renderPosts();
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });

    };

    var addComment = function(newComment, postIndex, id) {

        $.ajax({
            method: "POST",
            url: '/post/' + id + '/comments',
            data: newComment,
            success: function(data) {
                posts.push(data);
                _renderPosts();

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });


    };


    var deleteComment = function(postIndex, commentIndex) {
        posts[postIndex].comments.splice(commentIndex, 1);
        _renderComments(postIndex);
    };

    _fetchData();

    return {
        addPost: addPost,
        removePost: removePost,
        addComment: addComment,
        deleteComment: deleteComment,
    };
};

var app = SpacebookApp();


$('#addpost').on('click', function() {
    var $input = $("#postText");
    if ($input.val() === "") {
        alert("Please enter text!");
    } else {
        var postData = {
            text: $input.val(),
            comments: []
        }
        app.addPost(postData);
        $input.val("");
    }
});

var $posts = $(".posts");

$posts.on('click', '.remove-post', function() {
    // var index = $(this).closest('.post').index();
    var id = $(this).closest('.post').data().id;
    app.removePost(id);
});

$posts.on('click', '.toggle-comments', function() {
    var $clickedPost = $(this).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
});

$posts.on('click', '.add-comment', function() {

    var $comment = $(this).siblings('.comment');
    var $user = $(this).siblings('.name');

    if ($comment.val() === "" || $user.val() === "") {
        alert("Please enter your name and a comment!");
        return;
    }

    var id = $(this).closest('.post').data()._id;
    var postIndex = $(this).closest('.post').index();
    var newComment = { text: $comment.val(), user: $user.val() };

    app.addComment(newComment, postIndex, id);

    $comment.val("");
    $user.val("");

});

$posts.on('click', '.remove-comment', function() {
    var $commentsList = $(this).closest('.post').find('.comments-list');
    var postIndex = $(this).closest('.post').index();
    var commentIndex = $(this).closest('.comment').index();

    app.deleteComment(postIndex, commentIndex);
});