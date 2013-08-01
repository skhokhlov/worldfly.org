module.exports = function(app){

    app.get('/', function(req, res){
        res.render('index', {
            title: 'Home page',
            description: 'The home page'
        });
    });

    app.get('/projects', function(req, res){
        res.render('projects', {
            title: 'Projects'
        });
    });

    app.get('/principles', function(req, res){
        res.render('principles', {
            title: 'Principles'
        });
    });

    app.get('/contacts', function(req, res){
        res.render('contacts', {
            title: 'Contacts'
        });
    });

    //other routes..


    //Errors
    // Handle 404
    app.use(function(req, res) {
      res.status(400);
      res.render('errors/404.jade', {title: '404 Not Found', errorname: '404'});
    });
  
    // Handle 500
    app.use(function(error, req, res, next) {
      res.status(500);
      res.render('errors/500.jade', {title:'500 Internal Server Error', error: error, errorname: '500'});
    });
}
