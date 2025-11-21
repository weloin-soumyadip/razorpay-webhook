import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
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

    // uploads to S3
    const s3 = new S3Client({
      region: config.awsRegion,
      endpoint: config.awsEndpoint,
      credentials: {
        accessKeyId: config.awsAccessKeyId,
        secretAccessKey: config.awsSecretAccessKey
      }
    });

    const fileName = `products/${Date.now()}-${file.originalname}`;

    // const cleanPath = file.path.replace(/^public\//, "");

    const command = new PutObjectCommand({
      Bucket: config.awsBucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    });


    console.log("s3 command is: ", command);

    await s3.send(command);

    // public image path
    const imagePath = `${config.awsCdn}/${fileName}`;

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
