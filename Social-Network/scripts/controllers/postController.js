'use strict';

var app = app|| {};

app.postController = (function(){
    function PostController(model, viewBag){
        this._model = model;
        this._viewBag = viewBag;
    }

    PostController.prototype.loadAllPosts = function(selector){
        var _this = this;

        this._model.getAllPosts()
            .then(function(successData){
                var result = {
                    posts: []
                };

                successData.forEach(function(post){
                    result.posts.push({content: post.content, postId: post._id});
                });

                _this._viewBag.showAllPostsPage(selector, result);
            });
    };

    return {
        load: function(model, viewBag){
            return new PostController(model, viewBag)
        }
    }
}());