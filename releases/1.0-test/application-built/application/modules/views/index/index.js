define(["collections/app.collection","text!templates/index/index.html"],function(collection,homeTemplate){var homeView=Backbone.View.extend({template:_.template(homeTemplate),render:function(){return $(this.el).html(this.template()),this}});return new homeView})