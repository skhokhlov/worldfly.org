(function(yr,window,document){

    window.app = {
        launch: function (){
            if (window.location.pathname === '/') {
                history.replaceState({page: 'home'}, 'Home page of World Fly', '/');
                app.pages.home();
            } else if (window.location.pathname === '/projects') {
                history.replaceState({page: 'projects'}, 'Projects of World Fly', '/projects');
                app.pages.projects();
            }
        },
        navigation: function (){
            if (document.getElementsByClassName('b-nav__link_home')[0] !== undefined){
                document.getElementsByClassName('b-nav__link_home')[0].addEventListener('click', function (){
                    history.pushState({page: 'home'}, 'Home page of World Fly', '/');
                    app.pages.home();
                    return false;
                });
            }

            document.getElementsByClassName('b-nav__link_projects')[0].addEventListener('click', function (){
                history.pushState({page: 'projects'}, 'Projects of World Fly', '/projects');
                app.pages.projects();
                return false;
            });
        },
        pages:{
            home: function (){
                document.title = 'Home page of World Fly';
                document.getElementsByTagName('html')[0].innerHTML = app.render.home;
                app.navigation();
            },
            projects: function (){
                document.title = 'Projects of World Fly';
                document.getElementsByTagName('html')[0].innerHTML = app.render.projects;
                app.navigation();
            }
        },
        render: {
            home: yr.run('common', (JSON.parse(window.wf.PagesData)).home),
            projects: yr.run('common', (JSON.parse(window.wf.PagesData)).projects)
        }
    };

    window.addEventListener('popstate', function (event) {
        if (event.state.page === 'home') {
            app.pages.home();
        } else if (event.state.page == 'projects') {
            app.pages.projects();
        }
    });

    app.launch();

    //document.getElementsByTagName('html')[0].innerHTML = yr.run('common', JSON.parse(window.wf.PagesData));
})(yr, window, document);