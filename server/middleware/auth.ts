import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const url = event.node.req.url;
  const config = useRuntimeConfig();

  if (url?.startsWith("/api/auth/")) {
    return;
  }

  const headers = getHeaders(event);
  const authHeader = headers.authorization;

  // if (!authHeader) {
  //   throw createError({
  //     statusCode: 400,
  //     message: "User Unathorized!",
  //   });
  // }
  
  // try {
  //   const data = jwt.verify(authHeader, config.tokenSecret);

  //   console.log("token is: ", data);

  //   event.context.user = data.id;
  // } catch (error: any) {
  //   throw createError({ statusCode: 401, message: "Invalid Token" });
  // }
});
