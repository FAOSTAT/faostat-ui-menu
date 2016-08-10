/*global define*/
/*jslint nomen: true*/
define(['jquery',
        'loglevel',
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
        'chaplin'], function ($, log, C, ROUTE, CB, Handlebars, templates, i18nLabels, FAOSTATAPIClient, Common, _) {

    'use strict';

    var s = {

        NAVBAR_COLLAPSE: ".navbar-collapse"

    };

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
            definitions: i18nLabels.definitions,
            definitions_link: '#' + Common.getURI(ROUTE.DEFINITIONS),
            faq: i18nLabels.faq,
            faq_link: '#' + Common.getURI(ROUTE.FAQ),
            data: i18nLabels.data,
            data_link: '#' + Common.getURI(ROUTE.DATA),
            search_placeholder: i18nLabels.search_placeholder,
            browse_by_country_link: '#' + Common.getURI(ROUTE.BROWSE_BY_COUNTRY),
            browse_by_country: i18nLabels.browse_by_country
            //infographics: '#' + Common.getURI(ROUTE.INFOGRAPHICS)
        };

        this.$MENU.html(t(d));

    };

    MENU.prototype.collapse = function() {

        this.$MENU.find(s.NAVBAR_COLLAPSE).collapse('hide');


    };

    MENU.prototype.select = function(active) {

        log.info("Menu.select;", active);

        // reset selection
        this.$MENU.find('li.active').removeClass('active');
        // hack for home icon selection that is not a <li>.
        this.$MENU.find('a.active').removeClass('active');

        if (active) {
            this.$MENU.find('li[data-role="fs-menu-' + active + '"] ').addClass("active");
            this.$MENU.find('a[data-role="fs-menu-' + active + '"] ').addClass("active");
        } else {
            if (active) {
                this.$MENU.find('li[data-role="fs-menu-' + active+ '"] ').addClass("active");
                this.$MENU.find('a[data-role="fs-menu-' + active+ '"] ').addClass("active");
            }
        }

    };

    return MENU;

});