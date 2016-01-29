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
        'chaplin'], function ($, C, ROUTE, CB, Handlebars, templates, translate, FAOSTATAPIClient, Common, _) {

    'use strict';

    function MENU() {

        this.CONFIG = {

            prefix: 'fenix_',
            placeholder_id: 'faostat_ui_menu',

            // TODO: switch to a common ROUTE configuration file!
            DOWNLOAD_BASE_URL: '#' + Common.getLocale() + '/download/about/',
            BROWSE_BASE_URL: '#' + Common.getLocale() + '/browse/domain/'

        };

    }

    MENU.prototype.init = function (config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        this.$menu = $('#' + this.CONFIG.placeholder_id);

        this.FAOSTATAPIClient = new FAOSTATAPIClient();

        /* Load template. */
        var source = $(templates).filter('#faostat_ui_menu_structure').html(),
            t = Handlebars.compile(source),
            d;

        d = {
            home: translate.home,
            home_link: '#' + Common.getLocale() + '/' + ROUTE.HOME + '/',
            browse: translate.browse,
            download: translate.download,
            compare: translate.compare,
            indicators: translate.indicators,
            indicators_link: '#' + Common.getLocale() + '/indicators',
            compare_link: '#' + Common.getLocale() + '/compare',
            search: translate.search,
            search_link: '#' + Common.getLocale() + '/search',
            analysis: translate.analysis,
            analysis_link: '#' + Common.getLocale() + '/analysis',
            mes: translate.mes,
            mes_link: '#' + Common.getLocale() + '/standards/methodologies'
        };


        this.$menu.html(t(d));

        /* Show Groups. */
        this.initDropDowns();

    };

    MENU.prototype.initDropDowns = function () {

        var self = this;

        this.FAOSTATAPIClient.groups({
            datasource: C.DATASOURCE,
            lang: Common.getLocale()
        }).then(function (json) {
            self.buildDropDownMenu('#browse_dropdown', self.CONFIG.BROWSE_BASE_URL, json.data, CB.whitelist);
            self.buildDropDownMenu('#download_dropdown', self.CONFIG.DOWNLOAD_BASE_URL, json.data);
        });

    };

    MENU.prototype.buildDropDownMenu = function (id, baseURL, json, whitelist) {

        var data = [],
            wl = whitelist || [];

        _.forEach(json, _.bind(function (v) {
            var d = {};

            if (wl.length > 0) {
                if ($.inArray(v.code, wl) >= 0) {
                    d = {

                        item_link: baseURL + v.code,
                        item_title: v.label
                    };
                    data.push(d);
                }

            }else {
                d = {
                    item_link: baseURL + v.code,
                    item_title: v.label
                };
                data.push(d);
            }



        }, this));

        // render the DD
        this.renderDD(id, data);

    };

    MENU.prototype.renderDD = function (id, data) {

        var source = $(templates).filter('#faostat_ui_menu_item').html(),
            t = Handlebars.compile(source);

        $(id).html(t( {group: data}));

    };

    MENU.prototype.select = function(active) {

        //reset selection
        this.$menu.find('li.active').removeClass('active');

        if (active) {
            this.$menu.find('li[id="fs-menu-' + active + '"] ').addClass("active");
        } else {
            if (active) {
                this.$menu.find('li[id="fs-menu-' + active+ '"] ').addClass("active");
            }
        }

        return this.$template;

    };

    return MENU;

});