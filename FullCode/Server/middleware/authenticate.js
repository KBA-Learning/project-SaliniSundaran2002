const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()
const secretkey = process.env.secretkey
function authenticate(req, res, next) {
  const token = req.cookies.AuthToken;
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, secretkey);
    req.role = decoded.role; 
    req.userId = decoded.userId    
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authenticate;