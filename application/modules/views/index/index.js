define([
	'text!templates/index/index.html'
], function( homeTemplate ){

	var homeView = Backbone.View.extend({
		template: _.template( homeTemplate ),
		render: function(){
			$(this.el).html( this.template() );
			return this;
		}
	});
	
	return new homeView;
	
});