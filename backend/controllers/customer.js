const fs = require("fs");


//sipariş oluştur
exports.createOrderRequest = (req,res) => {
    const customerId = req.user.id;
    const {items} = req.body;

    if(!items || !Array.isArray(items) || items.length === 0){
        return res.status(400).json({message:"Geçerli ürün listesi gerekli"});
    }

    fs.readFile("./mockData/db.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({message:"Veri Okunamadı"});
        }

        const db = JSON.parse(data);

        const newOrderRequest = {
            id: db.order_requests.length + 1,
            customerId,
            createdAt: new Date().toISOString()
        };

        db.order_requests.push(newOrderRequest);

        const newItems = items.map((item,index)=>({
            id: db.order_request_items.length + 1 +index,
            orderRequestId: newOrderRequest.id,
            productTypeId: item.productTypeId,
            quantity: item.quantity
        }));

        db.order_request_items.push(...newItems);

        fs.writeFile("./mockData/db.json", JSON.stringify(db,null,2),(err)=>{
            if(err){
                return res.status(500).json({message:"Sipariş kaydedildi"})
            }

            res.status(201).json({
                message:"sipariş başarıyla oluşturuldu",
                order: newOrderRequest,
                items: newItems
            })
        })
    })
}

exports.getAllOrders = (req,res) => {
    const userId = req.user.id;

    fs.readFile("./mockData/db.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({message:"Veri Okunamadı"});
        }

        const db = JSON.parse(data);
        const orders = db.order_requests.filter((order)=> order.customerId === userId);

        return res.status(200).json({message:"Siparişler başarılı şekilde getirildi",orders})
    })
}