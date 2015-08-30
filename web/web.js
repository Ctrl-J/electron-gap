import express from 'express';
import path from 'path';
import HomeController from './routers/HomeController';

class Web {
  constructor(logic, config) {
    this.logic  = logic;
    this.config = config;
    this.staticPath = path.resolve(__dirname, 'assets');
  }

  startup () {
    console.log('Initializing web application...');
    this.application = express();
    let port = this.config.application.port;

    console.log(`Serving static files from ${this.staticPath}`);
    this.application.use(express.static(this.staticPath));

    console.log('Defining routes...');
    var homeController = new HomeController();
    homeController.defineRoutes();
    this.application.use('/', homeController.router);

    this.application.listen(port, () => {
      console.log(`Application listening on port ${port}`)
    });
  }

};

export default Web;
