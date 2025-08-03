# Paketera Task

## Proje Hakkında

Bu proje, üç ana kullanıcı türü (Admin, Müşteri, Tedarikçi) için tasarlanmış bir sipariş yönetim sistemi uygulamasıdır.  
- **Admin**: Kullanıcıları, müşterileri, tedarikçileri ve ürün türlerini yönetir, talepleri takip eder.  
- **Müşteri**: Sipariş talepleri oluşturur ve kendi taleplerini görüntüler.  
- **Tedarikçi**: Sipariş taleplerini görüntüler, ilgilendiği talepleri işaretler.  

Uygulama, React frontend ve Node.js backend’den oluşmakta, JWT tabanlı kimlik doğrulama ile güvenlik sağlanmaktadır.

## Kurulum ve Çalıştırma

1. Projeyi klonlayın:

```bash
 git clone https://github.com/mertalitosun/paketeraTask.git
```

2. Backend dizinine geçin ve paketleri yükleyin:


```bash
 cd backend
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

5. Frontend dizinine geçin ve paketleri yükleyin:

```bash
 cd ../frontend
 npm install
``` 

6. Frontend'i başlatın:

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
| GET    | /admin/product-types   | Ürün türlerini listele                      | Admin          |
| POST   | /admin/product-types   | Yeni ürün türü ekle                         | Admin           |
| GET   | /admin/order-requests   | Talepleri Listele                       | Admin           |
| GET   | /customer/orders   | Talepleri listele                       | Customer           |
| GET    | /customer/product-types   | Ürün türlerini listele                      | Customer          |
| POST   | /customer/order-requests   | Talep oluştur                       | Customer           |
| GET   | /customer/order-request/orderId   | Taleplerin detayını görüntüle                       | Customer           |
| GET   | /supplier/order-requests  | Talepleri Listele                   | Supplier           |
| GET   | /supplier/order-request/orderId   | Taleplerin detayını görüntüle                      | Supplier           |
| POST   | /supplier/order-request/orderId   | Tedarikçi ilgilenme durumu değiştir                 | Supplier           |

## Teknik Notlar

- **JWT tabanlı kimlik doğrulama** uygulanmıştır. Token süresi **1 saat** ile sınırlıdır.
-  **Axios** kütüphanesi ile React uygulamasında backend API çağrıları yapılmaktadır.
-  **React + Bootstrap** kullanılarak modern ve responsive kullanıcı arayüzü tasarlanmıştır.
-  Backend tarafında **Express.js** kullanılmış ve veriler geçici olarak **JSON dosyasında (mockData/db.json)** saklanmaktadır.
-  Uygulamada **kullanıcı yetkilendirmesi** (authentication) ve **rol bazlı erişim kontrolü** (authorization) mevcuttur.
