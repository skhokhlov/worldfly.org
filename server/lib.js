var dirname = global.dirname;

module.exports.hostAvailability = function (host) {
    return !(host === 'worldfly.info' || host === 'www.worldfly.info' || host === 'worldfly.org');
};

module.exports.sendError = {
    s404: function (res) {
        res.status(404).sendFile(dirname + '/public/error/404.html');
    },

    s500: function (res) {
        res.status(500).sendFile(dirname + '/public/error/500.html');
    },

    s503: function (res) {
        res.status(503).sendFile(dirname + '/public/error/503.html');
    }
};