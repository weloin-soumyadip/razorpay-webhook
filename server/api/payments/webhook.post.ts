// import crypto from "crypto";
import Order from "~~/server/models/Order";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  console.log("Webhook called");
  

  // RAW body required
  const rawBody = await readRawBody(event);
  console.log("raw body: ", rawBody);
  const body = JSON.parse(rawBody || "{}");

  console.log("Body: ", body);
  
  
  
  const razorpaySignature = getHeader(event, "x-razorpay-signature");
  console.log("Sig: ", razorpaySignature);

  // const expectedSignature = crypto
  //   .createHmac("sha256", config.razorpayWebhookSignature)
  //   .update(rawBody)
  //   .digest("hex");

  const isValid = validateWebhookSignature(rawBody, razorpaySignature, config.myWebhookSecret);
    console.log("my webhook secret: ", config.myWebhookSecret);
    console.log("is valid :", isValid);
    

  if (!isValid) {
    setResponseStatus(event, 400);
    return { status: "error", message: "Invalid signature" };
  }

  const eventType = body.event;
  console.log("eventType: ", eventType);
  if (eventType === "payment.captured") {
    const orderId = body.payload.payment.entity.order_id;
    const paymentId = body.payload.payment.entity.id;
    console.log("body.payload.payment.entity.order_id: ", body.payload.payment.entity.order_id)
    await Order.findOneAndUpdate(
      { razorpayOrderId: orderId },
      {
        paymentStatus: "paid",
        razorpayPaymentId: paymentId,
      }
    );
  }

  if (eventType === "order.paid") {
    const orderId = body.payload.payment.entity.order_id;
    const paymentId = body.payload.payment.entity.id;

    await Order.findOneAndUpdate(
      { razorpayOrderId: orderId },
      {
        paymentStatus: "paid",
        razorpayPaymentId: paymentId,
      }
    );
  }

  if (eventType === "payment.failed") {
    const orderId = body.payload.payment.entity.order_id;

    await Order.findOneAndUpdate(
      { razorpayOrderId: orderId },
      {
        paymentStatus: "failed",
      }
    );
  }

  return { status: "ok" };
});
