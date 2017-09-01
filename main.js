//////////////////////////
//GLOBAL VARIABLES
(function() {

    var postsArray = [];
    var id = 0;

    //////////////////////////
    ///////FUNCTIONS

    //Add a post to array
    function addPost(postVal) {
        post = {
            text: postVal,
            id: id,
            comments: []
        }
        id += 1;
        postsArray.push(post);
    }

    //add a post to HTML
    function renderView() {
        $('.posts').empty();

        for (i = 0; i < postsArray.length; i++) {
            var currentPost = '<div class="post" data-id="' + postsArray[i].id + '">' + '<button type="button" class="remove btn-danger"> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove Post </button> ' + postsArray[i].text + '   <a href="mypost.html"><button class="linkPost btn-success"><span class="glyphicon glyphicon-bookmark" aria-hidden="true"></span> Link Post</button></a><br><input type="username" id="my-username" class="my-username" placeholder="Username"> <input type="text" id="my-comment" class="my-comment" placeholder="Comments..."> <button type="button" class="addComment"><span class="glyphicon glyphicon-comment" aria-hidden="true"></span>  Post Comment </button > <div class="comments">';

            for (j = 0; j < postsArray[i].comments.length; j++) {
                currentPost += '<div class="comment">' + postsArray[i].comments[j].user + ': ' + postsArray[i].comments[j].text + '<button type="button" class="removeComment btn-warning"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Remove Comment </button ></div>'
            }
            $('.posts').append(currentPost + '</div></div>')
        }
    }
    ///////////////////////////////////////////////////////
    //////////// EVENT HANDLERS 

    ////add a post
    $('#post-button').click(function() {
        //value from post input
        var postVal = $("#post-name").val();

        //add post to array
        if ("" != postVal) {
            addPost(postVal);
            //display post in HTML
            renderView()
        }
    });

    ///  add the username and comment below the post
    $('.posts').on('click', '.addComment', function() {

        var pIndex = $(this).closest('.post').index()

        //TODO: create a comment object { text: dflkjd}
        var commentText = $(this).siblings(".my-comment").val()
        var userNameVal = $(this).siblings(".my-username").val();

        if (commentText != "" && userNameVal != "") {
            var newComment = {
                user: userNameVal,
                text: commentText
            };
            //TODO: find relevant post in postsArray array, push comment to it's comments array
            postsArray[pIndex].comments.push(newComment);

            //TODO: rerender all posts
            renderView()
        }
    });

    ///remove a post
    $('.posts').on('click', '.remove', function() {

        //get parent's data attribute
        var pID = $(this).parent().index()
            // console.log('postsArray array before splice', postsArray)
        postsArray.splice(pID, 1);
        // console.log('postsArray array after splice', postsArray)
        //TODO: rerender the HTML on the page
        renderView();
    });
    ///remove a comment
    $('.posts').on('click', '.removeComment', function() {
        var cIndex = $(this).closest('.post').index() // get posts index

        var commentIndex = $(this).closest('.comment').index() //  get comments index 

        //console.log('postsArray array before splice', postsArray)
        postsArray[cIndex].comments.splice(commentIndex, 1);
        // console.log('postsArray array after splice', postsArray)
        //TODO: rerender the HTML on the page
        renderView();
    });

    // Link a Post to it's posts's page
    $('.posts').on('click', '.linkPost', function() {

        var thisDiv = $(this).parent();
        $('.body').append('<div>' + thisDiv + '</div>');
        renderView();
    });
})();