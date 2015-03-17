define(function() {

    var config = {
        paths: {
            FAOSTAT_UI_MENU: 'faostat-ui-menu',
            faostat_ui_menu: '../'
        },
        shim: {
            bootstrap: {
                deps: ['jquery']
            }
        }
    };

    return config;

});