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

    var request = function (url) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function () {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject(Error(request.statusText));
                }
            };
            request.onerror = function () {
                reject(Error("Network Error"));
            };
            request.send(null);
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

    //window.wf = {};

    window.wf.BlobContent.load = 0;
    var BlobRender = function () {
        if (window.wf.BlobContent.load === 3) {
            //MyBlob([window.wf.BlobContent.zeptojs], 'text/javascript', 'zepto.js');
            MyBlob([window.wf.BlobContent.runtimejs], 'text/javascript', 'runtime.js');
            MyBlob([window.wf.BlobContent.appyatejs], 'text/javascript', 'app.yate.js');
            MyBlob([window.wf.BlobContent.appjs], 'text/javascript', 'app.js');
        }
    };

    var BootstrapError = function (error) {
        window.wf.BootCount++;
        console.error(error);
        if (window.wf.BootCount < 1) {
            console.log('Loading error. I\'m try again now');
            Bootstrap();
        }
    };

    request('/public/runtime.js').then(function (res) {
        window.wf.BlobContent.runtimejs = res;
        window.wf.BlobContent.load++;
        BlobRender();
    }, function (error) {
        BootstrapError(error)
    });
    request('/public/app.yate.js').then(function (res) {
        window.wf.BlobContent.appyatejs = res;
        window.wf.BlobContent.load++;
        BlobRender();
    }, function (error) {
        BootstrapError(error)
    });
    //request('/public/zepto.js').then(function (res) {
    //    window.wf.BlobContent.zeptojs = res;
    //    window.wf.BlobContent.load++;
    //    BlobRender();
    //}, function (error) {
    //    BootstrapError(error)
    //});
    request('/public/app.js').then(function (res) {
        window.wf.BlobContent.appjs = res;
        window.wf.BlobContent.load++;
        BlobRender();
    }, function (error) {
        BootstrapError(error)
    });


    request('/assest/data.json').then(function (res) {
        window.wf.PagesData = res;
    }, function () {
        BootstrapError(error);
    });

    //console.log(data);

    //request('/public/app.js').then(function (response) {
    //    MyBlob([response], 'text/javascript');
    //}, function (error) {
    //    console.error("Ошибка!", error);
    //});


})(window, Promise);
