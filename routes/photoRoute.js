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