'use strict';

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

define('router', ['backbone'], function(Backbone){

    var router = Backbone.Router.extend({
        routes: {
            '' : 'page',
            ':page'  : 'page',
            ':page/' : 'page',
            ':page/:subPage'  : 'page',
            ':page/:subPage/ ': 'page'
        }
    });

    return new router;
});

define('routerModel', ['backbone'], function(Backbone){

    var model = Backbone.Model.extend();

    return new model({});
});

define('routerRoutes',
['backbone', 'router', 'routerModel'],
function(Backbone, router, routerModel)
{
    router.on('route:page', function(page, subPage) {
        if(page == null){
            page = '';
        }

        if(subPage == null){
            subPage = '';
        }

        routerModel.set({
            'page' : page,
            'subPage' : subPage
        });
    });

    Backbone.history.start({pushState: true});

});

define('siteContentCollection',
    ['backbone', 'routerModel', 'siteContentData'],
    function(Backbone, routerModel, siteContentData){

        var collection = Backbone.Collection.extend({
            model: Backbone.Model,

            initialize: function(){
                this.addContent();
                this.listenTo(routerModel, 'change', this.selectItem);
            },

            selectItem: function(){
                var selectedCategoryModel = this.findWhere({link: routerModel.get('page')}),
                    selectedPieceCollection,
                    selectedPieceModel;

                if(selectedCategoryModel === undefined){
                    selectedCategoryModel = this.at(0);
                }

                if(selectedCategoryModel.get('isSelected')){
                    this.unselectItems('pieces');
                    selectedPieceCollection = selectedCategoryModel.get('pieces');
                    selectedPieceModel = selectedPieceCollection.findWhere({link: routerModel.get('subPage')}) || selectedPieceCollection.at(0);

                    if (selectedPieceModel !== undefined) {
                        selectedPieceModel.set({isSelected: true}, {silent: true});
                    }

                    this.trigger('newSelected:piece');

                } else {
                    this.unselectItems('all');
                    selectedCategoryModel.set({isSelected: true}, {silent: true});

                    selectedPieceCollection = selectedCategoryModel.get('pieces');
                    selectedPieceModel = selectedPieceCollection.findWhere({link: routerModel.get('subPage')}) || selectedPieceCollection.at(0);

                    if (selectedPieceModel !== undefined) {
                        selectedPieceModel.set({isSelected: true}, {silent: true});
                    }

                    this.trigger('newSelected:category');
                }
            },

            unselectItems: function(mode){
                this.each(function(model) {
                    if(mode === 'all'){
                        model.set({isSelected: false},{silent: true});
                    }

                    model.get('pieces').each(function(pieceModel){
                        pieceModel.set({isSelected: false},{silent: true});
                    })
                });
            },

            addContent: function(){

                this.add({
                    link: 'GameDev',
                    icon: 'fa-gamepad',
                    title: 'Game Dev',
                    pieces: new Backbone.Collection([
                        siteContentData.slideyBlocks,
                        siteContentData.buildABadGuyWorkshop,
                        siteContentData.dontLoseHope,
                        siteContentData.projectBoomerang,
                        siteContentData.nsmbCustomLevels,
                        siteContentData.theLogicDetective,
                        siteContentData.zombieEscape,
                        siteContentData.outPost,
                        siteContentData.boxcars,
                        siteContentData.actionTBS,
                        siteContentData.sierra7,
                        siteContentData.toLoseTheMoon,
                        siteContentData.horsemanCometh,
                        siteContentData.elementalInbalance

                    ])
                });

                this.add({
                    link: 'WebDev',
                    icon: 'fa-desktop',
                    title: 'Web Dev',
                    pieces: new Backbone.Collection([
                        siteContentData.develteam,
                        siteContentData.develteamRebuild,
                        siteContentData.sealedDeckBuilder,
                        siteContentData.buildABadGuyWorkshop,
                        siteContentData.zombieEscape,
                        siteContentData.oldPortfolio
                    ])
                });

                this.add({
                    link: 'Art',
                    icon: 'fa-paint-brush',
                    title: 'Art',
                    pieces: new Backbone.Collection([
                        siteContentData.marioGalaxyRenders,
                        siteContentData.paperMarioAssets,
                        siteContentData.oldPortfolio
                    ])
                });

                this.add({
                    link: 'Resume',
                    icon: 'fa-file-text',
                    title: 'Resume',
                    pieces: new Backbone.Collection()
                });

            }
        });

        return new collection();
    });

define('siteContentData', ['templates'], function(templates){
    return {
        develteam: {
            title: 'Develteam',
            link: 'Develteam',
            date: '2013 - Present',
            tools: 'HTML, PHP, Javascript, Jquery, MySQL',
            icon: 'develteam.png',
            content: templates.pieceDevelteamV1()
        },

        develteamRebuild: {
            title: 'Develteam Rebuild Project',
            link: 'DevelteamRebuild',
            date: '2016',
            tools: 'NodeJS, RestfulAPI, HTML5, Javascript, RequireJS, BackboneJS, Jquery, Handlebars + Custom Helpers, LESS, CSS3, MySQL, Grunt, Single Page Application (SPA)',
            icon: 'develteamRebuild.png',
            content: templates.pieceDevelteamV2()
        },

        sealedDeckBuilder: {
            title: 'Magic the Gathering: Sealed Deck Builder',
            link: 'MtgDeckBuilder',
            date: '2012',
            tools: 'HTML, Javascript, JQuery, CSS',
            icon: 'sealedDeckBuilder.png',
            content: templates.pieceMtgSealedDeckBuilder()
        },

        buildABadGuyWorkshop:{
            title: 'Build a Bad Guy Workshop',
            link: 'BuildABadGuyWorkshop',
            date: '2014',
            tools: 'HTML, Javascript, Jquery, Canvas, CSS',
            icon: 'buildABadGuyWorkshop.png',
            content: templates.pieceBuildABadGuyWorkshop()
        },

        oldPortfolio: {
            title: 'Old Portfolio Site',
            link: 'OldPortfolio',
            date: '2014',
            tools: 'PHP, HTML5, MySQL, Javascript, Jquery, Canvas, CSS3, 3D Studio Max, Photoshop',
            icon: 'oldPortfolio.png',
            content: templates.pieceOldPortfolio()
        },

        zombieEscape: {
            title: 'Zombie Escape Prototype',
            link: 'ZombieEscape',
            date: '2015',
            tools: 'HTML5, CSS, Javascript, AngularJS',
            icon: 'zombieEscape.png',
            content: templates.pieceZombieEscape()
        },

        slideyBlocks: {
            title: 'Slidey Blocks',
            link: 'SlideyBlocks',
            date: '2015-2016',
            tools: 'Unity3D, C#, Photoshop, Illustrator',
            icon: 'slideyBlocks.png',
            content: templates.pieceSlideyBlocks()
        },

        outPost: {
            title: 'Prototype: "Outpost"',
            link: 'OutpostPrototype',
            date: '2014',
            tools: 'Unity3D, C#',
            icon: 'outpost.png',
            content: templates.pieceOutpost()
        },

        boxcars: {
            title: 'Prototype: "Boxcars"',
            link: 'Boxcars',
            date: '2014',
            tools: 'Unity3D, C#',
            icon: 'boxcars.png',
            content: templates.pieceBoxcars()
        },

        actionTBS: {
            title: 'Prototype: "Action TBS"',
            link: 'ActionTBS',
            date: '2014',
            tools: 'Unity3D, C#',
            icon: 'actionTBS.png',
            content: templates.pieceActionTBS()
        },

        projectBoomerang: {
            title: 'Work in Progress: "Project Boomerang"',
            link: 'ProjectBoomerang',
            date: '2016',
            tools: 'Unity3D, C#, XML',
            icon: 'projectBoomerang.png',
            content: templates.pieceBoomerang()
        },

        horsemanCometh: {
            isSeleccted: false,
            title: 'Prototype: The Horseman Cometh',
            link: 'TheHorsemanCometh',
            date: '2008',
            tools: 'Unreal Engine 3, UnityScript',
            icon: 'horsemanCometh.png',
            content: templates.pieceHorsemanCometh()
        },

        elementalInbalance: {
            title: 'Prototype: Elemental Inbalance',
            link: 'ElementalInbalance',
            date: '2008',
            tools: 'Warcraft 3 Editor, Jazz Scripting Language',
            icon: 'elementalInbalance.png',
            content: templates.pieceElementalInbalance()
        },

        nsmbCustomLevels: {
            title: 'NSMB Custom Levels',
            link: 'NewSuperMarioBrosDsCustomLevels',
            date: '2011-2012',
            tools: 'New Super Mario Bros DS, Treeki\'s NSMB Editor',
            icon: 'marioLevels.png',
            content: templates.pieceNsmbCustomLevels()
        },

        dontLoseHope: {
            title: 'Work In Progress: Don\'t Lose Hope',
            link: 'DontLoseHope',
            date: '2016',
            tools: 'Unity3D, C#, Photoshop',
            icon: 'dontLoseHope.png',
            content: templates.pieceDontLoseHope()
        },

        theLogicDetective: {
            title: 'Prototype: "The logic Detective"',
            link: 'TheLogicDetective',
            date: '2015',
            tools: 'Unity3D, C#, 3D Studio Max, Photoshop',
            icon: 'theLogicDetective.png',
            content: templates.pieceTheLogicDetective()
        },

        numbers: {
            title: 'Prototype: "Numbers"',
            link: 'Numbers',
            date: '2014',
            tools: 'Unity3D, C#',
            icon: 'numbers.png',
            content: templates.pieceNumbers()
        },

        sierra7: {
            title: 'Prototype: "Sierra 7"',
            link: 'Sierra7',
            date: '2011-2012',
            tools: 'Flash, Actionscript 3, Flixel Engine, Photoshop',
            icon: 'sierra7.png',
            content: templates.pieceSierra7()
        },

        toLoseTheMoon: {
            title: 'Prototype: "To Lose The Moon"',
            link: 'ToLoseTheMoon',
            date: '2013',
            tools: 'Unreal Development Kit (UDK), UnityScript',
            icon: 'toLoseTheMoon.png',
            content: templates.pieceToLoseTheMoon()
        },

        marioGalaxyRenders: {
            title: 'Super Mario Galaxy Strategy Guide Map Renders',
            link: 'MarioGalaxyRenders',
            date: '2007',
            tools: '3D Studio Max, Photoshop, Illustrator',
            icon: 'marioGalaxyRenders.png',
            content: templates.pieceSuperMarioGalaxyRenders()
        },

        paperMarioAssets: {
            title: 'Super Paper Mario Assets',
            link: 'SuperPaperMarioAssets',
            date: '2006',
            tools: 'Illustrator',
            icon: 'paperMarioAssets.png',
            content: templates.pieceSuperPaperMarioAssets()
        }



    }
});


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

require(['siteNavView']);
require(['resumeView']);
require(['pageContentView']);
require(['routerRoutes']);