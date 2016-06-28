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
