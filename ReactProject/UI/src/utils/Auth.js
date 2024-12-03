import jwt from 'jsonwebtoken';

const secretKey = process.env.secretKey; // Replace with your actual secret key

function getUserType(req, res, next) {
  const token = req.cookies.AuthToken;
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, secretKey);
    req.role = decoded.role; // Attach the role to the request object for further use
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export { getUserType };
