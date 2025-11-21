import jwt from "jsonwebtoken";

const secret = process.env.SECRET

export function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(403).json({ message: "Access denied", access: false });
    return;
  }
  const decoded = jwt.verify(token, secret);
  if (!decoded) {
    res.status(401).json({ message: "Invalid or expired token", access: false });
    return;
  }
  req.user = decoded.email;
  next();
}
