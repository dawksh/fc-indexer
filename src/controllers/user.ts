import { type Request, type Response } from "express";
import { storeFid } from "../lib/redis";

const getUser = async (req: Request, res: Response) => {
  const { fid } = req.params;
  res.json({ fid });
};

const saveUser = async (req: Request, res: Response) => {
  const { fid } = req.body;
  try {
    await storeFid({ fid });
    return res.json({ success: true, error: null });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export { getUser, saveUser };
