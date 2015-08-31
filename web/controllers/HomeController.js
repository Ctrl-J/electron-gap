import express from 'express';
import React from 'react';

import safeStringify from '../utilities/safeStringify';
import Incrementor from '../components/increment/increment.jsx';

class HomeController {constructor(handlebars) {
    this.router = express.Router();
    this.handlebars = handlebars;
  }

  defineRoutes() {
    this.router.get('/', function(request, response) {
      let incrementorHtml = React.renderToString(<Incrementor/>);

      response.render('home', {
        incrementor: incrementorHtml
      });
    });

    this.router.get('/login', function(request, response) {
      response.render('login');
    });
  }

}

export default HomeController;
