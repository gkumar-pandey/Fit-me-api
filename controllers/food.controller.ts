import { Response, Request } from "express";
import { Food } from "../models";

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}
/**
 * @route GET /api/food
 * @description
 * @param req
 * @param res
 */
export const getFoodItems = async (
  req: CustomRequest,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.user;
    const foodItems = await Food.find({ userId: id });
    if (foodItems.length === 0) {
      return res.status(404).json({
        message: "Food items not found",
        success: false,
      });
    }
    return res.status(200).json({ data: { food: foodItems }, success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: "Internal server error", error });
    throw error;
  }
};

/**
 * @route POST /api/food
 * @description
 * @param req
 * @param res
 */
export const addFoodItem = async (
  req: CustomRequest,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.user;
    const foodItem = req.body;
    const newFoodItem = new Food({ ...foodItem, userId: id });
    newFoodItem.save();

    return res
      .status(201)
      .json({ message: "Food item saved.", food: newFoodItem });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
    throw error;
  }
};

/**
 * @route DELETE /api/food/:foodId
 * @description
 * @param req
 * @param res
 */
export const deleteFoodItem = async (
  req: CustomRequest,
  res: Response
): Promise<Response> => {
  try {
    const { foodId } = req.params;
    const deletedFoodItem = await Food.findByIdAndDelete(foodId);

    if (!deletedFoodItem) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not deleted." });
    }
    return res
      .status(204)
      .json({ success: true, message: "Food item deleted." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
    throw error;
  }
};
