define('resumeView',
    ['backbone', 'jquery', 'templates', 'routerModel'],
    function(Backbone, $, templates, routerModel){

        var view = Backbone.View.extend({
            template: templates.resume,

            initialize: function(){
                var self = this;

                self.setElement('main');

                self.listenTo(routerModel, 'change', function() {
                    if(routerModel.get('page') === 'Resume') {
                        self.render();
                    }
                });
            },

            render: function(){
                var self = this;

                this.$el.fadeOut('fast', function () {
                    self.$el.html(self.template()).fadeIn('fast');
                });

                return this;
            }
        });

        return new view();
    });