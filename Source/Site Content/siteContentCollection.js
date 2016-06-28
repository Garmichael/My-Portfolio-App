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