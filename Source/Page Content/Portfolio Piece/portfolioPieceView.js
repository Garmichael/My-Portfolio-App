define('portfolioPieceView', ['backbone', 'jquery', 'templates', 'siteContentCollection'], function(Backbone, $, templates, siteContentCollection){

    var view = Backbone.View.extend({
        template: templates.portfolioPiece,
        collection: siteContentCollection,

        events: {
            'click .youtube-container' : 'loadYoutubeVideo'
        },

        initialize: function(){
            this.listenTo(this.collection, 'newSelected:piece', this.render);
        },

        render: function(preventTransition){
            var self = this,
                pageModel = self.collection.findWhere({isSelected: true}),
                pieceModel;

            if(pageModel !== undefined){
                pieceModel = pageModel.get('pieces').findWhere({isSelected: true})
            }

            if(pieceModel !== undefined){
                self.setElement('article');

                console.log(preventTransition);

                if(preventTransition){
                    self.$el.html(self.template(pieceModel.toJSON()));
                    self.loadYoutubeThumbs();
                } else {
                    this.$el.fadeOut('fast', function() {
                        self.$el.html(self.template(pieceModel.toJSON())).fadeIn('fast', function () {
                            self.loadYoutubeThumbs();
                        });
                    });
                }
            }

            return self;
        },

        loadYoutubeThumbs: function(){
            var $youtubeThumbs = $('.youtube-container');

            $youtubeThumbs.each(function(index, element){
                var videoId = $(element).data('id');
                $(element).css('background-image', "url('//i.ytimg.com/vi/"+videoId+"/hqdefault.jpg')");
            });
        },

        loadYoutubeVideo: function(event){
            var $container = $(event.target).closest('.youtube-container'),
                $thumbnail = $container.find('.youtube-play-button'),
                $newClip = $('<iframe/>'),
                videoId = $container.data('id');

            $newClip.attr('width', '640')
                .attr('height', '360')
                .attr('src', 'https://www.youtube.com/embed/' + videoId + '?showinfo=0&autoplay=1')
                .attr('frameborder', '0')
                .attr('allowfullscreen', 'true');

            $thumbnail.remove();

            $container.append($newClip);
        }
    });

    return new view();
});