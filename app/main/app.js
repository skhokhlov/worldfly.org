(function (yr, window, document) {

    var hash = window.location.hash || '';
    var _data = JSON.parse(window.wf.PagesData);
    var loader = document.getElementsByClassName('loader')[0];

    var app = {
        /**
         * Add click listener on elements with current class name
         * @param className
         * @param func
         */
        addClickListener: function (className, func) {
            var elements = document.getElementsByClassName(className);
            var i = elements.length;

            while (i--) {
                elements[i].addEventListener('click', func);
            }
        },

        /**
         * Add class name to element
         * @param element
         * @param className
         * @returns {boolean}
         */
        addClass: function (element, className) {
            var classes = element.className.split(' ');

            if (classes.indexOf(className) !== -1) {
                return false;
            }

            classes.push(className);
            element.className = classes.join(' ');

        },

        /**
         * Remove class name
         * @param element
         * @param className
         * @returns {boolean}
         */
        removeClass: function (element, className) {
            var classes = element.className.split(' ');

            var index = classes.indexOf(className);

            if (index === -1) {
                return false;
            }

            classes.splice(index, 1);
            element.className = classes.join(' ');

        },

        /**
         * Enabling cross page navigation
         */
        navigation: function () {
            /**
             * Checking for b-nav__link_home element on page. For example on homepage this element is undefined.
             */
            if (Boolean(document.getElementsByClassName('nav__link_home'))) {
                app.addClickListener('nav__link_home', function (event) {
                    history.pushState({page: 'home'}, 'Home page of World Fly', '/');
                    pages.home();
                    event.preventDefault();
                    return false;
                });
            }

            if (Boolean(document.getElementsByClassName('nav__link_projects'))) {
                app.addClickListener('nav__link_projects', function (event) {
                    history.pushState({page: 'projects'}, 'Projects of World Fly', '/projects');
                    pages.projects();
                    event.preventDefault();
                    return false;
                });
            }
        }
    };

    var pages = {
        _common: function (data) {
            return new Promise(function (reject, resolve) {
                document.title = data.title;
                var el = document.getElementsByClassName('page')[0];
                el.style.opacity = 0;

                /**
                 * Wait for transition
                 */
                setTimeout(function () {
                    app.addClass(loader, 'loader_hidden');
                    el.innerHTML = data.content;
                    el.style.opacity = 1;
                    app.navigation();

                    resolve();

                }, 200);

                window.addEventListener('popstate', function (event) {
                    if (event.state.page === data.id) {
                        pages[data.id]();
                    }
                });
            });
        },

        /**
         * Actions for activating homepage
         */
        home: function () {
            pages._common({
                id: 'home',
                title: 'Homepage of World Fly',
                content: yr.run('app', _data.home)
            }).then(null).catch(null);
        },

        /**
         * Actions for activating projects page
         */
        projects: function () {
            pages._common({
                id: 'projects',
                title: 'Projects of World Fly',
                content: yr.run('app', _data.projects)
            }).then(function () {
                if (Boolean(hash)) {
                    window.scrollTo(0, document.querySelector(hash).offsetTop);
                }
            });
        }
    };

    app.addClass(loader, 'loader_hidden');
    app.navigation();

})(yr, window, document);
