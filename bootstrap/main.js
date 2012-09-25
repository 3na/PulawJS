/**
 *
 *
 */
//This is our main applicatoon boot loader or bootstrap
//here we are loading necessary scripts dependencies like
//jquery, mobile, text

//@package Bazaar Mobile App alpha version
//May, 31, 2012
//dunhakdis
//http://clubkoncepto.com

/*
*We need to adjust our configuration settings base on your installation path
*I'am using localhost so I will going to write: http://localhost/
*/
var __BASE_URL__ = '/PulawJS-0.1-Alpha-Edition/mobile';
var __BASE__ = '/PulawJS-0.1-Alpha-Edition/mobile/application';

requirejs.config({
	baseUrl: __BASE__ + '/library',
		//except, if the module ID starts with "app",
		//load it from the js/app directory. paths
		//config is relative to the baseUrl, and
		//never includes a ".js" extension since
		//the paths config could be for a directory.
	paths: {
		assets: 	__BASE__ + '/assets',
		app: 		__BASE__ + '/app',
		views: 		__BASE__ + '/modules/views',
		templates: 	__BASE__ + '/modules/templates',
		collections:__BASE__ + '/modules/collections',
		models: 	__BASE__ + '/modules/models',
		async: 		__BASE__ + '/library/async',
		google: 	__BASE__ + '/library/google',
		locate: 	__BASE__ + '/library/locate'
	}
});

// Start the main app logic.
//jquery/mobile
	require(
		["require","jquery","assets/backbone","text","mapstraction","models/app.model", "locate"],
			//frameworks loaded
			function( require, $,Backbone,text,App ) {
				require(["require","app","jquery/mobile"], 
					function( require, App ){
						
						$.mobile.linkBindingEnabled = false;
						$.mobile.hashListeningEnabled = false;
						$.mobile.pushStateEnabled = false;
						$.mobile.loadingMessageTheme = 'a';
						$.mobile.loadingMessageTextVisible = true;		
						$.mobile.defaultPageTransition = 'slide';
						
						$('div[data-role="page"]').live('pagehide', function (event, ui) {
							$(event.currentTarget).remove();
						});
						
						App.initialize();
						
				});	
			}
		);
