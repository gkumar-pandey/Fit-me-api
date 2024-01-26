import bcrypt from "bcrypt";
import { HashPassword } from "./type";

/**
 * @description hashes a password using bcrypt
 * @param {String} password - A password to be hashed
 * @returns {Promise<String>} - A promise that resolves to the hashed password.
 */
export const hashPassword: HashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password.");
    throw error;
  }
};
