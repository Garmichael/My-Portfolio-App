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