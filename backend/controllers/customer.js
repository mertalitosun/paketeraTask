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



exports.getOrderDetails = (req, res) => {
    const userId = req.user.id;
    const orderId = parseInt(req.params.orderId);

    fs.readFile("./mockData/db.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Veri okunamadı" });
        }

        const db = JSON.parse(data);

        const order = db.order_requests.find(order => order.id === orderId && order.customerId === userId);
        if (!order) {
            return res.status(404).json({ message: "Sipariş bulunamadı" });
        }

        const items = db.order_request_items
            .filter(item => item.orderRequestId === orderId)
            .map(item => {
                const productType = db.product_types.find(type => type.id === item.productTypeId);
                return {
                    productTypeName: productType ? productType.name : "isim yok",
                    quantity: item.quantity
                };
            });

        const interestedSuppliers = db.supplier_interests
            .filter(interest => interest.orderRequestId === orderId && interest.status === "interested")
            .map(interest => {
                const supplier = db.users.find(user => user.id === interest.supplierId);
                if (!supplier) return null;

                const [first, last] = supplier.name.split(" ");
                const maskedFirst = first.slice(0, 2) + "*".repeat(first.length - 2);
                const maskedLast = last ? last.slice(0, 2) + "*".repeat(last.length - 2) : "";
                return `${maskedFirst} ${maskedLast}`;
            })
            .filter(Boolean);

        res.status(200).json({
            message: "Veriler Getirildi",
            order: {
                id: order.id,
                createdAt: order.createdAt,
                items,
                interestedSuppliers
            }
        });
    });
};
