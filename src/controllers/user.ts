import { type Request, type Response } from "express";

const getUser = async (req: Request, res: Response) => {
  const { fid } = req.params;
  res.json({ fid });
};

export { getUser };
