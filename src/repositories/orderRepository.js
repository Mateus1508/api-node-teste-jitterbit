const OrderModel = require("../models/orderModel");

class OrderRepository {

    handleTreatOrder = (orderData) => {
        if (!orderData.creationDate) {
            orderData.creationDate = new Date();
        }
        if (!orderData.value) {
            const itemPrices = orderData.items.map(item => item.price);
            const totalValue = itemPrices.reduce((total, price) => total + price, 0);
            orderData.value = totalValue;
        }
        return orderData;
    }
    
    createOrder = async (orderData) => {
        try {

            const treatedOrder = this.handleTreatOrder(orderData);
            const newOrder = new OrderModel(treatedOrder);
            const createdOrder = await newOrder.save();
            return createdOrder;
        }
        catch (err) {
            throw err;
        }
    }

    getAll = async () => {
        try {
            const order = await OrderModel.find().populate('item').exec();
            return order;
        }
        catch (err) {
            throw err;
        }
    }

    getByOrderId = async (orderId) => {
        try {
            const order = await OrderModel.findOne({ orderId });
            return order;
        }
        catch (err) {
            throw err;
        }
    }

    updateOrderByOrderId = async (orderId, orderData) => {
        try {
            const updatedOrder = await OrderModel.findOneAndUpdate(
                { orderId },
                { $set: orderData },
                { new: true }
            );
            return updatedOrder;
        }
        catch (err) {
            throw err;
        }
    }

    deleteOrderByOrderId = async (orderId) => {
        try {
            const deleteOrder = await OrderModel.findOneAndDelete({ orderId });
            return deleteOrder;
        }
        catch (err) {
            throw err;
        }
    }

}

module.exports = OrderRepository;