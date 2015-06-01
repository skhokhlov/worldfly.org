(function (yr, window, document) {

    var app = {
        /**
         * Add click listener on elements with current class name
         * @param className
         * @param func
         */
        addClickListener: function(className, func){
            var elements = document.getElementsByClassName(className),
                i = elements.length;

            while (i--){
                elements[i].addEventListener('click', func);
            }
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
                document.title = 'Home page of World Fly';
                document.getElementsByClassName('b-layout')[0].innerHTML = app.render.home;
                app.navigation();
            },
            /**
             * Actions for activating projects page
             */
            projects: function () {
                document.title = 'Projects of World Fly';
                document.getElementsByClassName('b-layout')[0].innerHTML = app.render.projects;
                app.navigation();
            }
        },
        render: {
            home: yr.run('app', (JSON.parse(window.wf.PagesData)).home),
            projects: yr.run('app', (JSON.parse(window.wf.PagesData)).projects)
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

    if (window.location.pathname === '/') {
        history.replaceState({page: 'home'}, 'Home page of World Fly', '/');
        app.pages.home();
    } else if (window.location.pathname === '/projects') {
        history.replaceState({page: 'projects'}, 'Projects of World Fly', '/projects');
        app.pages.projects();
    }

})(yr, window, document);
