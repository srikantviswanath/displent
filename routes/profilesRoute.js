Displent.ProfilesRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('profile')
	}
});