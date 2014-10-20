Displent.ProfileRoute = Ember.Route.extend({
	model: function(params){
		console.log("params:");
		console.log(params);
		return this.store.find('profile', params.profile_id);
	}
});

