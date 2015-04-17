var yr = yr || require('yate/lib/runtime.js');

(function() {

    var cmpNN = yr.cmpNN;
    var cmpSN = yr.cmpSN;
    var nodeset2xml = yr.nodeset2xml;
    var nodeset2boolean = yr.nodeset2boolean;
    var nodeset2attrvalue = yr.nodeset2attrvalue;
    var nodeset2scalar = yr.nodeset2scalar;
    var scalar2attrvalue = yr.scalar2attrvalue;
    var xml2attrvalue = yr.xml2attrvalue;
    var scalar2xml = yr.scalar2xml;
    var xml2scalar = yr.xml2scalar;
    var simpleScalar = yr.simpleScalar;
    var simpleBoolean = yr.simpleBoolean;
    var selectNametest = yr.selectNametest;
    var closeAttrs = yr.closeAttrs;

    var M = new yr.Module();

    //  var static : scalar
    M.v0 = "https://get.worldfly.org/storage/main/images";

    var j0 = [ 0, 'page', 0, 'page-params' ];

    //  var params : nodeset
    M.v1 = function(m, c0, i0, l0) {
        return m.s(j0, c0.doc.root);
    };

    var j1 = [ 0, '_page' ];

    //  var page : nodeset
    M.v2 = function(m, c0, i0, l0) {
        return m.n(j1, m.v('v1', c0.doc.root));
    };

    var j2 = [ ];

    var j3 = [ 0, 'title' ];

    var j4 = [ 0, 'page' ];

    var j5 = [ 0, 'page-blocks', 0, '*' ];

    var j6 = [ 0, '*' ];

    var j7 = [ 1, 0 ];

    var j8 = [ 0, 'projects' ];

    var j9 = [ 0, 'project' ];

    var j10 = [ 0, 'logo' ];

    var j11 = [ 0, 'nav' ];

    var j12 = [ 0, 'header' ];

    var j13 = [ 0, 'footer' ];

    // match /
    M.t0 = function t0(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<html>";
        r0 += "<head lang=\"" + "en" + "\">";
        r0 += "<meta charset=\"" + "utf-8" + "\"/>";
        r0 += "<title>" + nodeset2xml( ( m.n(j3, m.v('v1', c0.doc.root)) ) ) + "</title>";
        r0 += "<link rel=\"" + "stylesheet" + "\" href=\"" + "https://fonts.googleapis.com/css?family=Open+Sans&amp;subset=latin" + "\"/>";
        r0 += "<link rel=\"" + "stylesheet" + "\" href=\"" + "/public/app.css" + "\"/>";
        r0 += "</head>";
        r0 += "<body";
        a0.a = {
        };
        a0.s = 'body';
        r0 += m.a(m, 0, selectNametest('page', c0, []), '', a0)
        r0 += closeAttrs(a0);
        r0 += "</body>";
        r0 += "</html>";

        return r0;
    };
    M.t0.j = 1;
    M.t0.a = 1;

    // match .page
    M.t1 = function t1(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "b-page" + "\">";
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("b-page__content")
        };
        a0.s = 'div';
        r0 += m.a(m, 0, m.s(j5, c0), 'block', a0)
        r0 += closeAttrs(a0);
        r0 += "</div>";
        r0 += "</div>";

        return r0;
    };
    M.t1.j = j4;
    M.t1.a = 0;

    // match .* : block
    M.t2 = function t2(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, m.s(j7, c0), 'block-content', a0)

        return r0;
    };
    M.t2.j = j6;
    M.t2.a = 0;

    // match .* : block-content
    M.t3 = function t3(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, selectNametest('*', c0, []), 'block', a0)

        return r0;
    };
    M.t3.j = j6;
    M.t3.a = 0;

    // match .projects : block-content
    M.t4 = function t4(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, selectNametest('project', c0, []), '', a0)

        return r0;
    };
    M.t4.j = j8;
    M.t4.a = 0;

    // match .project
    M.t5 = function t5(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<span>" + nodeset2xml( ( selectNametest('project', c0, []) ) ) + "</span>";

        return r0;
    };
    M.t5.j = j9;
    M.t5.a = 0;

    // match .logo : block-content
    M.t6 = function t6(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
        };
        a0.s = 'div';
        var r1 = '';
        var a1 = { a: {} };
        r1 += "b-logo ";
        if (cmpSN("home", m.v('v2', c0.doc.root))) {
            r1 += "b-logo_home";
        }
        a0.a[ "class" ] = new yr.scalarAttr(r1);
        r0 += closeAttrs(a0);
        if (cmpSN("home", m.v('v2', c0.doc.root))) {
            r0 += "<img class=\"" + "b-logo__image b-logo__image_home" + "\" src=\"" + scalar2attrvalue( ( m.v('v0', c0.doc.root) ) ) + "/b-logo_index_black.svg" + "\" alt=\"" + "World Fly" + "\"/>";
            r0 += "<img class=\"" + "b-logo__slogan" + "\" src=\"" + "https://get.worldfly.org/brands/worldfly/anything_is_possible.svg" + "\" alt=\"" + "Anything is possible" + "\"/>";
        } else if (cmpSN("page", m.v('v2', c0.doc.root))) {
            r0 += "<img class=\"" + "b-logo__image b-logo__image_page" + "\" src=\"" + scalar2attrvalue( ( m.v('v0', c0.doc.root) ) ) + "/b-logo_index_black.svg" + "\" alt=\"" + "World Fly" + "\"/>";
        } else {
            r0 += "<img class=\"" + "b-logo__image" + "\" src=\"" + scalar2attrvalue( ( m.v('v0', c0.doc.root) ) ) + "/b-logo_index_black.svg" + "\" alt=\"" + "World Fly" + "\"/>";
        }
        r0 += "</div>";

        return r0;
    };
    M.t6.j = j10;
    M.t6.a = 0;

    // match .nav : block-content
    M.t7 = function t7(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
        };
        a0.s = 'div';
        var r1 = '';
        var a1 = { a: {} };
        r1 += "b-nav ";
        if (cmpSN("home", m.v('v2', c0.doc.root))) {
            r1 += "b-nav_home";
        }
        a0.a[ "class" ] = new yr.scalarAttr(r1);
        r0 += closeAttrs(a0);
        if (cmpSN("home", m.v('v2', c0.doc.root))) {
            r0 += "<a class=\"" + "b-nav__link b-nav__link_projects" + "\" href=\"" + "/projects" + "\">" + "Projects" + "</a>";
        } else {
            r0 += "<a class=\"" + "b-nav__link b-nav__link_home" + "\" href=\"" + "/" + "\">" + "Home" + "</a>";
            r0 += "<a class=\"" + "b-nav__link b-nav__link_active b-nav__link_projects" + "\" href=\"" + "/projects" + "\">" + "Projects" + "</a>";
        }
        r0 += "</div>";

        return r0;
    };
    M.t7.j = j11;
    M.t7.a = 0;

    // match .header : block
    M.t8 = function t8(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
        };
        a0.s = 'div';
        var r1 = '';
        var a1 = { a: {} };
        r1 += "b-header ";
        if (cmpSN("home", m.v('v2', c0.doc.root))) {
            r1 += "b-header_home";
        }
        a0.a[ "class" ] = new yr.scalarAttr(r1);
        r0 += m.a(m, 0, selectNametest('*', c0, []), 'block', a0)
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t8.j = j12;
    M.t8.a = 0;

    // match .footer : block-content
    M.t9 = function t9(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
        };
        a0.s = 'div';
        var r1 = '';
        var a1 = { a: {} };
        r1 += "b-footer ";
        if (cmpSN("home", m.v('v2', c0.doc.root))) {
            r1 += "b-footer_home";
        }
        a0.a[ "class" ] = new yr.scalarAttr(r1);
        r0 += closeAttrs(a0);
        r0 += "<p>" + "2015 © World Fly" + "</p>";
        r0 += "</div>";

        return r0;
    };
    M.t9.j = j13;
    M.t9.a = 0;

    M.matcher = {
        "": {
            "": [
                "t0"
            ],
            "page": [
                "t1"
            ],
            "project": [
                "t5"
            ]
        },
        "block": {
            "*": [
                "t2"
            ],
            "header": [
                "t8",
                "t2"
            ]
        },
        "block-content": {
            "*": [
                "t3"
            ],
            "projects": [
                "t4",
                "t3"
            ],
            "logo": [
                "t6",
                "t3"
            ],
            "nav": [
                "t7",
                "t3"
            ],
            "footer": [
                "t9",
                "t3"
            ]
        }
    };
    M.imports = [];

    yr.register('common', M);

})();
