'use strcit';

var app = app || {};

app.userModel = (function(){
	function UserModel(requester){
		this._requester = requester;
		this._serviceUrl = requester.baseUrl + 'user/' + requester.appId + '/';
	}

	UserModel.prototype.login = function(data) {
		var loginUrl = this._serviceUrl + 'login/';
		
		return this._requester.post(loginUrl, data);
	};

	UserModel.prototype.register = function(data) {
		return this._requester.post(this._serviceUrl, data);
	};

	UserModel.prototype.logout = function() {
		var logoutUrl = this._serviceUrl + '_logout/';
		
		return this._requester.post(logoutUrl, null, true);
	};

	return{
		load: function(requester){
			return new UserModel(requester)
		}
	}
}());