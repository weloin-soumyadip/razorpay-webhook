import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";

export default defineMongooseModel({
  name: "Order",
  schema: {
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: "string",
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    razorpayOrderId: { type: String }, 
    razorpayPaymentId: { type: String },
  },
  options: {
    timestamps: true
  }
});
