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