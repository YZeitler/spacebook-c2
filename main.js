var SpacebookApp = function() {

    var postsArray = [];
    var id = 0;
    var toggle = false;

    function renderView() {
        $('.posts').empty();

        for (i = 0; i < postsArray.length; i++) {
            var currentPost = '<div class="post" data-id="' + postsArray[i].id + '">' + '<button type="button" class="remove btn-danger"> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove Post </button> ' + postsArray[i].text + ' <button class="linkPost btn-success"><span class="glyphicon glyphicon-bookmark" aria-hidden="true"></span> Show Post</button><br><input type="username" id="my-username" class="my-username" placeholder="Username"> <input type="text" id="my-comment" class="my-comment" placeholder="Comments..."> <button type="button" class="addComment"><span class="glyphicon glyphicon-comment" aria-hidden="true"></span>  Post Comment </button > <div class="comments">';

            for (j = 0; j < postsArray[i].comments.length; j++) {
                currentPost += '<div class="comment">' + postsArray[i].comments[j].user + ': ' + postsArray[i].comments[j].text + '<button type="button" class="removeComment btn-warning"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Remove Comment </button ></div>'
            }
            $('.posts').append(currentPost + '</div></div>')
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
        postsArray.push(post);
        renderView();
    }

    function addComment(pIndex, commentText, userNameVal) {
        if (commentText != "" && userNameVal != "") {
            var newComment = {
                user: userNameVal,
                text: commentText
            };
            //TODO: find relevant post in postsArray array, push comment to it's comments array
            postsArray[pIndex].comments.push(newComment);
            renderView()
        }
    }

    function removePost(pID) {
        postsArray.splice(pID, 1);
        renderView();
    }

    function removeComment(cIndex, commentIndex) {
        postsArray[cIndex].comments.splice(commentIndex, 1);
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