/*global define*/
/*jslint nomen: true*/
define(['jquery',
        'config/Config',
        'config/Routes',
        'config/browse_by_domain/Config',
        'handlebars',
        'text!faostat_ui_menu/html/templates.hbs',
        'i18n!faostat_ui_menu/nls/translate',
        'faostatapiclient',
        'globals/Common',
        'underscore',
        'amplify',
        'chaplin'], function ($, C, ROUTE, CB, Handlebars, templates, i18nLabels, FAOSTATAPIClient, Common, _) {

    'use strict';

    function MENU() {

        this.o = {

            prefix: 'fenix_',
            placeholder_id: 'faostat_ui_menu'

        };

    }

    MENU.prototype.init = function (config) {

        /* Extend default configuration. */
        this.o = $.extend(true, {}, this.o, config);

        this.o.lang = Common.getLocale();

        this.$MENU = $('#' + this.o.placeholder_id);

        this.FAOSTATAPIClient = new FAOSTATAPIClient();

        /* Load template. */
        var source = $(templates).filter('#faostat_ui_menu_structure').html(),
            t = Handlebars.compile(source),
            d;

        d = {
            home: i18nLabels.home,
            home_link: '#' + Common.getURI(ROUTE.HOME),
            browse: i18nLabels.browse,
            download: i18nLabels.download,
            compare: i18nLabels.compare,
            indicators: i18nLabels.indicators,
            indicators_link:  '#' + Common.getURI(ROUTE.INDICATORS),
            compare_link: '#' + Common.getURI(ROUTE.COMPARE),
            search_data: i18nLabels.search_data,
            mes: i18nLabels.mes,
            mes_link: '#' + Common.getURI(ROUTE.METHODOLOGIES),
            faq: i18nLabels.faq,
            faq_link: '#' + Common.getURI(ROUTE.FAQ),
            data: i18nLabels.data,
            data_link: '#' + Common.getURI(ROUTE.DATA),
            //infographics: '#' + Common.getURI(ROUTE.INFOGRAPHICS)
        };

        this.$MENU.html(t(d));

        // set language in the menu
        this.setLang();

    };

    MENU.prototype.setLang = function() {

        this.$MENU.find('[data-locale="lang"]')
            .prepend(this.$MENU.find('[data-locale="'+ this.o.lang +'"]').text()
        );

    };

    MENU.prototype.select = function(active) {

        //reset selection
        this.$MENU.find('li.active').removeClass('active');

        if (active) {
            this.$MENU.find('li[id="fs-menu-' + active + '"] ').addClass("active");
        } else {
            if (active) {
                this.$MENU.find('li[id="fs-menu-' + active+ '"] ').addClass("active");
            }
        }

    };

    return MENU;

});