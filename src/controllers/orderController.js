const OrderService = require("../services/orderService");

class OrderController {

    constructor(
        orderService = new OrderService()
    ){
        this.orderService = orderService;
    }

    createOrder = async (request, response) => {     
        try {
            const orderData = request.body;
            const createdOrder = await this.orderService.createOrder(orderData);

            if (createdOrder.error) {
                return response.status(400).json({message: createdOrder.error});
            }

            return response.status(201).json(createdOrder);
        }
        catch (err) {
            return response.status(500).json({message: 'Internal server error'});
        }
    }

    getAll = async (request, response) => {
        try {
            const orders = await this.orderService.getAll();
            return response.status(200).json(orders);
        }
        catch (err) {
            return response.status(500).json({message: 'Internal server error'});
        }
    }

    getByOrderId = async (request, response) => {
        try {
            const { orderId } = request.params;
            const orders = await this.orderService.getByOrderId(orderId);
            return response.status(200).json(orders);
        }
        catch (err) {
            return response.status(500).json({message: 'Internal server error'});
        }
    }

    updateOrderByOrderId = async (request, response) => {
        try {
            const { orderId } = request.params;
            const orderData = request.body;
            
            const order = await this.orderService.updateOrderByOrderId(orderId, orderData);
            
            if (!order) {
                return response.status(200).json({message: `Order doesn't exists`});
            }

            if (order.error) {
                return response.status(400).json({message: order.error});
            }

            return response.status(200).json(order);
         }
        catch (err) {
            return response.status(500).json({message: 'Internal server error'});
        }
    }

    deleteOrderByOrderId = async (request, response) => {
        try {
            const { orderId } = request.params;
            const order = await this.orderService.deleteOrderByOrderId(orderId);

            if (!order) {
                return response.status(200).json({message: `Order doesn't exists`});
            }

            return response.status(200).json({message: `Order ${orderId} excluded with success`});
        }
        catch (err) {
            return response.status(500).json({message: 'Internal server error'});
        }
    }

}

module.exports = OrderController;