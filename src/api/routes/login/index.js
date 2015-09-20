const Router = require('express').Router;
const Logic = require('../../../logic');

const router = new Router();
const logic = new Logic();

router.post('/',
  (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    logic.auth.login(username, password).then(
      (value) => {
        response.send(value);
      },
      (error) => {
        response.send(error);
      }
    );
  }
);

module.exports = router;
