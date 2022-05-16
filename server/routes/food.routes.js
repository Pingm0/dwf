const { authenticate } = require('../config/jwt.config');
const FoodController = require('../controllers/food.controller');
module.exports = (app) => {
    app.get('/api/food', FoodController.findAllFood);
    app.post('/api/food',authenticate,FoodController.createFood);
    app.get('/api/onefood/:id',FoodController.getOneFood);
    app.put('/api/updatefood/one/:id/:username',authenticate,FoodController.updateFood);
    app.delete('/api/deletefood/:id',authenticate,FoodController.deleteFood);
    app.get('/api/food/all/expired/:username',FoodController.findExpiredFood);
    app.get('/api/foodbyuser/:username',authenticate,FoodController.findAllFoodByUser)

    
}