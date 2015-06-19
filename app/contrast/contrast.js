(function () {

    var el = document.getElementsByClassName('b-body__content')[0];

    /**
     * Browser tests
     * If client don't support XMLHttpRequest or JSON he will be redirected to version without js
     */
    if (!new XMLHttpRequest() && !('JSON' in window && 'parse' in JSON && 'stringify' in JSON)) {
        el.innerHTML = '<h2 class="b-error">Your browser isn\'t supported. Sorry...</h2>';
    }

    var Request = new XMLHttpRequest();
    Request.open('GET', '/assest/photos.json', true);
    Request.onload = function () {
        if (Request.status === 200) {
            var r = JSON.parse(Request.responseText),
                l = r.photo.length,
                t = '<figure class="b-list__item"><figcaption class="b-list__desrc">{title}</figcaption><img src="{src}" alt="{title}" class="b-list__photo"/></figure>',
                img = '';

            for (var i = 0; i < l; i++) {
                img += t.replace('{src}', r.photo[i].url.replace('{size}', ''))
                    .replace(new RegExp('{title}', 'g'), r.photo[i].title);

            }
            el.innerHTML = img;

        } else {
            throw new Error(Request.statusText);
        }
    };
    Request.onerror = function () {
        throw new Error("Network Error");
    };
    Request.send(null);
})();