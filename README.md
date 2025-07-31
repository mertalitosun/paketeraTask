# Paketera Task

**Açıklama**  
Bu proje, üç ana kullanıcı türü (Admin, Müşteri, Tedarikçi) için sipariş yönetim sistemi olarak geliştirilmiştir. Kullanıcılar, ürün türlerini görüntüleyebilir, sipariş talepleri oluşturabilir, tedarikçiler taleplere ilgi gösterebilir, ve admin bu süreçleri yönetebilir.

## Kurulum ve Çalıştırma

1. Projeyi klonlayın:

```bash
 git clone https://github.com/kullaniciadi/proje-adi.git
 cd proje-adi/backend 
```

2. Gerekli paketleri yükleyin:

```bash
 npm install 
```

3. .env dosyasını oluşturun ve aşağıdaki gibi ayarlayın:

```bash
    PORT=5000
    JWT_SECRET=paketerasecretkey
```

4. Server'ı başlatın

```bash
 npm start
``` 

## API Endpoints (Backend)

| Method | Route                  | Açıklama                                   | Yetki           |
|--------|------------------------|--------------------------------------------|-----------------|
| POST   | /login                 | Kullanıcı girişi                           | Tüm kullanıcılar |
| GET    | /admin/users           | Tüm kullanıcıları listele                   | Admin           |
| GET    | /admin/customers       | Sadece müşterileri listele                  | Admin           |
| GET    | /admin/suppliers       | Sadece tedarikçileri listele                | Admin           |
| GET    | /admin/product-types   | Ürün türlerini listele                      | Admin,customer          |
| POST   | /admin/product-types   | Yeni ürün türü ekle                         | Admin           |
| GET   | /admin/order-requests   | Talepleri Listele                       | Admin           |
