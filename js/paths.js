define(function() {

    var config = {
        paths: {
            FAOSTAT_UI_MENU: 'faostat-ui-menu',
            faostat_ui_menu: '../'
        },
        shim: {
            deps: ['text', 'i18n'],
            bootstrap: {
                deps: ['jquery']
            }
        }
    };

    return config;

});