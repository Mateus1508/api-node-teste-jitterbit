const express = require('express');
const OrderController = require('./controllers/orderController');
const OrderMiddleware = require('./middlewares/orderMiddleware');
const LoginController = require('./controllers/loginController');
const LoginMiddleware = require('./middlewares/loginMiddleware');
const AuthMiddleaware = require('./middlewares/authMiddleware');
const routes = express.Router();

const loginController = new LoginController();
const orderController = new OrderController();

const loginMiddleware = new LoginMiddleware();
const orderMiddleware = new OrderMiddleware();
const authMiddleaware = new AuthMiddleaware();

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
    orderController.createOrder,
);

routes.get(
    '/order/:orderId', 
    authMiddleaware.verifyToken,
    orderMiddleware.validateOrderId, 
    orderController.getByOrderId
);

routes.put(
    '/order/:orderId', 
    authMiddleaware.verifyToken,
    orderMiddleware.validateOrderId, 
    orderController.updateOrderByOrderId
);

routes.delete(
    '/order/:orderId', 
    authMiddleaware.verifyToken,
    orderMiddleware.validateOrderId, 
    orderController.deleteOrderByOrderId
);

module.exports = routes;