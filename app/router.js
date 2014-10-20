Displent.Router.map(function(){
	this.resource('users', function(){
		this.resource('user', {path: '/:user_id'}, function(){
			
		});
	});

	this.resource('profiles', function(){
		this.resource('profile', {path: '/:profile_id'}, function(){

		});
	});
});