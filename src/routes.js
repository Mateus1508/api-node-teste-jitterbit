const express = require('express');
const OrderController = require('./controllers/orderController');
const OrderMiddleware = require('./middlewares/orderMiddleware');
const LoginController = require('./controllers/loginController');
const LoginMiddleware = require('./middlewares/loginMiddleware');
const AuthMiddleaware = require('./middlewares/authMiddleware');
const routes = express.Router();

const loginMiddleware = new LoginMiddleware();
const orderMiddleware = new OrderMiddleware();
const authMiddleaware = new AuthMiddleaware();

const loginController = new LoginController();
const orderController = new OrderController();


routes.post(
    '/signin', 
    loginMiddleware.validateUser, 
    loginController.signIn
);

routes.get(
    '/order/list', 
    authMiddleaware.verifyToken, 
    orderController.getAll
);

routes.post(
    '/order', 
    authMiddleaware.verifyToken,
    orderMiddleware.verifyExistingIds,
    orderController.createOrder,
);

routes.get(
    '/order/:orderId', 
    authMiddleaware.verifyToken,
    orderController.getByOrderId
);

routes.put(
    '/order/:orderId', 
    authMiddleaware.verifyToken,
    orderController.updateOrderByOrderId
);

routes.delete(
    '/order/:orderId', 
    authMiddleaware.verifyToken,
    orderController.deleteOrderByOrderId
);

module.exports = routes;