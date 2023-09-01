const ItemsModel = require("../models/itemsModel");
const OrderModel = require("../models/orderModel");

class OrderRepository {

    handleCreateDate = (orderData) => {
        if (!orderData.creationDate) {
            orderData.creationDate = new Date();
        }
        return orderData;
    }

    handleTreatValue = (orderData) => {
        orderData.items.forEach(item => {
            item.price *= item.quantity;
        });
        
        if (!orderData.value) {
            orderData.value = 0;
        }
        
        const itemPrices = orderData.items.map(item => item.price);
        const totalValue = itemPrices.reduce((total, price) => total + price, 0);
/*         console.log(orderData)
 */        orderData.value = totalValue;
        return orderData;
    }
    
    createOrder = async (orderData) => {
        try {
            const createdDateOrder = this.handleCreateDate(orderData);
            const treatedOrder = this.handleCreateDate(createdDateOrder);

            const createdItems = await ItemsModel.create(treatedOrder.items);
            const itemIds = createdItems.map(item => item._id);
            treatedOrder.items = itemIds;
            
            
            const newOrder = new OrderModel(treatedOrder);
            
            if (!createdItems || !newOrder) {
                const idError = new Error("Bad request.");
                    idError.status = 400;
                    throw idError;
            }
            
            const createdOrder = await newOrder.save();
            console.log(createdOrder)
            return createdOrder;
        }
        catch (err) {
            return {
                status: err.status || 500, 
                error: err.message 
            };
        }
    }

    getAll = async () => {
        try {
            const order = await OrderModel.find().populate('items').exec();
            return order;
        }
        catch (err) {
            throw err;
        }
    }

    getByOrderId = async (orderId) => {
        try {
            const order = await OrderModel.findOne({ orderId }).populate('items').exec();
            return order;
        }
        catch (err) {
            throw err;
        }
    }

    updateOrderByOrderId = async (orderId, orderData) => {
        try {
            const treatedOrder = this.handleTreatValue(orderData)

            for (const item of orderData.items) {
                if (!item._id) {
                    const idError = new Error("Item id not provided.");
                    idError.status = 400;
                    throw idError;
                }
    
                await ItemsModel.findOneAndUpdate(
                    { _id: item._id },
                    { $set: item },
                    { new: true }
                );
            }

            const updatedOrder = await OrderModel.findOneAndUpdate(
                { orderId },
                { $set: treatedOrder },
                { new: true }
                );
            await updatedOrder.save();
            return updatedOrder;
        }
        catch (err) {
            return {
                status: err.status || 500, 
                error: err.message 
            };
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