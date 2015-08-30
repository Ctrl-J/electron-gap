import express from 'express';

class HomeController {
  constructor() {
    this.router = express.Router();
  }

  defineRoutes() {
    this.router.get('/', function (request, response) {
      response.send('Home page! <a href="/login">Log In!</a>');
    });

    this.router.get('/login', function(request, response) {
      response.send('Login page! <a href="/">Home!</a>');
    });
  }

}

export default HomeController;
