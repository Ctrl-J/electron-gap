import express from 'express';

class Web {
  constructor(logic, config) {
    this.logic  = logic;
    this.config = config;
  }

  startup () {
    console.log('Initializing web application...');
    this.application = express();
    let port = this.config.application.port;

    this.application.listen(port, () => {
      console.log(`Application listening on port ${port}`)
    });
  }

};

export default Web;
