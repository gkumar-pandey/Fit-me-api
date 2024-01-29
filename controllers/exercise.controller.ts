import { Response, Request } from "express";
import { Exercise } from "../models";

interface CoustomRequest extends Request {
  user: {
    id: string;
  };
}

/**
 * @route GET /api/exercises
 * @description
 * @param req
 * @param res
 * @returns
 */
export const getAllExercises = async (
  req: CoustomRequest,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.user;
    const exercises = await Exercise.find({ userId: id });
    if (exercises.length === 0) {
      return res
        .status(404)
        .json({ message: "Exercises not found", success: false });
    }
    return res.status(200).json({ success: true, data: { exercises } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    throw error;
  }
};

/**
 * @route POST /api/exercises
 * @description
 * @param req
 * @param res
 * @returns
 */
export const createExercise = async (
  req: CoustomRequest,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.user;
    const exercise = req.body;

    const newExercise = new Exercise({
      userId: id,
      ...exercise,
    });
    // save exercise
    newExercise.save();
    // return saved exercise
    return res.status(201).json({
      success: true,
      message: "New exercise created.",
      exercise: newExercise,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
    throw error;
  }
};

/**
 * @route DELETE /api/exercises/:exerciseId
 * @param req
 * @param res
 * @returns
 */
export const deleteExercise = async (
  req: CoustomRequest,
  res: Response
): Promise<Response> => {
  try {
    const { exerciseId } = req.params;
    const exercise = await Exercise.findByIdAndDelete(exerciseId);
    if (!exercise) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise is not deleted." });
    }
    return res
      .status(204)
      .json({ success: true, message: "Exercise deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal serve error", success: false, error });
    throw error;
  }
};
