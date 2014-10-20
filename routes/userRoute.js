Displent.UserRoute = Ember.Route.extend({
	afterModel: function(params){
	    this.transitionTo('profile', params.id);
	}
		
});
