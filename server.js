import Data from './data';
import Logic from './logic';
import Web from './web';
import Api from './api';
import config from './config';

var data = new Data(config);
data.initialize();

var logic = new Logic(data, config);
logic.initialize();

var api = new Api(logic, config);
api.startup();

var website = new Web(logic, config);
website.startup();
