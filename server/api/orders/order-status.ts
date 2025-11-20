export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  const order = await Order.findOne({
    razorpayOrderId: id,
  });
  
  return {
    paymentStatus: order?.paymentStatus,
  };
});
