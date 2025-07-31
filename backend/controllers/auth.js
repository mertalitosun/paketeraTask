const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

exports.login = (req,res) => {
    const {email,password} = req.body;

    fs.readFile(path.join(__dirname,"../mockData/db.json"),"utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({message:"Veri Okunamadı"});
        }
        const db = JSON.parse(data);
        const user = db.users.find(u=>u.email === email && u.password === password);

        if(!user){
            return res.status(401).json({message:"Email Ya da Şifre Hatalı"});
        }

        const {password: pw, ...userWithoutPassword} = user;
        const token = jwt.sign({
            id:user.id,
            role:user.role,
            name:user.name,
            email:user.email
        },process.env.JWT_SECRET || "paketerasecretkey",{expiresIn:"1h"})

        res.json({
            message:"Giriş Başarılı",
            token,
            user: userWithoutPassword
        })
    })
}