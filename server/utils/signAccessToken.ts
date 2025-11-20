import jwt from "jsonwebtoken";

export default function (userId: any) {
  return jwt.sign(
    {
      id: userId,
    },
    useRuntimeConfig().tokenSecret,
    { expiresIn: "7d" }
  );
}
