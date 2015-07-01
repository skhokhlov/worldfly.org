(function (yr, window, document) {

    var hash = window.location.hash || "",
        _data = JSON.parse(window.wf.PagesData),
        loader = document.getElementsByClassName('b-loader')[0];

    var app = {

        /**
         * Add click listener on elements with current class name
         * @param className
         * @param func
         */
        addClickListener: function (className, func) {
            var elements = document.getElementsByClassName(className),
                i = elements.length;

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
            //Checking for b-nav__link_home element on page. For example on homepage this element is undefined.
            if (!!document.getElementsByClassName('b-nav__link_home')) {
                app.addClickListener('b-nav__link_home', function (event) {
                    history.pushState({page: 'home'}, 'Home page of World Fly', '/');
                    app.pages.home();
                    event.preventDefault();
                    return false;
                });
            }

            if (!!document.getElementsByClassName('b-nav__link_projects')) {
                app.addClickListener('b-nav__link_projects', function (event) {
                    history.pushState({page: 'projects'}, 'Projects of World Fly', '/projects');
                    app.pages.projects();
                    event.preventDefault();
                    return false;
                });
            }
        },
        pages: {
            /**
             * Actions for activating homepage
             */
            home: function () {
                document.title = 'Homepage of World Fly';
                var el = document.getElementsByClassName('b-page')[0];
                el.style.opacity = 0;

                //Wait for transition
                setTimeout(function () {
                    app.addClass(loader, 'b-loader_hidden');
                    el.innerHTML = app.render.home;
                    el.style.opacity = 1;
                    app.navigation();
                }, 200);

            },
            /**
             * Actions for activating projects page
             */
            projects: function () {
                document.title = 'Projects of World Fly';
                var el = document.getElementsByClassName('b-page')[0];
                el.style.opacity = 0;

                //Wait for transition
                setTimeout(function () {
                    app.addClass(loader, 'b-loader_hidden');
                    el.innerHTML = app.render.projects;
                    el.style.opacity = 1;
                    app.navigation();

                    if (!!hash) {
                        window.scrollTo(0, document.querySelector(hash).offsetTop);
                    }

                }, 200);

            }

        },
        render: {
            home: yr.run('app', _data.home),
            projects: yr.run('app', _data.projects)
        }
    };

    /**
     * Actions for back and forward buttons navigation
     */
    window.addEventListener('popstate', function (event) {
        if (event.state.page === 'home') {
            app.pages.home();
        } else if (event.state.page === 'projects') {
            app.pages.projects();
        }
    });

    app.addClass(loader, 'b-loader_hidden');
    app.navigation();

})(yr, window, document);
