const fs = require("fs");

exports.getOrders = (req,res) => {
    const {productTypeIds} = req.query;
    fs.readFile("./mockData/db.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({message:"Veri Okunamadı"});
        }

        const db = JSON.parse(data);

        //Tüm talepler listelenir
        if(!productTypeIds){
            const orders = db.order_requests;

            res.status(200).json({message:"Veriler Başarılı Şekilde Getirildi.", orders});
        }

        const productTypeIdArray = productTypeIds.split(",").map(id=>parseInt(id)).filter(id=>!isNaN(id));

        const matchingOrderIds = new Set(
            db.order_request_items.filter(item=>productTypeIdArray.includes(item.productTypeId)).map(item=>item.orderRequestId)
        ) 
        const filterOrders = db.order_requests.filter(order=>matchingOrderIds.has(order.id));

        return res.json({message:"Filterelenmiş veriler",filterOrders})
    })
} 