const mongoose = require("mongoose");

const { Schema } = mongoose;

const itemsSchema = new Schema({
    productId: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
},
{
    timestamps: true
})

const ItemsModel = mongoose.model('items', itemsSchema);

module.exports = ItemsModel;