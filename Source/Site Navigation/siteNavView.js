define('siteNavView',
    ['backbone', 'jquery', 'templates', 'router', 'routerModel', 'siteContentCollection'],
    function(Backbone, $, templates, router, routerModel, siteContentCollection){

        var view = Backbone.View.extend({
            template: templates.siteNavView,
            collection: siteContentCollection,

            events: {
                'click a' : 'navigate'
            },

            initialize: function(){
                this.listenTo(this.collection, 'change add', this.render);
                this.listenTo(routerModel, 'change', this.render);
            },

            render: function(){
                this.setElement('body header nav');
                this.$el.html(this.template({navItems: this.collection.toJSON()}));
                this.$el.closest('header').show();

                return this;
            },

            navigate: function(event){
                var $selectedItem = $(event.target).closest('a');

                router.navigate($selectedItem.attr('href'), {trigger: true});

                $selectedItem.blur();
                event.preventDefault();
            }
        });

        return new view();
    });