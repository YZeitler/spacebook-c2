//////////////////////////
//GLOBAL VARIABLES
posts = [];
var id = 0;

//////////////////////////
///////FUNCTIONS

//Add a post to array
function addPost(postVal) {

    post = {
        text: postVal,
        id: id
    }
    id += 1;
    posts.push(post);
}

//add a post to HTML
function postToDiv() {
    $('.posts').empty();

    for (i = 0; i < posts.length; i++) {
        $('.posts').append('<p class="post"' + 'data-id="' + posts[i].id + '"' + '>' + '<button type="button" class="remove"> ' + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> REMOVE </button>' + posts[i].text + '  ' +

            '<br><input type="username" id="my-username" placeholder="Username">' + '</input>' +

            '<input type="text" id="my-input" placeholder="Comments...">' + '</input>' + ' <button id = "button-one">' + 'Post Comment' + '</button > </p>'
        );
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
    postToDiv()
});

///remove a post
$('body').on('click', '.remove', function() {

    //get parent's data attribute
    var pID = $(this).parent().index()
        // console.log('posts array before splice', posts)
    posts.splice(pID, 1);
    // console.log('posts array after splice', posts)
    //TODO: rerender the HTML on the page
    postToDiv();
});