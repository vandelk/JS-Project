const Users = require('../controllers/users.controller');
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
    app.post("/api/register", Users.register);
    app.post("/api/login", Users.login);
    app.get("/api/users/loggedIn", authenticate, Users.getLoggedIn);
    app.get("/api/users/logout", Users.logout)
}