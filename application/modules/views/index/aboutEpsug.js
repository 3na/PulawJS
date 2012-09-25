define([
	'text!templates/index/aboutEpsug.html'
], function( aboutEpsug ){

	var homeView = Backbone.View.extend({
		template: _.template( aboutEpsug ),
		render: function(){
			$(this.el).html( this.template() );
			return this;
		}
	});
	
	return new homeView;
	
});