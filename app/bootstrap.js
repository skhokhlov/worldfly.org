(function Bootstrap(window, Promise) {

    /* Promises
     */
    if (typeof Promise.prototype.done !== 'function') {
        Promise.prototype.done = function (onFulfilled, onRejected) {
            var self = arguments.length ? this.then.apply(this, arguments) : this
            self.then(null, function (err) {
                setTimeout(function () {
                    throw err
                }, 0)
            })
        }
    }

    var Request = function (url) {
        return new Promise(function (resolve, reject) {
            var Request = new XMLHttpRequest();
            Request.open('GET', url, true);
            Request.onload = function () {
                if (Request.status === 200) {
                    resolve(Request.response);
                } else {
                    reject(Error(Request.statusText));
                }
            };
            Request.onerror = function () {
                reject(Error("Network Error"));
            };
            Request.send(null);
        });
    };

    var MyBlob = function (content, type, id) {
        window.URL = window.URL || window.webkitURL;

        var blob = new Blob(content, {type: type});

        if (type === 'text/css') {
            var link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = window.URL.createObjectURL(blob);
            document.head.appendChild(link);
        } else if (type === 'text/javascript') {
            var script = document.createElement('script');
            script.id = id;
            script.src = window.URL.createObjectURL(blob);
            document.head.appendChild(script);
        }
    };

    window['BlobContent.load'] = 0;
    var BlobRender = function () {
        if (window['BlobContent.load'] === 4) {
            MyBlob([window['BlobContent.zepto.js']], 'text/javascript', 'zepto.js');
            MyBlob([window['BlobContent.runtime.js']], 'text/javascript', 'runtime.js');
            MyBlob([window['BlobContent.app.yate.js']], 'text/javascript', 'app.yate.js');
            MyBlob([window['BlobContent.app.js']], 'text/javascript', 'app.js');
        }
    };

    var BootstrapError = function (error) {
        window['BootCount']++;
        console.error(error);
        if (window['BootCount'] < 1) {
            console.log('Loading error. I\'m try again now');
            Bootstrap();
        }
    };

    Request('/public/runtime.js').then(function (res) {
        window['BlobContent.runtime.js'] = res;
        window['BlobContent.load']++;
        BlobRender();
    }, function (error) {
        BootstrapError(error)
    });
    Request('/public/app.yate.js').then(function (res) {
        window['BlobContent.app.yate.js'] = res;
        window['BlobContent.load']++;
        BlobRender();
    }, function (error) {
        BootstrapError(error)
    });
    Request('/public/zepto.js').then(function (res) {
        window['BlobContent.zepto.js'] = res;
        window['BlobContent.load']++;
        BlobRender();
    }, function (error) {
        BootstrapError(error)
    });
    Request('/public/app.js').then(function (res) {
        window['BlobContent.app.js'] = res;
        window['BlobContent.load']++;
        BlobRender();
    }, function (error) {
        BootstrapError(error)
    });


    Request('/assest/data.json').then(function (res) {
        window['PagesData'] = res;
    }, function () {
        BootstrapError(error);
    });

    //console.log(data);

    //Request('/public/app.js').then(function (response) {
    //    MyBlob([response], 'text/javascript');
    //}, function (error) {
    //    console.error("Ошибка!", error);
    //});


})(window, Promise);
