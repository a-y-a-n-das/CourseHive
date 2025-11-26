import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(403).json({ message: "Access denied", access: false });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.email;
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired", access: false });
    } else if (error.name === "JsonWebTokenError") {
      res.status(400).json({ message: "Invalid token format", access: false });
    } else {
      res
        .status(500)
        .json({ message: "Token verification failed", access: false });
    }
  }
}
