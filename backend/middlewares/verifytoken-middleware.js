import { verifyJwtToken } from "../utils/token.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const decoded = verifyJwtToken(token);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid token." });
  }
  next()
};
