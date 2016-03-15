Displent.ProfileRoute = Ember.Route.extend({
	model: function(params){
		console.log("params:");
		console.log(params);
		console.log(this.store.find('profile', params.profile_id));
		return this.store.find('profile', params.profile_id);
	}

});

