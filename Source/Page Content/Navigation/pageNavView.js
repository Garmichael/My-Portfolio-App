define('pageNavView', ['backbone', 'templates', 'siteContentCollection'], function(Backbone, templates, siteContentCollection){

    var view = Backbone.View.extend({
        template: templates.pageNav,
        collection: siteContentCollection,

        initialize: function(){
            this.listenTo(this.collection, 'newSelected:piece', this.render);
        },

        render: function(){
            var pageModel = this.collection.findWhere({isSelected: true}).get('pieces');

            this.setElement('ul.menu');
            this.$el.html(this.template({pieces: pageModel.toJSON()}));
        }

    });

    return new view();
});