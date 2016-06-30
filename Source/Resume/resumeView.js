define('resumeView',
    ['backbone', 'jquery', 'templates', 'siteContentCollection'],
    function(Backbone, $, templates, siteContentCollection){

        var view = Backbone.View.extend({
            template: templates.resume,

            initialize: function(){
                var self = this;

                self.setElement('main');

                self.render();
                self.listenTo(siteContentCollection, 'newSelected:category', self.render);
            },

            render: function(){
                var self = this,
                    pageModel = siteContentCollection.findWhere({isSelected: true});

                if(pageModel === undefined || pageModel.get('title') !== 'Resume'){
                    return;
                }

                self.$el.fadeOut('fast', function () {
                    self.$el.html(self.template()).fadeIn('fast');
                });

                return this;
            }
        });

        return new view();
    });