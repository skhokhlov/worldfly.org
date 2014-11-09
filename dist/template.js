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
    M.v0 = "//get.worldfly.org/storage/main/images";

    var j0 = [ ];

    var j1 = [ 0, 'header' ];

    var j2 = [ 0, 'projects' ];

    var j3 = [ 0, 'title' ];

    var j4 = [ 0, 'link' ];

    var j5 = [ 0, 'href' ];

    var j6 = [ 0, 'body' ];

    var j7 = [ 0, 'separator' ];

    var j8 = [ 0, 'description' ];

    // match /
    M.t0 = function t0(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, selectNametest('header', c0, []), 'block', a0)
        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "b-header b-header_home" + "\">";
        r0 += "<div class=\"" + "b-logo b-logo_home" + "\">";
        r0 += "<img src=\"" + scalar2attrvalue( ( m.v('v0', c0.doc.root) ) ) + "/b-logo_index_black.svg" + "\" alt=\"" + "World Fly" + "\"/>";
        r0 += "</div>";
        r0 += "<div class=\"" + "b-nav b-nav_home" + "\">";
        r0 += "<a class=\"" + "b-nav__link b-nav__link_projects" + "\" href=\"" + "/projects" + "\">" + "Projects" + "</a>";
        r0 += "</div>";
        r0 += "</div>";
        r0 += "<div class=\"" + "b-footer b-footer_home" + "\"><p>" + "2014 © World Fly" + "</p></div>";

        return r0;
    };
    M.t0.j = 1;
    M.t0.a = 1;

    // match / : projects
    M.t1 = function t1(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "b-header" + "\">";
        r0 += "<div class=\"" + "b-logo b-logo_page" + "\">";
        r0 += "<img class=\"" + "b-logo__image b-logo__image_home" + "\" src=\"" + scalar2attrvalue( ( m.v('v0', c0.doc.root) ) ) + "/b-logo_index_black.svg" + "\" alt=\"" + "World Fly" + "\"/>";
        r0 += "</div>";
        r0 += "<div class=\"" + "b-nav" + "\">";
        r0 += "<a class=\"" + "b-nav__link b-nav__link_home" + "\" href=\"" + "/" + "\">" + "Home" + "</a>";
        r0 += "<a class=\"" + "b-nav__link b-nav__link_active b-nav__link_projects" + "\" href=\"" + "/projects" + "\">" + "Projects" + "</a>";
        r0 += "</div>";
        r0 += "</div>";
        r0 += "<div class=\"" + "b-body" + "\">";
        r0 += "<div class=\"" + "b-body__content" + "\">";
        r0 += "<h1 class=\"" + "b-body__title" + "\">" + "Projects" + "</h1>";
        r0 += "<div class=\"" + "b-list" + "\">";
        var items0 = selectNametest('projects', c0, []);
        for (var i1 = 0, l1 = items0.length; i1 < l1; i1++) {
            var c1 = items0[ i1 ];
            r0 += "<div class=\"" + "b-list__item" + "\">";
            r0 += "<h2 class=\"" + "b-list__item__title" + "\">" + nodeset2xml( ( selectNametest('title', c1, []) ) ) + "</h2>";
            r0 += "<div class=\"" + "b-list__item__desrc" + "\">";
            var items1 = selectNametest('link', c1, []);
            for (var i2 = 0, l2 = items1.length; i2 < l2; i2++) {
                var c2 = items1[ i2 ];
                r0 += "<span><a href=\"" + nodeset2attrvalue( ( selectNametest('href', c2, []) ) ) + "\"><span>" + nodeset2xml( ( selectNametest('body', c2, []) ) ) + "</span></a>" + nodeset2xml( ( selectNametest('separator', c2, []) ) ) + "</span>";
            }
            if (simpleBoolean('description', c1)) {
                r0 += "<p>" + nodeset2xml( ( selectNametest('description', c1, []) ) ) + "</p>";
            }
            r0 += "</div>";
            r0 += "</div>";
        }
        r0 += "</div>";
        r0 += "</div>";
        r0 += "</div>";
        r0 += "<div class=\"" + "b-footer" + "\"><p>" + "2014 © World Fly" + "</p></div>";

        return r0;
    };
    M.t1.j = 1;
    M.t1.a = 1;

    M.matcher = {
        "": {
            "": [
                "t0"
            ]
        },
        "projects": {
            "": [
                "t1"
            ]
        }
    };
    M.imports = [];

    yr.register('main', M);

})();
