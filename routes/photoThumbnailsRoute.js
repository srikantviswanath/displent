Displent.PhotoThumbnailsRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('photoThumbnail');
	}
});