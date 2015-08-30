import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

import HomeController from './routers/HomeController';

class Web {
  constructor(logic, config) {
    this.logic  = logic;
    this.config = config;
    this.staticPath = path.resolve(__dirname, 'assets');
    this.handlebars = handlebars;
  }

  startup () {
    console.log('Initializing web application...');
    this.application = express();

    console.log('Setting up handlebars...');
    let viewPath = path.resolve(__dirname, 'views');
    let layoutsPath = path.resolve(__dirname, 'views', 'layouts');
    this.application.set('views', viewPath);
    this.application.engine('handlebars', this.handlebars({ defaultLayout: 'main', layoutsDir: layoutsPath }));
    this.application.set('view engine', 'handlebars');

    console.log(`Serving static files from ${this.staticPath}`);
    this.application.use('/assets', express.static(this.staticPath));

    console.log('Defining routes...');
    var homeController = new HomeController(this.handlebars);
    homeController.defineRoutes();
    this.application.use('/', homeController.router);

    let port = this.config.application.port;
    this.application.listen(port, () => {
      console.log(`Application listening on port ${port}`)
    });
  }

};

export default Web;
