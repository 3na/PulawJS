define(["text!templates/directory/settings.html"],function(template){var View=Backbone.View.extend({template:_.template(template),render:function(){return $(this.el).html(this.template()),this}});return new View})