posts = [];
var id = 0;


$('#post-button').click(function() {
    id += 1;

    function addPost(postVal, id) {
        var postVal = $("#post-name").val();
        post = {
            text: postVal,
            id: id
        }
        posts.push(post);

    }


    function postToDiv() {
        $('.posts').empty();

        for (i = 0; i < posts.length; i++) {
            $('.posts').append('<p class="post"' + 'data-id="' + posts[i].id + '"' + '>' + '<button type="button" class="remove"> ' + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> REMOVE </button>' + posts[i].text + '  ' + '</p>');
        }
        removePost();
    }
    addPost('post', id);
    postToDiv();


    function removePost() {
        $('.remove').on('click', function() {
            var pID = $(this).closest('p').text;

            //step 1: remove the 'relevant' post from the array
            posts.splice(pID, 1);

            //step 2: redisplay the current array status.
            postToDiv();




        });
    }
});