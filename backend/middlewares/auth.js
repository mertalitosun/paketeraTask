const jwt = require("jsonwebtoken");

const authenticate = (req,res,next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    if(!token){
        return res.status(401).json({message:"Token Gerekli"});
    }
    jwt.verify(token,process.env.JWT_SECRET || "paketerasecretkey",(err, user)=>{
        if(err){
            return res.status(403).json({message:"Geçersiz Token"});
        }
        req.user = user;
        next();
    })
}


const checkRole = (...roles) => {
    return (req, res, next) => {
      if (!req.user) return res.status(401).json({ message: "Kimlik doğrulama yapılmamış!" });
  
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Yetkisiz erişim!" });
      }
  
      next();
    };
  };
  

module.exports = { checkRole,authenticate };
