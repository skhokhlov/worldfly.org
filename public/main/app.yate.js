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

    var j2 = [ 0, 'data', 0, 'nojs' ];

    // func url(url) : attr
    M.f0 = function f0(m, c0, i0, l0, a0, v3) {
        if (cmpSN("true", m.s(j2, c0.doc.root))) {
            a0.a[ "href" ] = new yr.scalarAttr(( v3 ) + "?nojs=true");
        } else {
            a0.a[ "href" ] = new yr.scalarAttr(( v3 ));
        }

        return a0.a;
    };

    var j3 = [ ];

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

    var j14 = [ 0, 'data', 0, 'year' ];

    var j15 = [ 0, 'body' ];

    var j16 = [ 0, 'page', 0, 'projects' ];

    var j17 = [ 0, 'list', 0, 'project' ];

    var j18 = [ 0, 'id' ];

    var j19 = [ 0, 'title' ];

    var j20 = [ 0, 'years' ];

    var j21 = [ 0, 'years', 0, 'begin' ];

    var j22 = [ 0, 'years', 0, 'end' ];

    var j23 = [ 0, 'link' ];

    var j24 = [ 0, 'href' ];

    var j25 = [ 0, 'separator' ];

    var j26 = [ 0, 'description' ];

    // match /
    M.t0 = function t0(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, selectNametest('page', c0, []), '', a0)
        r0 += closeAttrs(a0);
        if (cmpSN("true", m.s(j2, c0.doc.root))) {
            r0 += "<div class=\"" + "i-stat" + "\">";
            r0 += "<noscript><img src=\"" + "//mc.yandex.ru/watch/206275" + "\" style=\"" + "position:absolute; left:-9999px;" + "\"/></noscript>";
            r0 += "</div>";
        }

        return r0;
    };
    M.t0.j = 1;
    M.t0.a = 1;

    // match .page
    M.t1 = function t1(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("page__content")
        };
        a0.s = 'div';
        r0 += m.a(m, 0, m.s(j5, c0), 'block', a0)
        r0 += closeAttrs(a0);
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
        r1 += "logo ";
        if (cmpSN("home", m.v('v2', c0.doc.root))) {
            r1 += "logo_home";
        }
        a0.a[ "class" ] = new yr.scalarAttr(r1);
        r0 += closeAttrs(a0);
        if (cmpSN("home", m.v('v2', c0.doc.root))) {
            r0 += "<img class=\"" + "logo__image logo__image_home" + "\" src=\"" + scalar2attrvalue( ( m.v('v0', c0.doc.root) ) ) + "/b-logo_index_black.svg" + "\" alt=\"" + "World Fly" + "\"/>";
            r0 += "<img class=\"" + "logo__slogan" + "\" src=\"" + "https://get.worldfly.org/brands/worldfly/anything_is_possible.svg" + "\" alt=\"" + "Anything is possible" + "\"/>";
        } else if (cmpSN("page", m.v('v2', c0.doc.root))) {
            r0 += "<img class=\"" + "logo__image logo__image_page" + "\" src=\"" + scalar2attrvalue( ( m.v('v0', c0.doc.root) ) ) + "/b-logo_index_black.svg" + "\" alt=\"" + "World Fly" + "\"/>";
        } else {
            r0 += "<img class=\"" + "logo__image" + "\" src=\"" + scalar2attrvalue( ( m.v('v0', c0.doc.root) ) ) + "/b-logo_index_black.svg" + "\" alt=\"" + "World Fly" + "\"/>";
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
        r1 += "nav ";
        if (cmpSN("home", m.v('v2', c0.doc.root))) {
            r1 += "nav_home";
        }
        a0.a[ "class" ] = new yr.scalarAttr(r1);
        r0 += closeAttrs(a0);
        if (cmpSN("home", m.v('v2', c0.doc.root))) {
            r0 += "<a";
            a0.a = {
                'class': new yr.scalarAttr("nav__link nav__link_projects")
            };
            a0.s = 'a';
            m.f('f0', c0, i0, l0, a0, "/projects");
            r0 += closeAttrs(a0);
            r0 += "<span>" + "Projects" + "</span></a>";
        } else {
            r0 += "<a";
            a0.a = {
                'class': new yr.scalarAttr("nav__link nav__link_home")
            };
            a0.s = 'a';
            m.f('f0', c0, i0, l0, a0, "/");
            r0 += closeAttrs(a0);
            r0 += "<span>" + "Home" + "</span></a>";
            r0 += "<a";
            a0.a = {
                'class': new yr.scalarAttr("nav__link nav__link_active nav__link_projects")
            };
            a0.s = 'a';
            m.f('f0', c0, i0, l0, a0, "/projects");
            r0 += closeAttrs(a0);
            r0 += "<span>" + "Projects" + "</span></a>";
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
        r1 += "header ";
        if (cmpSN("home", m.v('v2', c0.doc.root))) {
            r1 += "header_home";
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
        r1 += "footer ";
        if (cmpSN("home", m.v('v2', c0.doc.root))) {
            r1 += "footer_home";
        }
        a0.a[ "class" ] = new yr.scalarAttr(r1);
        r0 += closeAttrs(a0);
        r0 += "<p>" + "2008—" + nodeset2xml( ( m.s(j14, c0.doc.root) ) ) + " © World Fly" + "</p>";
        r0 += "</div>";

        return r0;
    };
    M.t9.j = j13;
    M.t9.a = 0;

    // match .body : block
    M.t10 = function t10(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("body")
        };
        a0.s = 'div';
        r0 += m.a(m, 0, m.s(j7, c0), 'block-content', a0)
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t10.j = j15;
    M.t10.a = 0;

    // match .body : block-content
    M.t11 = function t11(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "body__content" + "\">";
        r0 += "<h1 class=\"" + "body__title" + "\">" + nodeset2xml( ( m.n(j12, m.v('v1', c0.doc.root)) ) ) + "</h1>";
        r0 += m.a(m, 0, selectNametest('*', c0, []), 'block', a0)
        r0 += "</div>";

        return r0;
    };
    M.t11.j = j15;
    M.t11.a = 0;

    // match .projects : block-content
    M.t12 = function t12(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, m.s(j16, c0.doc.root), '', a0)

        return r0;
    };
    M.t12.j = j8;
    M.t12.a = 0;

    // match .projects
    M.t13 = function t13(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("list")
        };
        a0.s = 'div';
        r0 += m.a(m, 0, m.s(j7, c0), 'list', a0)
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t13.j = j8;
    M.t13.a = 0;

    // match .projects : list
    M.t14 = function t14(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, m.s(j17, c0), '', a0)

        return r0;
    };
    M.t14.j = j8;
    M.t14.a = 0;

    // match .project
    M.t15 = function t15(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("list__item")
        };
        a0.s = 'div';
        if (simpleBoolean('id', c0)) {
            a0.a[ "id" ] = new yr.scalarAttr(nodeset2scalar( (selectNametest('id', c0, [])) ));
        }
        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "list__item__head" + "\">";
        r0 += "<h2 class=\"" + "list__title" + "\">" + nodeset2xml( ( selectNametest('title', c0, []) ) ) + "</h2>";
        if (simpleBoolean('years', c0)) {
            r0 += "<span class=\"" + "years" + "\">";
            r0 += "<span class=\"" + "years__begin" + "\">" + nodeset2xml( ( m.s(j21, c0) ) ) + "</span>";
            if (nodeset2boolean( m.s(j22, c0) )) {
                r0 += "<span class=\"" + "years__dash" + "\">" + "–" + "</span>";
                r0 += "<span";
                a0.a = {
                    'class': new yr.scalarAttr("years__end")
                };
                a0.s = 'span';
                if (cmpSN("∞", m.s(j22, c0))) {
                    var tmp0 = a0.a[ "class" ];
                    if (tmp0) {
                        a0.a[ "class" ] = tmp0.addscalar(" years_big");
                    } else {
                        a0.a[ "class" ] = new yr.scalarAttr(" years_big");
                    }
                }
                r0 += closeAttrs(a0);
                r0 += "<span>" + nodeset2xml( ( m.s(j22, c0) ) ) + "</span>";
                r0 += "</span>";
            }
            r0 += "</span>";
        }
        r0 += "</div>";
        r0 += "<div class=\"" + "list__desrc" + "\">";
        var items0 = selectNametest('link', c0, []);
        for (var i1 = 0, l1 = items0.length; i1 < l1; i1++) {
            var c1 = items0[ i1 ];
            r0 += "<span><a class=\"" + "list__link" + "\" href=\"" + nodeset2attrvalue( ( selectNametest('href', c1, []) ) ) + "\"><span>" + nodeset2xml( ( selectNametest('body', c1, []) ) ) + "</span></a>" + nodeset2xml( ( selectNametest('separator', c1, []) ) ) + "</span>";
        }
        if (simpleBoolean('description', c0)) {
            r0 += simpleScalar('description', c0);
        }
        r0 += "</div>";
        r0 += "</div>";

        return r0;
    };
    M.t15.j = j9;
    M.t15.a = 0;

    M.matcher = {
        "": {
            "": [
                "t0"
            ],
            "page": [
                "t1"
            ],
            "project": [
                "t15",
                "t5"
            ],
            "projects": [
                "t13"
            ]
        },
        "block": {
            "*": [
                "t2"
            ],
            "header": [
                "t8",
                "t2"
            ],
            "body": [
                "t10",
                "t2"
            ]
        },
        "block-content": {
            "*": [
                "t3"
            ],
            "projects": [
                "t12",
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
            ],
            "body": [
                "t11",
                "t3"
            ]
        },
        "list": {
            "projects": [
                "t14"
            ]
        }
    };
    M.imports = [];

    yr.register('app', M);

})();
