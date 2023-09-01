const { Date } = require("mongoose");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    items: [{
        type: mongoose.Types.ObjectId,
        ref: 'items'
    }]
},
{
    timestamps: true
}
);

const OrderModel = mongoose.model('order', orderSchema);

module.exports = OrderModel;