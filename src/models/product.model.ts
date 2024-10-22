import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    stock:{
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const ProductModel = mongoose.model('Product', ProductSchema);