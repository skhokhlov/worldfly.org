(function () {
    var Request = new XMLHttpRequest();
    Request.open('GET', '/assest/photos.json', true);
    Request.onload = function () {
        if (Request.status === 200) {
            var r = JSON.parse(Request.responseText),
                i = r.photo.length,
                el = document.getElementsByClassName('b-body__content')[0];

            while (i--) {
                var img = document.createElement('img');
                img.src = r.photo[i].url;
                img.class = 'b-list__item';
                el.appendChild(img);
            }

        } else {
            throw new Error(Request.statusText);
        }
    };
    Request.onerror = function () {
        throw new Error("Network Error");
    };
    Request.send(null);
})();