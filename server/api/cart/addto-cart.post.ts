export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);

    if (!id) {
      return {
        status: 400,
        message: "Product ID is required!",
      };
    }

    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return {
        status: 404,
        message: "Product doesn't exist!",
      };
    }

    // Get cart (only one cart)
    let cart = await Cart.findOne({});

    // If cart does not exist → create one
    if (!cart) {
      cart = await Cart.create({
        items: [id],
        totalAmount: product.price,
      });

      return {
        status: 200,
        message: "Product added to new cart!",
        cart,
      };
    }

    const existingItem = cart.items.find((i: any)=> i===id)
    if(existingItem) {
      return {
        status: 400,
        message: "Item is already in the cart!"
      }
    }
    // Add product to cart
    cart.items.push(id);

    // Update total
    cart.totalAmount = (cart.totalAmount || 0) + product.price;

    await cart.save();

    return {
      status: 200,
      message: "Product is added to cart!",
      cart,
    };

  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
});
