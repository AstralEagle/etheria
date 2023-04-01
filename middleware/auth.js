import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch {
    res.status(403).json({
      error: 'Log out',
    });
  }
};

export default auth;
