const ItemsModel = require("../models/itemsModel");
const OrderModel = require("../models/orderModel");
const OrderRepository = require("../repositories/orderRepository");
const OrderService = require("../services/orderService");

class OrderMiddleware {
    validateCreateOrder = (request, response, next) => {
        const orderData = request.body;
        if (!orderData.orderId) {
            return response.status(400).json({ error: 'OrderId is required.' });
        }
        else if (!orderData.items || orderData.items == []) {
            return response.status(400).json({ error: 'At least one item must be passed!' });
        }
        next();
    }

    verifyExistingIds = async (request, response, next) => {
            const orderData = request.body;
            const itemData = orderData.items;

            const existingOrder = await OrderModel.findOne({orderId: orderData.orderId});
    
            if (existingOrder) {
                return response.status(400).json({ message: 'This orderId already exists.' });
            }
    
            const productIds = itemData.map(item => item.productId);
            const existingItems = await ItemsModel.find({ productId: { $in: productIds } });
    
            if (existingItems.length > 0) {
                return response.status(400).json({ message: 'Your items must be a unique productId.' });
            }
    
            next();
    }
}

module.exports = OrderMiddleware;