export default defineEventHandler(async (event) => {
  try {
    const products = await Product.find({});
    return {
      status: 200,
      products
    }
  } catch (error: any) {
    return {
      status: 500,
      error: error.message
    }
  }
})
  