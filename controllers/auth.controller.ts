import { checkPasswordMatch, hashPassword } from "../helper";
import { User } from "../models";
import { Request, Response } from "express";

/**
 * @route POST /api/v1/auth/signup
 * @description Register a new user to the database
 * @param req -Express Request object contains user details in body.
 * @param res -Express Response contains object with user details or error
 */
const signupHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = req.body;
    const isUserExist = await User.find({ email: user.email });
    if (!isUserExist) {
      return res
        .status(404)
        .json({ success: false, message: "Username or email already exist." });
    }
    // hash password
    user.password = await hashPassword(user.password);
    // save user
    const newUser = new User(user);
    await newUser.save();
    // hide password
    // newUser.password = undefined;
    return res
      .status(200)
      .json({ success: true, message: "sign up successfully.", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error,
      success: false,
      message: "Internal server error.",
    });
    throw error;
  }
};

/**
 * @route POST /api/v1/login
 * @description Handle user login
 * @param {Object} req -Express request contains user's email & password
 * @param {Object} res -Express response contains user details & token
 */
const loginHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // check user found
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    // check password match
    const isPasswordMatch = await checkPasswordMatch(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Password not matched." });
    }

    // hide password
    return res
      .status(200)
      .json({ success: true, user: user, message: "Login successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
    throw error;
  }
};

export { signupHandler, loginHandler };
