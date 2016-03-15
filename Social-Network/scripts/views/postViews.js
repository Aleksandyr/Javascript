'use strict';

var app = app || {};

app.postViews = (function(){
    function showAllPostsPage(selector, data){
        $.get('templates/posts.html', function(tmpl){
            var outp = Mustache.render(tmpl, data);
            $(selector).html(outp);
        }).then(function(){
            $('#postButton').on('click', function(e){
                $('#post-box').toggle(500);
            });

            $('#postContent').on('click', function(e){
                var data = {
                    content: $('#post-content').val()
                };

                Sammy(function(){
                    this.trigger('post', data);
                });
            });
        }).done();
    }

    return{
        load: function() {
            return {
                showAllPostsPage: showAllPostsPage
            }
        }
    }
}());