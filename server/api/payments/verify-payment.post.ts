import crypto from "crypto";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const config = useRuntimeConfig();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return { status: "error", message: "Missing payment parameters" };
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", config.razorpayKeySecret)
      .update(sign)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return { status: "error", message: "Invalid signature" };
    }

    const updatedOrder = await Order.findOneAndUpdate(
      {
        razorpayOrderId: razorpay_order_id,
      },
      {
        paymentStatus: "paid",
        razorpayPaymentId: razorpay_payment_id,
      },
      {
        new: true,
      }
    );
    
    if (!updatedOrder) {
      return {
        status: "error",
        message: "Order not found in DB",
      };
    }

    return {
      status: "ok",
      message: "Payment verified",
      order: updatedOrder,
    };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
});
