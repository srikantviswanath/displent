window.Displent = Ember.Application.create();
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
	this.resource('search');
		
	
});


/*
1.Add a profile id to user model in django
2.Add a photo id to photoThumbnail in
*/
Displent.ApplicationAdapter = DS.RESTAdapter.extend({
	host: 'http://localhost:3223/api'
});




//Displent.ApplicationAdapter = DS.FixtureAdapter;
Displent.Photo = DS.Model.extend({
	path: DS.attr('string'),
	title: DS.attr('string'),
	owner: DS.belongsTo('user', {async:true}),
	location: DS.attr('string'),
	dateTaken: DS.attr('date'),
	focalLength: DS.attr('number'),
	tags: DS.attr()

});


Displent.PhotoSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin,{
	attrs:{
		owner: {embedded: 'load'}
	},

	normalizePayload: function(payload){
		Ember.keys(payload).forEach(function(key){
			var newKey = Ember.String.camelize(key);
			if (newKey !== key) {
			  payload[newKey] = payload[key];
			  delete payload[key];
			}
		});
		var result = {photo: payload};
		return result;
	}
});
Displent.PhotoThumbnail = DS.Model.extend({
	path: DS.attr('string'),
	title: DS.attr('string'),
	owner: DS.belongsTo('user', {async: true}),

});

Displent.PhotoThumbnailSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin,{
	attrs:{
		owner: {embedded: 'always'}
	},

	normalizePayload: function(payload){
		if(Array.isArray(payload)){
			for(var photoIndex in payload){
				var photo = payload[photoIndex];
				if(typeof(photo) === 'object'){
					Ember.keys(photo).forEach(function(photoKey){
						if(photoKey=='owner'){
							var owner = photo[photoKey];
							Ember.keys(owner).forEach(function(ownerKey){
								var camelKey = Ember.String.camelize(ownerKey);
								if(camelKey != ownerKey){
									owner[camelKey] = owner[ownerKey];
									delete owner[ownerKey];
								}
							});
						}
						var newKey = Ember.String.camelize(photoKey);
						if(newKey != photoKey){
							photo[newKey] = photo[photoKey];
							delete photo[photoKey];
						}
					});
				}
				
			}
			var result = {photoThumbnail: payload};
			return result;
		}
	}
});
Displent.Profile = DS.Model.extend({
	firstName: DS.attr(),
	lastName: DS.attr(),
	profilePic: DS.attr(),
	membership: DS.attr(),
	memberSince: DS.attr(),
	themePic: DS.attr(),
	photo: DS.hasMany('photo', {async:true})
});

//Displent.ProfileAdapter = DS.FixtureAdapter;


Displent.ProfileSerializer = DS.RESTSerializer.extend({
	attrs:{
		photo: {embedded: 'load'}
	},
	
	serializeIntoHash: function(data, type, record, options) {
	    var payload = this.serialize(record, options);
	    Ember.keys(payload).forEach(function(key){
        	var newKey = Ember.String.underscore(key);
        	if(newKey!=key){
        		payload[newKey] = payload[key];
        		delete payload[key];
        	}
        });
	    console.log(payload);
	    Ember.merge(data, payload);
	},

	normalizePayload: function(payload){
		console.log("profile payload:");
		console.log(payload);
		Ember.keys(payload).forEach(function(key){
			
			var newKey = Ember.String.camelize(key);
			if (newKey !== key) {
			  payload[newKey] = payload[key];
			  delete payload[key];
			}
		});
		var result = {profile: payload};
		console.log("result");
		console.log(result);
		return result;
	}

});
Displent.User = DS.Model.extend({
	firstName: DS.attr(),
	lastName: DS.attr(),
	profilePic: DS.attr(),
	membership: DS.attr(),
	
});

Displent.UserSerializer = DS.RESTSerializer.extend({
	normalizePayload: function(payload){
		if(Array.isArray(payload)){
			for(var userIndex in payload){
				var user = payload[userIndex];
				if(typeof(user) === 'object'){
					Ember.keys(user).forEach(function(userKey){
					var newKey = Ember.String.camelize(userKey);
					if(newKey != userKey){
						user[newKey] = user[userKey];
						delete user[userKey];
					}
					});
				}
				
			}
			var result = {user: payload};
			return result;
		}
		else{
			Ember.keys(payload).forEach(function(key){
				var newKey = Ember.String.camelize(key);
				if(newKey != key){
					payload[newKey] = payload[key];
					delete payload[key];
				}
			});
			var result = {user: payload};
			return result;
		}
	}
});
Displent.PhotoRoute = Ember.Route.extend({
	model: function(params){
		var photo = this.store.find('photo', params.photo_id);
		console.log(photo);
		/*if(params.owner.firstName=="Dave"){
			console.log("Dave found");
		}*/
		return photo

	}
});
Displent.PhotoThumbnailsRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('photoThumbnail');
	}
});
Displent.ProfileRoute = Ember.Route.extend({
	model: function(params){
		console.log("params:");
		console.log(params);
		console.log(this.store.find('profile', params.profile_id));
		return this.store.find('profile', params.profile_id);
	}

});


Displent.SearchRoute = Ember.Route.extend({
	model: function(params){
		console.log("search query");
		console.log(params);
	}
});

Displent.UserRoute = Ember.Route.extend({
	afterModel: function(params){
	    this.transitionTo('profile', params.id);
	}
		
});



Displent.UsersRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('user');
	}
})
Displent.PhotoController = Ember.ObjectController.extend({
	defaultTag: null
});
/*Displent.ProfileController = Ember.ObjectController.extend({
	modelCheck: function(){
		console.log('Checking model');
		console.log(this.get('model'));	
		return 1;
	}
	
});*/
Displent.UsersController = Ember.ArrayController.extend({
	actions:{
		addPitre:function(){
			var pitre = this.store.createRecord('profile',{
				
					firstName: "Pitre",
					lastName: "Goud",
					profilePic: "ppics/4",
					membership: "Silver",
					themePic: "tpics/4",
				
				
			});
			pitre.save();
			console.log('adding Pitre');
		}
	}
});