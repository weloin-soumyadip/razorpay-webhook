import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";

export default defineMongooseModel({
    name: "Cart",
    schema: {
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
        totalAmount: {
            type: Number,
            required: true
        }
    },
    options: {
        timestamps: true
    }
})