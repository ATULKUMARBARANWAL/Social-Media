import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token=authHeader?authHeader.startsWith('Bearer')
    ?authHeader.split(' ')[1]:null:null;
    if(!token)
    {
        return res.status(401).json({message:'Unauthorized : No token provided'});

    }
    try{
  const payload=jwt.verify(token,process.env.JWT_SECRET);
  console.log("Token payload",payload);
  req.user=payload;
  next();
    }
    catch(err){
      if(err.name==='TokenExpiredError'){
          return res.status(401).json({message:'Unauthorized : Token expired'});
      }
      else if(err.name==='JsonWebTokenError'){
          return res.status(401).json({message:'Unauthorized : Invalid token'});
      }
        else{
            console.error("Unexpected error in token verification:", err);
          return res.status(500).send("Internal Server Error");
        }
    }

}
export default jwtAuth;