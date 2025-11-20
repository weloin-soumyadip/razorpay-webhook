import User from "~~/server/models/User";
import signAccessToken from "~~/server/utils/signAccessToken";

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);
    if ([email, password].some((i) => !i)) {
      return {
        status: 400,
        message: "All fields are required!",
      };
    }
    const userExists = await User.findOne({
      email,
    });
    if (!userExists) {
      return {
        status: 404,
        message: "User dosen't exists!",
      };
    }
    const isMatched = await userExists.comparePassword(password);
    if (!isMatched) {
      return {
        status: 400,
        message: "Password is incorrect!",
      };
    }

    const token = signAccessToken(userExists._id);

    // setCookie(event, "access_token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
    //   path: "/",
    // });

    return {
      status: 200,
      message: "User successfully loggedin!",
      access_token: token
    };
  } catch (error: any) {
    return {
      status: 500,
      error: error.message
    }
  }
});
