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

    var j0 = [ ];

    var j1 = [ 0, 'code' ];

    var j2 = [ 0, 'title' ];

    var j3 = [ 0, 'description' ];

    // match /
    M.t0 = function t0(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<!doctype html>";
        r0 += "<html>";
        r0 += "<head>";
        r0 += "<meta charset=\"" + "utf-8" + "\"/>";
        r0 += "<meta http-equiv=\"" + "X-UA-Compatible" + "\" content=\"" + "IE=edge" + "\"/>";
        r0 += "<meta name=\"" + "viewport" + "\" content=\"" + "width=device-width, initial-scale=1" + "\"/>";
        r0 += "<meta name=\"" + "robots" + "\" content=\"" + "noindex, nofollow" + "\"/>";
        r0 += "<title>" + nodeset2xml( ( selectNametest('code', c0, []) ) ) + " " + nodeset2xml( ( selectNametest('title', c0, []) ) ) + " - World Fly" + "</title>";
        r0 += "<link href=\"/public/error/error.css\" rel=\"stylesheet\" />";
        r0 += "</head>";
        r0 += "<body class=\"" + "b-page" + "\">";
        r0 += "<div class=\"" + "b-header" + "\">";
        r0 += "<div class=\"" + "b-header__logo" + "\">";
        r0 += "<a href=\"" + "/" + "\" class=\"" + "b-header__link" + "\"><img src=\"" + "https://get.worldfly.org/storage/main/images/b-error__header_logo.svg" + "\" alt=\"" + "World Fly" + "\"/></a>";
        r0 += "</div>";
        r0 += "<div class=\"" + "b-header__name" + "\">";
        r0 += "<h2 class=\"" + "b-header__name__text" + "\">" + nodeset2xml( ( selectNametest('code', c0, []) ) ) + "</h2>";
        r0 += "</div>";
        r0 += "</div>";
        r0 += "<div class=\"" + "b-content" + "\">";
        r0 += "<h1 class=\"" + "b-content__name" + "\">" + nodeset2xml( ( selectNametest('title', c0, []) ) ) + "</h1>";
        if (simpleBoolean('description', c0)) {
            r0 += "<div class=\"" + "b-content__descr" + "\">";
            r0 += simpleScalar('description', c0);
            r0 += "</div>";
        }
        r0 += "</div>";
        r0 += "<div class=\"" + "b-footer" + "\">";
        r0 += "<p>" + "© World Fly" + "</p>";
        r0 += "</div>";
        r0 += "</body>";
        r0 += "</html>";

        return r0;
    };
    M.t0.j = 1;
    M.t0.a = 1;

    M.matcher = {
        "": {
            "": [
                "t0"
            ]
        }
    };
    M.imports = [];

    yr.register('error', M);

})();
