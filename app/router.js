Displent.Router.map(function(){
	this.resource('users', function(){
		this.resource('user', {path: '/:user_id'}, function(){
			
		});
	});

	//this.resource('profiles', function(){});

	this.resource('profile', {path: '/profiles/:profile_id'}, function(){});



	this.resource('photoThumbnails', function(){
		this.resource('photoThumbnail', {path: 'photoThumbnails/:photoThumbnail_id'}, function(){

		});
	});

	//this.resource('photos', function(){});
	this.resource('photo', {path: '/photos/:photo_id'}, function(){});

		
	
});


/*
1.Add a profile id to user model in django
2.Add a photo id to photoThumbnail in
*/