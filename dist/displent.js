window.Displent = Ember.Application.create();
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
Displent.ApplicationAdapter = DS.RESTAdapter.extend({
	host: 'http://localhost:3223/api'
});


Displent.GistUsersAdapter = DS.RESTAdapter.extend({
	namespace: '/api/fullUsersadadf'
});

//Displent.ApplicationAdapter = DS.FixtureAdapter;
Displent.Profile = DS.Model.extend({
	firstName: DS.attr(),
	lastName: DS.attr(),
	profilePic: DS.attr(),
	membership: DS.attr(),
	memberSince: DS.attr(),
	themePic: DS.attr()
});

Displent.ProfileSerializer = DS.RESTSerializer.extend({
	normalizePayload: function(payload){
		console.log("paylod");
		console.log(payload);
		var idPayload = payload.map(function(profile){
				return {
				id: profile.id,
				firstName: profile.first_name,
				lastName: profile.last_name,
				profilePic: profile.profile_pic,
				membership: profile.membership,
				memberSince: profile.member_since,
				themePic: profile.theme_pic
			};
		});
		//console.log('Hello');
		//console.log(idPayload);
		var result = {profile: idPayload};
		return result;
	}
});
Displent.User = DS.Model.extend({
	firstName: DS.attr(),
	lastName: DS.attr(),
	profilePic: DS.attr(),
	membership: DS.attr()
});

Displent.UserSerializer = DS.RESTSerializer.extend({
	normalizePayload: function(payload){
		var idPayload = payload.map(function(user){
			return {
				id: user.id,
				firstName: user.first_name,
				lastName: user.last_name,
				profilePic: user.profile_pic,
				membership: user.membership
			};
		});
		var result = {user: idPayload};
		return result;
	}
})
Displent.ProfileRoute = Ember.Route.extend({
	model: function(params){
		console.log("params:");
		console.log(params);
		return this.store.find('profile', params.profile_id);
	}
});


Displent.ProfilesRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('profile')
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
/*Displent.ProfileController = Ember.ObjectController.extend({
	modelCheck: function(){
		console.log('Checking model');
		console.log(this.get('model'));	
		return 1;
	}
	
});*/