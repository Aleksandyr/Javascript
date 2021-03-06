'use strict';

var app = app || {};

app.postModel = (function(){
    function PostModel(requester){
        this._requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/posts';
    }

    PostModel.prototype.getAllPosts = function(){
        return this._requester.get(this.serviceUrl, true);
    };

    PostModel.prototype.getPostById = function(postId){
        var getByIdUrl = this.serviceUrl + '/' + postId;
        return this._requester.post(getByIdUrl, true);
    };

    PostModel.prototype.addNewPost = function(data){
        return this._requester.get(this.serviceUrl, data, true);
    };

    return {
        load: function(requester){
            return new PostModel(requester);
        }
    }
}());