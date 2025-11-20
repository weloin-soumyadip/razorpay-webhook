export default defineEventHandler(async (event) => {
  try {
    const req = event.node.req;

    const file = (req as any).file;
    const fields = (req as any).body;

    console.log("fields:", fields);
    console.log("file:", file);
    console.log("file title is: ", fields.title)
    if(!fields.title || !fields.description || !fields.category || !fields.price) {
      return {
        status: 400,
        message: "all fields are required!"
      }
    }
    if(!file) {
      return {
        status: 400,
        message: "file is missing!"
      }
    }

    const cleanPath = file.path.replace(/^public\//, "");

    const imagePath = `https://soumyadip.weloin.net/${cleanPath}`;

    const createdProduct = await Product.create({
      title: fields.title,
      description: fields.description,
      category: fields.category,
      price: fields.price,
      image: imagePath,          
    });
    
    if(!createdProduct) {
      return {
        status: 400,
        message: "product create faild!"
      }
    }
    return {
      status: 200,
      product: createdProduct,
      message: "product is created successfully!"
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message
    }
  }
});
