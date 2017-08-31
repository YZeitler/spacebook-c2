//////////////////////////
//GLOBAL VARIABLES
(function() {

    var posts = [];
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
        posts.push(post);
    }

    //add a post to HTML
    function renderView() {
        $('.posts').empty();

        for (i = 0; i < posts.length; i++) {
            var currentPost = '<div class="post" data-id="' + posts[i].id + '">' + '<button type="button" class="remove"> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> REMOVE </button> ' + posts[i].text + '<br><input type="username" id="my-username" class="my-username" placeholder="Username"> <input type="text" id="my-comment" class="my-comment" placeholder="Comments..."> <button type="button" class="addComment"> Post Comment </button > <div class="comments">';

            for (j = 0; j < posts[i].comments.length; j++) {
                currentPost += '<div class="comment">' + posts[i].comments[j].user + ': ' + posts[i].comments[j].text + '</div>'
            }

            $('.posts').append(currentPost + '</div></div>')
        }
    }


    //////////////////////////
    //////////// EVENT HANDLERS 

    ////add a post
    $('#post-button').click(function() {
        //value from post input
        var postVal = $("#post-name").val();
        //add post to array
        addPost(postVal)
            //display post in HTML
        renderView()
    });


    ///  add the username and comment below the post
    $('.posts').on('click', '.addComment', function() {

        var pIndex = $(this).closest('.post').index()

        //TODO: create a comment object { text: dflkjd}
        var commentText = $(this).siblings(".my-comment").val()
        var userNameVal = $(this).siblings(".my-username").val();
        var newComment = {
            user: userNameVal,
            text: commentText
        };

        //TODO: find relevant post in posts array, push comment to it's comments array
        posts[pIndex].comments.push(newComment);

        //TODO: rerender all posts
        renderView()
    });


    ///remove a post
    $('.posts').on('click', '.remove', function() {

        //get parent's data attribute
        var pID = $(this).parent().index()
            // console.log('posts array before splice', posts)
        posts.splice(pID, 1);
        // console.log('posts array after splice', posts)
        //TODO: rerender the HTML on the page
        renderView();
    });
})();