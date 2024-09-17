const basicAuth = require('express-basic-auth');

const myAuth = basicAuth({
  users: { 'admin': 'supersecret' },
  challenge: true, // to prompt the browser to show the auth dialog
  unauthorizedResponse: getUnauthorizedResponse
});

function getUnauthorizedResponse(req) {
  return req.auth
    ? `Credentials ${req.auth.user}:${req.auth.password} rejected`
    : 'No credentials provided';
}

module.exports = myAuth;
