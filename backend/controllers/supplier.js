const fs = require("fs");

// Talep listeler
exports.getOrders = (req, res) => {
  const { productTypeIds } = req.query;

  fs.readFile("./mockData/db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Veri Okunamadı" });
    }

    const db = JSON.parse(data);

    let filteredOrders = db.order_requests;

    if (productTypeIds) {
      const productTypeIdArray = productTypeIds
        .split(",")
        .map((id) => parseInt(id))
        .filter((id) => !isNaN(id));

      const matchingOrderIds = new Set(
        db.order_request_items
          .filter((item) => productTypeIdArray.includes(item.productTypeId))
          .map((item) => item.orderRequestId)
      );

      filteredOrders = db.order_requests.filter((order) =>
        matchingOrderIds.has(order.id)
      );
    }

    // Her order'ın içine o order'a ait ürünleri eklendi
    const ordersWithItems = filteredOrders.map((order) => {
      const items = db.order_request_items.filter(
        (item) => item.orderRequestId === order.id
      );
      return {
        ...order,
        items,
      };
    });

    return res.json({
      message: productTypeIds
        ? "Filtrelenmiş veriler"
        : "Veriler Başarılı Şekilde Getirildi.",
      orders: ordersWithItems,
    });
  });
};

//talep detayları
exports.getOrderDetails = (req, res) => {
  const userId = req.user.id;
  const orderId = parseInt(req.params.orderId);

  fs.readFile("./mockData/db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Veri okunamadı" });

    const db = JSON.parse(data);

    const order = db.order_requests.find(o => o.id === orderId);
    if (!order) return res.status(404).json({ message: "Sipariş bulunamadı" });

    const items = db.order_request_items
      .filter(item => item.orderRequestId === orderId)
      .map(item => {
        const productType = db.product_types.find(pt => pt.id === item.productTypeId);
        return {
          productTypeName: productType ? productType.name : "Bilinmiyor",
          quantity: item.quantity,
        };
      });

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

//ürün tipleri
exports.getProductTypes = (req,res) => {
  fs.readFile("./mockData/db.json", "utf-8", (err, data) => {
      if (err) return res.status(500).json({ message: "Veri okunamadı" });
  
      const db = JSON.parse(data);
      res.json(db.product_types);
    });
}

exports.setInterestStatus = (req,res) => {
  const userId = req.user.id;
  const orderId = parseInt(req.params.orderId);
  const {status} = req.body;

  if(!["interested","not_interested"].includes(status)){
    return res.status(400).json({message:"Geçersiz Durum"});
  }

  fs.readFile("./mockData/db.json","utf-8",(err,data)=>{
    if(err){
      return res.status(500).json({message:"Veri Okunamadı"});
    }

    const db = JSON.parse(data);

    const existingInterestIndex = db.supplier_interests.findIndex(interest => interest.orderRequestId === orderId && interest.supplierId);

    if(existingInterestIndex !== -1){
      db.supplier_interests[existingInterestIndex].status = status;
    }else{
      const newInterest = {
        id: db.supplier_interests.length + 1,
        orderRequestId: orderId,
        supplierId: userId,
        status
      }
      db.supplier_interests.push(newInterest);
    }
    fs.writeFile("./mockData/db.json",JSON.stringify(db,null,2),err=>{
      if(err){
        return res.status(500).json({message:"Veri Kaydedilmedi"});
      }
      res.json({
        message:"Durum KAydedildi",
        status
      })
    })
  })
}