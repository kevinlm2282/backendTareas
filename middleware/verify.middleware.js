const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ 
      "success":false,
      "status":401,
      "message": "Acceso Denegado" 
   });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ 
      "success":false,
      "status":400,
      "message": "Token Invalido" 
    });
  }
};