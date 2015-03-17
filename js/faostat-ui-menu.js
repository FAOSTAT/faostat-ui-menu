define(['jquery',
        'handlebars',
        'text!faostat_ui_menu/html/templates.html',
        'i18n!faostat_ui_menu/nls/translate',
        'bootstrap',
        'sweetAlert',
        'amplify'], function ($, Handlebars, templates, translate) {

    'use strict';

    function MENU() {

        this.CONFIG = {

            lang: 'E',
            placeholder_id: 'faostat_ui_menu',
            prefix: 'fenix_'

        };

    }

    MENU.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Fix the language, if needed. */
        this.CONFIG.lang = this.CONFIG.lang != null ? this.CONFIG.lang : 'E';

        /* Load template. */
        var source = $(templates).filter('#faostat_ui_menu_structure').html();
        var template = Handlebars.compile(source);
        var dynamic_data = {
            toggle_navigation: translate.toggle_navigation,
            home: translate.home,
            browse: translate.browse,
            download: translate.download,
            compare: translate.compare,
            search: translate.search,
            analysis: translate.analysis,
            mes: translate.mes,
            signin: translate.signin
        };
        var html = template(dynamic_data);
        $('#' + this.CONFIG.placeholder_id).html(html);

    };

    return MENU;

});