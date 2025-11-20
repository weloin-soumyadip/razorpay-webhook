import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    const { name, email, password } = await readBody(event);

    if([name, email, password].some(i => !i)){
      return {
        status: 400,
        messgae: "all fields are required!"
      }
    }

    const newUser = await User.create({
      name,
      email,
      password
    });

    return {
      status: 200,
      messgae: "User is created!",
      user: newUser
    }
    
  } catch (error: any) {
    return {
      status: 500,
      messgae: "Error while registering!",
      error: error.message
    }
  }
})
