(function Bootstrap(window) {

    /**
    * Browser tests
    * If client don't support Blob URLs or JSON he wiil be redirected to version without js
    */
    if (!new Blob() && !('JSON' in window && 'parse' in JSON && 'stringify' in JSON)) {
      window.location = window.location.href + '?nojs=true';
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
    },
    
    MyBlob = function (content, type, id) {
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
    },
    blobContent = {},
    blobContentLoad = 0,

    BlobRender = function () {
        if (blobContentLoad === 4) {
            MyBlob([blobContent.runtimejs, blobContent.appyatejs, blobContent.appjs], 'text/javascript', 'js');
        }
    },

    BootstrapError = function (error) {
        window.wf.BootCount++;
        console.error(error);
        if (window.wf.BootCount < 1) {
            console.warn('Loading error. I\'m try again now');
            Bootstrap();
        }
    };

    request('/public/runtime.js').then(function (res) {
        blobContent.runtimejs = res;
        blobContentLoad++;
        BlobRender();
    }, function (error) {
        BootstrapError(error);
    });
    request('/public/app.yate.js').then(function (res) {
        blobContent.appyatejs = res;
        blobContentLoad++;
        BlobRender();
    }, function (error) {
        BootstrapError(error);
    });
    request('/public/app.js').then(function (res) {
        blobContent.appjs = res;
        blobContentLoad++;
        BlobRender();
    }, function (error) {
        BootstrapError(error);
    });

    request('/assest/data.json').then(function (res) {
        window.wf.PagesData = res;
        blobContentLoad++;
        BlobRender();
    }, function (error) {
        BootstrapError(error);
    });

})(window);
