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

    // match /
    M.t0 = function t0(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<!doctype html>";
        r0 += "<html>";
        r0 += "<head>";
        r0 += "<meta charset=\"" + "utf-8" + "\"/>";
        r0 += "<meta name=\"" + "viewport" + "\" content=\"" + "width=device-width, initial-scale=1" + "\"/>";
        r0 += "<meta name=\"" + "robots" + "\" content=\"" + "noindex, nofollow" + "\"/>";
        r0 += "<title>" + "Error 404 Not Found" + "</title>";
        r0 += "<link href=\"/public/error/error.css\" rel=\"stylesheet\" />";
        r0 += "</head>";
        r0 += "<body class=\"" + "page" + "\">";
        r0 += "<div class=\"" + "content" + "\"><h1><a class=\"" + "logo" + "\" href=\"" + "/" + "\">" + "World Fly" + "</a></h1>";
        r0 += "<h2 class=\"" + "title" + "\"><span class=\"" + "title__code" + "\">" + "404." + "</span>" + " Page Not Found." + "</h2>";
        r0 += "<p>" + "The requested resource was not found." + "</p>";
        r0 += "<p>" + "If you think that something should be here, please " + "<a class=\"" + "link" + "\" href=\"" + "mailto:support@worldfly.info" + "\">" + "tell us: support@worldfly.info" + "</a>" + "." + "</p>";
        r0 += "<p>" + "You can " + "<a href=\"" + "/" + "\" class=\"" + "link" + "\">" + "back to the main page" + "</a>" + "." + "</p></div>";
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
