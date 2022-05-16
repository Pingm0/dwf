const { authenticate } = require('../config/jwt.config');
const UserController = require('../controllers/user.controllers');
module.exports = (app) => {
    app.post('/api/user', UserController.register);
    app.post('/api/user/login', UserController.loginUser);
    app.post('/api/user/logout', UserController.logout);
    app.get('/api/users',authenticate, UserController.getLoggedInUser);





    
}