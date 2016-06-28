define('pageContentView',
    ['backbone', 'jquery', 'templates', 'router', 'routerModel', 'siteContentCollection', 'portfolioPieceView', 'pageNavView'],
    function(Backbone, $, templates, router, routerModel, siteContentCollection, portfolioPieceView, pageNavView){

        var view = Backbone.View.extend({
            template: templates.pageContent,
            collection: siteContentCollection,

            events: {
                'click a' : 'navigate'
            },

            initialize: function(){
                this.setElement('main');
                this.render();

                this.listenTo(this.collection, 'newSelected:category', this.render);
            },

            render: function(){
                var self = this,
                    pageModel = self.collection.findWhere({isSelected: true});

                if(pageModel === undefined || pageModel.get('pieces').length === 0){
                    return self;
                }

                self.$el.fadeOut('fast', function(){
                    self.$el.html(self.template());
                    portfolioPieceView.render(true);
                    pageNavView.render();

                    self.$el.fadeIn('fast');
                });

                return this;
            },

            navigate: function(event){
                var $link = $(event.target).closest('a'),
                    firstSegment = routerModel.get('page') || siteContentCollection.at(0).get('link');

                if($link.data('externalLink')){
                    window.open($link.attr('href'),'_blank');
                } else {
                    router.navigate(firstSegment + '/' + $link.attr('href'), {trigger: true});
                }

                event.preventDefault();
            }
        });

        return new view();
    });