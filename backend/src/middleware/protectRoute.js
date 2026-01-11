import { requireAuth } from "@clerk/express";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    if (ENV.NODE_ENV === "development" && process.env.DISABLE_AUTH === "true") {
      const devClerkId = "dev-user";
      let user = await User.findOne({ clerkId: devClerkId });
      if (!user) {
        user = await User.create({ name: "Dev User", email: "dev@example.com", clerkId: devClerkId });
      }
      req.user = user;
      return next();
    }

    return requireAuth()(req, res, async () => {
      const clerkId = req.auth().userId;
      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });
      const user = await User.findOne({ clerkId });
      if (!user) return res.status(404).json({ message: "User not found" });
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
