function login(username, password) {
  const promise = new Promise(
    (resolve, reject) => {
      if ((username === 'login') && (password === 'test')) {
        resolve({
          status: 200,
          id: 5,
          token: '12345',
          timestamp: new Date(),
          username: 'Zaphod Beeblebrox'
        });
      } else {
        reject({
          status: 404,
          message: 'Username and/or password was invalid'
        });
      }
    }
  );

  return promise;
}

module.exports = {
  login
};
