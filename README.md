# MyCafe

MyCafe adalah aplikasi kasir berbasis web yang dibangun menggunakan HTML, CSS, dan JavaScript tanpa backend. Project ini berfokus pada desain antarmuka (front-end) yang menampilkan halaman transaksi, daftar produk, dan laporan harian secara visual layaknya sistem kasir di coffee shop pada umumnya.

Walaupun tidak terhubung ke database atau server, MyCafe tetap memberikan gambaran lengkap mengenai alur kerja kasir melalui tampilan yang interaktif dan mudah digunakan. Aplikasi ini cocok digunakan sebagai prototype, latihan front-end, atau konsep UI/UX untuk sistem kasir.

## 🙌 Tentang Aplikasi

Login :
- admin | 123
- kasir | 123

Dibangun menggunakan:
- HTML5
- CSS3
- JavaScript (Vanilla)


## ⚙️ Kebutuhan Sistem

- Browser modern (Chrome, Edge, Firefox, dll)
- Tidak memerlukan server — berjalan langsung di local (offline)
- Pastikan semua file tetap dalam struktur folder:

```bash
MyCafe/
│
├── index.html                  
│
├── /assets/
│   │
│   ├── /images/                
│   │   ├── kopi-hitam.jpg
│   │   ├── cappucinno.jpg
│   │   ├── expresso.jpg
│   │   ├── ikan-bakar.jpg
│   │   ├── amerikano.jpg
│   │   ├── macha-latte.jpg
│   │   └── mie-goreng.jpg
│   │
│   ├── /Pages/               
│   │   ├── /Admin/            
│   │   │   ├── dashboard.html
│   │   │   ├── produk.html
│   │   │   ├── laporan.html
│   │   │   └── pelanggan.html
│   │   │
│   │   └── /Kasir/           
│   │       ├── dashboard.html
│   │       ├── transaksi.html
│   │       ├── pesanan.html
│   │       └── laporan.html
│   │
│   ├── /MyCafe/
│   │   ├── 1.PNG
│   │   ├── 2.PNG
│   │   ├── 3.PNG
│   │   ├── 4.PNG
│   │   ├── 5.PNG
│   │   ├── 6.PNG
│   │   ├── 7.PNG
│   │   └── 8.PNG
│   │
│   └── /style/                
│       │
│       ├── /css/              
│       │   ├── /Admin/        
│       │   │   ├── dashboard.css
│       │   │   ├── produk.css
│       │   │   ├── laporan.css
│       │   │   └── pelanggan.css
│       │   │
│       │   ├── /Kasir/       
│       │   │    ├── dashboard.css
│       │   │    ├── transaksi.css
│       │   │    ├── pesanan.css
│       │   │    └── laporan.css
│       │   │
│       │   └── login.css   
│       │
│       │
│       └── /js/               
│           ├── /Admin/        
│           │   ├── akses-login.js
│           │   ├── component.js
│           │   ├── produk.js
│           │   ├── laporan.js
│           │   └── pelanggan.js
│           │
│           │ /Kasir/        
│           │    ├── dashboard.js
│           │    ├── transaksi.js
│           │    ├── pesanan.js
│           │    └── laporan.js
│           │
│           └── login.js
│
│              
└── README.md             
          
```
    
## 💾 Penyimpanan Data

MyCafe menggunakan LocalStorage dari browser untuk menyimpan:

- Data produk
- Data transaksi
- Daftar pesanan

⚠️ Data akan hilang jika browser dihapus cache-nya atau disetel ulang.


## 🚀 Cara Menggunakan Aplikasi

1️⃣ Login

- Buka halaman utama aplikasi (index.html).
- Pilih role (Admin atau Kasir).
- Masukkan username dan password sesuai role yang diinginkan.
- Setelah login, Anda akan diarahkan ke halaman utama sesuai peran Anda.

2️⃣ Halaman Admin

📦 Menu Produk

- Admin dapat menambah, mengedit, atau menghapus produk (makanan & minuman).
- Tambahkan gambar produk dari folder /assets/images/.

Pilih kategori:

- Minuman → Memiliki varian suhu (Dingin / Normal / Panas).

- Makanan → Memiliki varian rasa (Normal / Sedang / Pedas).

- Tekan 💾 Simpan untuk menyimpan perubahan.

📊 Laporan

- Menampilkan daftar transaksi yang sudah selesai.
- Total pendapatan akan ditampilkan otomatis berdasarkan data transaksi.

👥 Pelanggan (opsional)

- Menampilkan daftar pelanggan jika fitur ini diaktifkan

3️⃣ Halaman Kasir

💰 Transaksi

- Masukkan Nomor Pesanan / Meja.
- Pilih produk dari daftar.
- Untuk minuman, Anda bisa memilih suhu dan tingkat gula.
- Untuk makanan, bisa memilih tingkat kepedasan.
- Tambahkan produk ke keranjang, pilih metode pembayaran (Tunai / QRIS), lalu klik 💾 Simpan Pesanan.
- Pesanan akan tersimpan dan muncul di halaman Pesanan.

📋 Pesanan

- Menampilkan daftar pesanan aktif.
- Status pesanan bisa diubah:
- Menunggu → Siap → Selesai
- Tombol tersedia untuk 🔊 Panggil, ✅ Selesai, dan 🗑️ Hapus pesanan.

4️⃣ Halaman Laporan

- Semua transaksi yang sudah selesai akan tercatat di laporan.

- Laporan menampilkan:
    - Nomor pesanan
    - Daftar produk
    - Metode pembayaran
    - Total transaksi

- Dapat digunakan sebagai rekap harian penjualan kafe.

## 📸 Screenshots

![App Screenshot](/assets/MyCafe/1.PNG)

![App Screenshot](/assets/MyCafe/2.PNG)

![App Screenshot](/assets/MyCafe/3.PNG)

![App Screenshot](/assets/MyCafe/4.PNG)

![App Screenshot](/assets/MyCafe/5.PNG)

![App Screenshot](/assets/MyCafe/6.PNG)

![App Screenshot](/assets/MyCafe/7.PNG)

![App Screenshot](/assets/MyCafe/8.PNG)