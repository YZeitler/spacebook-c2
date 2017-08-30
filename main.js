posts = [];
var id = 0;

$('#post-button').click(function() {
            function addPost(post, id) {
                post = {
                    text: post,
                    id: id
                }
                posts.push(post);
                id += 1;

                function postToDiv() {
                    for (i = 0; i < posts.length; i++) {
                        $('.posts').append("" + posts[i].text + ", " + posts[i].id + "");
                    }
                }

            }