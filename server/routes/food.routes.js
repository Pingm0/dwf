const FoodController = require('../controllers/food.controller');

module.exports = (app) => {
    app.get('/api/food',FoodController.findAllFood)
    app.post('/api/food',FoodController.createItem)
    app.get('/api/food/:id',FoodController.getOneFood)
    app.put('/api/food/:id',FoodController.updateFood)
    app.delete('/api/food/:id',FoodController.deletePet)
}