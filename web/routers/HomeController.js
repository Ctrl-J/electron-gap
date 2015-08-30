import express from 'express';

class HomeController {
  constructor(handlebars) {
    this.router = express.Router();
    this.handlebars = handlebars;
  }

  defineRoutes() {
    this.router.get('/', function (request, response) {
      response.render('home');
    });

    this.router.get('/login', function(request, response) {
      response.render('login');
    });
  }

}

export default HomeController;
