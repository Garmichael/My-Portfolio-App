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