import multer from "multer"; 

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req: any, file: any, cb: any) =>{
      const unique = Date.now() + "-" + file.originalname
      cb(null, unique);
  }
});

const upload = multer({ storage });

export default defineEventHandler(async (event) => {
  if (event.node.req.url?.startsWith("/api/products/create-product")) {
    await new Promise((resolve, reject) => {
      upload.single("image")(event.node.req, event.node.res, (err: any) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
});