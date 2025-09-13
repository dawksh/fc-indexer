import type { Request, Response } from "express";
import { storeFidToRedis, getConnections as getConnectionsRedis } from "../lib/redis";
import client from "../lib/farcaster";
import logger from "../lib/logger";

const getUser = async (req: Request, res: Response) => {
  const { fid } = req.params;
  res.json({ fid });
};

const saveUser = async (req: Request, res: Response) => {
  const { fid } = req.body;
  try {
    let userData = await client.getLinksByFid({ fid });
    logger.info("[saveUser] storing user for fid: " + fid);
    let following: number[] = [];
    if (userData.isOk()) {
      do {
        const followingData = userData.value.messages
          .map((data) => data.data?.linkBody?.targetFid)
          .filter((data) => data !== undefined)
          .filter(Boolean);
        following.push(...followingData);
      } while (userData.value.nextPageToken);
    }
    await storeFidToRedis({ fid, followingData: following });
    return res.json({ success: true, error: null });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const getConnections = async (req: Request, res: Response) => {
  const { fid } = req.query;
  const connections = await getConnectionsRedis({ fid: Number(fid) });
  return res.json({ connections });
};

export { getUser, saveUser, getConnections };
