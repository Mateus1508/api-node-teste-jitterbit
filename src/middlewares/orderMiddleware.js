class OrderMiddleware {
    validateCreateOrder = async (request, response, next) => {
        const orderData = request.body;
        if (!orderData.orderId) {
            return response.status(400).json({ error: 'OrderId is required.' });
        }
        else if (!orderData.items || orderData.items == []) {
            return response.status(400).json({ error: 'At least one item must be passed!' });
        }
        next();
        
    }

    validateOrderId = async (request, response, next) => {
        const { orderId } = request.params; 

        try {
            const order = await OrderRepository.getByOrderId(orderId);
    
            if (!order) {
                return response.status(404).json({ error: 'Order not found.' });
            }
    
            next();
        } catch (err) {
            console.error(err);
            return response.status(500).json({ error: 'Internal server error.' });
        }
    }
}

module.exports = OrderMiddleware;