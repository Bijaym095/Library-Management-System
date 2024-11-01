import { verifyToken } from "../utils/token.js";

export const verifyTokenHandler = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const decoded = verifyToken(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid token." });
  }
  next()
};
