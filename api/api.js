
class Api {
  constructor(logic, config) {
    this.config = config;
    this.logic = logic;
  }

  startup() {
    console.log('Starting Api server...');
  }
};

export default Api;
