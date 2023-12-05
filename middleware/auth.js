import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    // Add a check for user role
    const user = await User.findById(verified.id);
    console.log(user);
    if (user) {
      req.user = { ...verified, role: user.role };
      console.log(req.user)
      next();
    } else {
      return res.status(403).send("Access Denied");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkRole = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access Denied' });
  }
  next();
};