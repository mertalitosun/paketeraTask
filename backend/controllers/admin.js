const fs = require("fs");

exports.getAllUsers = (req,res) =>{
    fs.readFile("./mockData/db.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({message:"Veri Okunamadı"});
        }
        const db = JSON.parse(data);
        res.json(db.users);
    });
}

exports.getCustomers = (req,res) => {
    fs.readFile("./mockData/db.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({message:"Veri Okunamadı"});
        }
        const db = JSON.parse(data);
        const customers = db.users.filter(user => user.role === "customer");
        res.json(customers);
    });
}

exports.getSuppliers = (req,res) => {
    fs.readFile("./mockData/db.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({message:"Veri Okunamadı"});
        }
        const db = JSON.parse(data);
        const suppliers = db.users.filter(user => user.role === "supplier");
        res.json(suppliers);
    });
}

exports.getProductTypes = (req,res) => {
    fs.readFile("./mockData/db.json", "utf-8", (err, data) => {
        if (err) return res.status(500).json({ message: "Veri okunamadı" });
    
        const db = JSON.parse(data);
        res.json(db.product_types);
      });
}

exports.postProductTypes = (req,res) => {
    const { name } = req.body;
    if(!name){
        return res.status(400).json({message:"Ürün türü adı gerekli"});
    }

    fs.readFile("./mockData/db.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({message:"Veri Okunamadı"});
        }

        const db = JSON.parse(data);

        const isExist = db.product_types.some(type => type.name.toLowerCase() === name.toLowerCase());
        if(isExist){
            return res.status(400).json({message:"Bu Ürün Türü Mevcut"});
        };

        const newType = {
            id: db.product_types.length + 1,
            name
        };

        db.product_types.push(newType);

        fs.writeFile("./mockData/db.json",JSON.stringify(db),(err)=>{
            if(err){
                return res.status(500).json({message:"Ürün Türü Eklenemedi"});
            }
            res.status(201).json({message:"Ürün Türü Başarı İle Eklendi",product_type:newType})
        })
    })
}