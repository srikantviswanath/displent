Displent.PhotoController = Ember.ObjectController.extend({
	test: function(){
		var tags = this.get("model.tags");
		console.log("tags:")
		console.log(tags);
	}
});