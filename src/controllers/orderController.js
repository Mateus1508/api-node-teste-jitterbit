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

            const createdOrder = this.orderService.createOrder(orderData);
            return response.status(201).json(createdOrder);
        }
        catch (err) {

        }
    }

    getAll = async (request, response) => {
        try {
            const orders = await this.orderService.getAll();
            return response.status(200).json(orders);
        }
        catch (err) {

        }
    }

    getByOrderId = async (request, response) => {
        try {
            const { orderId } = request.params;
            const orders = await this.orderService.getByOrderId(orderId);
            return response.status(200).json(orders);
        }
        catch (err) {

        }
    }

    updateOrderByOrderId = async (request, response) => {
        try {
            const { orderId } = request.params;
            const orderData = request.body;
            const updatedOrder = await this.orderService.updateOrderByOrderId(orderId, orderData);
            return response.status(200).json(updatedOrder);
        }
        catch (err) {

        }
    }

    deleteOrderByOrderId = async (request, response) => {
        try {
            const { orderId } = request.params;
            const orders = await this.orderService.deleteOrderByOrderId(orderId);
            return response.status(200).json(orders);
        }
        catch (err) {

        }
    }

}

module.exports = OrderController;