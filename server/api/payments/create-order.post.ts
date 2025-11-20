import Razorpay from "razorpay";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig();
    const amount = body.amount;

    const instance = new Razorpay({
        key_id: config.razorpayKeyId,
        key_secret: config.razorpayKeySecret
    });

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`
    }

    try {
        const order = await instance.orders.create(options);
        await Order.create({
            items: body.items,
            totalAmount: body.totalAmount,
            paymentStatus: "pending",
            razorpayOrderId: order.id,
        });
        
        return order;
    } catch (error: any) {
        return {
            error: error.message
        }
    }
})