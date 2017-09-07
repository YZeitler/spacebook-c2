var SpacebookApp = function() {
    var postTempSource = $('#post-template').html();
    var postTemplate = Handlebars.compile(postTempSource);

    var posts = [];

    var id = 0;
    var toggle = false;

    function renderView() {
        $('.posts').empty();
        for (var i = 0; i < posts.length; i++) {
            var HTML = postTemplate(posts[i]);
            $('.posts').append(HTML);
        }

    }
    //Add a post to array
    function addPost(postVal) {
        post = {
            text: postVal,
            id: id,
            comments: []
        }
        id += 1;
        posts.push(post);
        renderView();
    }

    function addComment(pIndex, commentText, userNameVal) {
        if (commentText != "" && userNameVal != "") {
            var newComment = {
                user: userNameVal,
                text: commentText
            };
            //TODO: find relevant post in postsArray array, push comment to it's comments array
            posts[pIndex].comments.push(newComment);
            renderView()
        }
    }

    function removePost(pID) {
        posts.splice(pID, 1);
        renderView();
    }

    function removeComment(cIndex, commentIndex) {
        posts[cIndex].comments.splice(commentIndex, 1);
        renderView();
    }

    function showPost(hideDivs) {
        if (!toggle) {
            hideDivs.hide()
            toggle = !toggle;
        } else if (toggle) {
            hideDivs.show()
            toggle = !toggle;
        }
    }
    return {
        addPost: addPost,
        addComment: addComment,
        removePost: removePost,
        removeComment: removeComment,
        showPost: showPost,
    }
};
var app = SpacebookApp();

//////////// EVENT HANDLERS 

////add a post
$('#post-button').click(function() {
    var postVal = $("#post-name").val();
    if ("" != postVal) {
        app.addPost(postVal);
    }
});

///  add the username and comment below the post
$('.posts').on('click', '.addComment', function() {
    var pIndex = $(this).closest('.post').index()
    var commentText = $(this).siblings(".my-comment").val()
    var userNameVal = $(this).siblings(".my-username").val();
    app.addComment(pIndex, commentText, userNameVal);
});

///remove a post
$('.posts').on('click', '.remove', function() {
    var pID = $(this).parent().index()
    app.removePost(pID);
});

///remove a comment
$('.posts').on('click', '.removeComment', function() {
    var cIndex = $(this).closest('.post').index() // get posts index
    var commentIndex = $(this).closest('.comment').index() //  get comments index 
    app.removeComment(cIndex, commentIndex);
});

// hide a Post to it's posts's page
$('.posts').on('click', '.linkPost', function() {
    var hideDivs = $(this).parent().siblings();
    app.showPost(hideDivs);
});