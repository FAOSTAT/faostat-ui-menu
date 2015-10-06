define(['jquery',
        'handlebars',
        'config/Config',
        'text!faostat_ui_menu/html/templates.hbs',
        'i18n!faostat_ui_menu/nls/translate',
        'faostatapiclient',
        'globals/Common',
        'chaplin',
        'underscore',
        'amplify'], function ($, Handlebars, C, templates, translate, FAOSTATAPIClient, Common, Chaplin, _) {

    'use strict';

    function MENU() {

        this.CONFIG = {

            prefix: 'fenix_',
            placeholder_id: 'faostat_ui_menu',

            DOWNLOAD_BASE_URL: '#' + Common.getLocale() + '/download/metadata/',
            BROWSE_BASE_URL: '#' + Common.getLocale() + '/browse/domain/'

        };

    }

    MENU.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        this.FAOSTATAPIClient = new FAOSTATAPIClient();

        /* Load template. */
        var source = $(templates).filter('#faostat_ui_menu_structure').html();
        var template = Handlebars.compile(source);

        // TODO: use Chaplinjs per il routing
        var dynamic_data = {
            fao_label: translate.fao_label,
            ess_label: translate.ess_label,
            toggle_navigation: translate.toggle_navigation,
            home: translate.home,
            home_link: '#'+ Common.getLocale() +'/home/',
            browse: translate.browse,
            download: translate.download,
            compare: translate.compare,
            compare_link: '#'+ Common.getLocale() +'/compare',
            search: translate.search,
            search_link: '#'+ Common.getLocale() +'/search',
            analysis: translate.analysis,
            analysis_link: '#'+ Common.getLocale() +'/analysis',
            mes: translate.mes,
            mes_link: '#'+ Common.getLocale() +'/standards/units'
        };
        var html = template(dynamic_data);
        $('#' + this.CONFIG.placeholder_id).html(html);

        /* Show Groups. */
        this.initDropDowns();
    };

    MENU.prototype.initDropDowns = function() {

        var self = this;

        // TODO: check if are needed two calls for a blacklist on browse or domains
        this.FAOSTATAPIClient.groups({
            datasource: C.DATASOURCE,
            lang: Common.getLocale(),
            // TODO: add download/browse groups blacklist if needed
        }).then(function(json) {
            self.buildDropDownMenu('#browse_dropdown', self.CONFIG.BROWSE_BASE_URL, json.data);
            self.buildDropDownMenu('#download_dropdown', self.CONFIG.DOWNLOAD_BASE_URL, json.data);
        });

    };

    MENU.prototype.buildDropDownMenu = function(id, baseURL, json) {

        var data = [];

        _.forEach(json, _.bind(function(v) {
            data.push({
                item_link: baseURL + v.code,
                item_title: v.label
            });
         }, this));

        this.renderDD(id, data);

    };

    MENU.prototype.renderDD = function(id, data) {
        var source = $(templates).filter('#faostat_ui_menu_item').html();
        var template = Handlebars.compile(source);
        var dynamic_data = {group: data};
        var html = template(dynamic_data);
        $(id).html(html);
    };

    return MENU;

});