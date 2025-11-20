import { getRouterParam } from 'h3';


export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    const product = await Product.findById(id);
    if(!product) return {
      status: 404,
      message: "Product doesn't exists!"
    }
    return {
      status: 200,
      product
    }
  } catch (error: any) {
    return {
      status: 500,
      error: error.message
    }
  }
})
