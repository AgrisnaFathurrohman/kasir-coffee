// ====== DATA DAN VARIABEL ======
let keranjang = [];
let pesananAktif = null;
let produkDipilih = null;

// ====== DATA PRODUK (dengan stok dan kategori) ======
let produk = JSON.parse(localStorage.getItem("dataProduk")) || [
  { id: 1, nama: "Kopi Hitam", harga: 15000, stok: 20, kategori: "minuman", gambar: "/assets/images/kopi-hitam.jpg" },
  { id: 2, nama: "Cappuccino", harga: 20000, stok: 20, kategori: "minuman", gambar: "/assets/images/cappucinno.jpg" },
  { id: 3, nama: "Espresso", harga: 18000, stok: 20, kategori: "minuman", gambar: "/assets/images/expresso.jpg" },
  { id: 4, nama: "Matcha Latte", harga: 25000, stok: 20, kategori: "minuman", gambar: "/assets/images/matcha-latte.jpg" },
  { id: 5, nama: "Ikan Bakar", harga: 12000, stok: 20, kategori: "makanan", gambar: "/assets/images/ikan-bakar.jpg" },
  { id: 6, nama: "Americano", harga: 17000, stok: 20, kategori: "minuman", gambar: "/assets/images/americano.jpg" },
  { id: 7, nama: "Mie Goreng", harga: 20000, stok: 20, kategori: "makanan", gambar: "/assets/images/mie-goreng.jpg" },
];

// ====== FUNGSI TAMPIL PRODUK ======
function tampilkanProduk() {
  const list = document.getElementById("produkList");
  if (!list) return;

  list.innerHTML = "";
  produk.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("produk-card");
    card.innerHTML = `
      <img src="${item.gambar}" alt="${item.nama}" class="produk-img">
      <h4>${item.nama}</h4>
      <p>Rp ${item.harga.toLocaleString("id-ID")}</p>
      <p class="stok">Stok: <b>${item.stok}</b></p>
      <button onclick="tambahKeKeranjang(${item.id})" ${item.stok <= 0 ? "disabled" : ""}>
        ${item.stok > 0 ? "Tambah" : "Habis"}
      </button>
    `;
    list.appendChild(card);
  });
}

// ====== TAMBAH PRODUK ======
function tambahKeKeranjang(id) {
  const nomorInput = document.getElementById("nomorPesanan");
  const nomor = parseInt(nomorInput.value, 10);

  if (!pesananAktif) {
    if (isNaN(nomor) || nomor <= 0) {
      alert("Masukkan nomor pesanan terlebih dahulu!");
      return;
    }
    pesananAktif = { nomor, items: [], total: 0, status: "Menunggu" };
  }

  produkDipilih = produk.find((p) => p.id === id);
  if (!produkDipilih) return;

  if (produkDipilih.stok <= 0) {
    alert("Stok produk ini habis!");
    return;
  }

  // Buka modal sesuai kategori
  if (produkDipilih.kategori === "minuman") {
    bukaModalMinuman();
  } else if (produkDipilih.kategori === "makanan") {
    bukaModalMakanan();
  }
}

// ====== MODAL MINUMAN ======
function bukaModalMinuman() {
  const modal = document.getElementById("pilihanModal");
  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-content">
      <h3>Opsi Minuman</h3>
      <label for="pilihSuhu">Suhu Minuman:</label>
      <select id="pilihSuhu">
        <option value="Normal">Normal</option>
        <option value="Dingin">Dingin</option>
        <option value="Panas">Panas</option>
      </select>

      <label for="pilihGula">Tingkat Gula:</label>
      <select id="pilihGula">
        <option value="Normal">Normal</option>
        <option value="Sedikit">Sedikit</option>
        <option value="Manis">Manis</option>
        <option value="Extra Manis">Extra Manis</option>
      </select>

      <div class="modal-buttons">
        <button class="btn-tambah" onclick="konfirmasiPilihanMinuman()">Tambah ke Keranjang</button>
        <button class="btn-batal" onclick="tutupModal()">Batal</button>
      </div>
    </div>
  `;

  modal.style.display = "flex";
}

function konfirmasiPilihanMinuman() {
  const suhu = document.getElementById("pilihSuhu").value;
  const gula = document.getElementById("pilihGula").value;
  if (!produkDipilih) return;

  if (produkDipilih.stok <= 0) {
    alert("Stok habis!");
    tutupModal();
    return;
  }

  produkDipilih.stok -= 1;
  localStorage.setItem("dataProduk", JSON.stringify(produk));

  keranjang.push({ ...produkDipilih, suhu, gula });
  renderKeranjang();
  tampilkanProduk();
  tutupModal();
}

// ====== MODAL MAKANAN ======
function bukaModalMakanan() {
  const modal = document.getElementById("pilihanModal");
  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-content">
      <h3>Opsi Makanan</h3>
      <label for="pilihLevelPedas">Level Pedas:</label>
      <select id="pilihLevelPedas">
        <option value="Tidak Pedas">Tidak Pedas</option>
        <option value="Sedang">Sedang</option>
        <option value="Pedas">Pedas</option>
        <option value="Extra Pedas">Extra Pedas</option>
      </select>

      <div class="modal-buttons">
        <button class="btn-tambah" onclick="konfirmasiPilihanMakanan()">Tambah ke Keranjang</button>
        <button class="btn-batal" onclick="tutupModal()">Batal</button>
      </div>
    </div>
  `;

  modal.style.display = "flex";
}

function konfirmasiPilihanMakanan() {
  const levelPedas = document.getElementById("pilihLevelPedas").value;
  if (!produkDipilih) return;

  if (produkDipilih.stok <= 0) {
    alert("Stok habis!");
    tutupModal();
    return;
  }

  produkDipilih.stok -= 1;
  localStorage.setItem("dataProduk", JSON.stringify(produk));

  keranjang.push({ ...produkDipilih, suhu: "-", gula: "-", levelPedas });
  renderKeranjang();
  tampilkanProduk();
  tutupModal();
}

// ====== MODAL GLOBAL ======
function tutupModal() {
  const modal = document.getElementById("pilihanModal");
  if (modal) modal.style.display = "none";
}

// ====== RENDER KERANJANG ======
function renderKeranjang() {
  const list = document.getElementById("keranjangList");
  if (!list) return;
  list.innerHTML = "";

  let total = 0;
  keranjang.forEach((item, index) => {
    total += item.harga;
    const infoTambahan =
      item.kategori === "minuman"
        ? `(${item.suhu}, ${item.gula})`
        : item.levelPedas
        ? `(Level: ${item.levelPedas})`
        : "";

    const div = document.createElement("div");
    div.classList.add("keranjang-item");
    div.innerHTML = `
      <span>${item.nama} ${infoTambahan}</span>
      <button onclick="hapusItem(${index})">❌</button>
    `;
    list.appendChild(div);
  });

  document.getElementById("totalHarga").textContent =
    "Rp " + total.toLocaleString("id-ID");
}

// ====== HAPUS ITEM ======
function hapusItem(index) {
  const item = keranjang[index];
  const produkAsli = produk.find((p) => p.id === item.id);
  if (produkAsli) produkAsli.stok += 1;

  keranjang.splice(index, 1);
  localStorage.setItem("dataProduk", JSON.stringify(produk));
  renderKeranjang();
  tampilkanProduk();
}

// ====== SIMPAN PESANAN ======
function simpanPesanan() {
  if (!pesananAktif) return alert("Buat pesanan dulu!");
  if (keranjang.length === 0) return alert("Keranjang masih kosong!");

  const metode = document.querySelector('input[name="metodePembayaran"]:checked');
  if (!metode) return alert("Pilih metode pembayaran!");

  // Proses semua item dengan struktur yang sesuai
  const itemsDenganOpsi = keranjang.map(i => {
    if (i.kategori === "minuman") {
      // untuk minuman: simpan varian suhu dan gula
      return {
        nama: i.nama,
        harga: i.harga,
        kategori: i.kategori,
        opsi: {
          suhu: i.suhu || "-",
          gula: i.gula || "-"
        }
      };
    } else {
      // untuk makanan: tidak perlu varian
      return {
        nama: i.nama,
        harga: i.harga,
        kategori: i.kategori,
        opsi: null
      };
    }
  });

  pesananAktif.items = itemsDenganOpsi;
  pesananAktif.total = itemsDenganOpsi.reduce((sum, i) => sum + i.harga, 0);
  pesananAktif.metodePembayaran = metode.value;
  pesananAktif.status = "Menunggu";

  let semuaPesanan = JSON.parse(localStorage.getItem("pesananData")) || [];
  semuaPesanan = semuaPesanan.filter(
    p => parseInt(p.nomor) !== parseInt(pesananAktif.nomor)
  );
  semuaPesanan.push(pesananAktif);
  localStorage.setItem("pesananData", JSON.stringify(semuaPesanan));

  alert(`✅ Pesanan #${pesananAktif.nomor} disimpan!`);

  // Reset form & keranjang
  pesananAktif = null;
  keranjang = [];
  document.getElementById("keranjangList").innerHTML = "";
  document.getElementById("totalHarga").textContent = "Rp 0";
  document.getElementById("nomorPesanan").value = "";
  tampilkanProduk();
}


// ====== INISIALISASI ======
document.addEventListener("DOMContentLoaded", tampilkanProduk);

window.logout = function () {
  localStorage.clear();
  window.location.href = "/index.html";
};
