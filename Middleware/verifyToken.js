import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  //console.log(token);
  if (!token) {
    return next(errorHandler(401, 'Unauthorized Access'));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized access' ));
    }
    req.user = user;
    next();
  });
};

export const errorHandler = (statusCode,message)=>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
  }