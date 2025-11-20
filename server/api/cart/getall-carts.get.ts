export default defineEventHandler(async (event) => {
  try {
    // Get all carts
    const allCarts = await Cart.find({}).populate("items"); 

    if (!allCarts || allCarts.length === 0) {
      return {
        status: 200,
        carts: [],
        totalAmount: 0
      };
    }

    // Extract all products from all carts
    const allCartProducts: any[] = [];

    allCarts.forEach(cart => {
      if (cart.items?.length > 0) {
        allCartProducts.push(...cart.items);
      }
    });

    const totalAmount = allCarts[0].totalAmount || 0;

    return {
      status: 200,
      carts: allCartProducts,
      totalAmount
    };

  } catch (error: any) {
    return {
      status: 500,
      message: error.message
    };
  }
});
