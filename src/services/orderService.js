const OrderRepository = require("../repositories/orderRepository");

class OrderService {
    constructor(orderRepository = new OrderRepository()) {
        this.orderRepository = orderRepository; 
    }

    createOrder = (orderData) => {
        return this.orderRepository.createOrder(orderData);
    }

    getAll = () => {
        return this.orderRepository.getAll();
    }

    getByOrderId = (orderId) => {
        return this.orderRepository.getByOrderId(orderId);
    }

    updateOrderByOrderId = (orderId, orderData) => {
        return this.orderRepository.updateOrderByOrderId(orderId, orderData);
    }

    deleteOrderByOrderId = (orderId) => {
        return this.orderRepository.deleteOrderByOrderId(orderId);
    }
}

module.exports = OrderService;