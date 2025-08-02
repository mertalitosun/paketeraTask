const fs = require("fs");

// Talep listeler
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


exports.getOrderDetails = (req, res) => {
  const userId = req.user.id;
  const orderId = parseInt(req.params.orderId);

  fs.readFile("./mockData/db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Veri okunamadı" });

    const db = JSON.parse(data);

    const order = db.order_requests.find(o => o.id === orderId);
    if (!order) return res.status(404).json({ message: "Sipariş bulunamadı" });

    // Sipariş ürün detayları
    const items = db.order_request_items
      .filter(item => item.orderRequestId === orderId)
      .map(item => {
        const productType = db.product_types.find(pt => pt.id === item.productTypeId);
        return {
          productTypeName: productType ? productType.name : "Bilinmiyor",
          quantity: item.quantity,
        };
      });

    // Tedarikçinin bu siparişle ilgilenme durumu
    const interest = db.supplier_interests.find(
      si => si.orderRequestId === orderId && si.supplierId === userId
    );

    res.json({
      order: {
        id: order.id,
        createdAt: order.createdAt,
        items,
        interestStatus: interest ? interest.status : "not_interested",
      }
    });
  });
};
