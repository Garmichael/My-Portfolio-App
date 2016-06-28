requirejs.config({
   
    paths: {
        jquery: 'jquery-2.1.4.min',
        handlebars: 'handlebars.runtime.min',
        underscore: 'underscore-min',
        backbone: 'backbone-min',
        templates: 'compiled-templates'
    },
    shim: {
        backbone: {exports: 'backbone'},
        underscore: {exports: 'underscore'},
        jquery: {exports: 'jquery'}
    }
});

require(['portfolio']);