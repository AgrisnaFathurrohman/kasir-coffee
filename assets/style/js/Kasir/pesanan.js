document.addEventListener("DOMContentLoaded", () => {
  const pesananList = document.getElementById("pesananList");
  const filterStatus = document.getElementById("filterStatus");
  let daftarPesanan = JSON.parse(localStorage.getItem("pesananData")) || [];

  function tampilkanPesanan() {
    pesananList.innerHTML = "";

    const statusFilter = filterStatus.value;
    let dataTampil = daftarPesanan;
    if (statusFilter !== "semua") {
      dataTampil = daftarPesanan.filter(p => p.status === statusFilter);
    }

    if (dataTampil.length === 0) {
      pesananList.innerHTML = `<p>Tidak ada pesanan dengan status <b>${statusFilter}</b> ☕</p>`;
      return;
    }

    dataTampil.forEach((p, i) => {
      const card = document.createElement("div");
      card.classList.add("pesanan-card");

      card.innerHTML = `
        <div class="pesanan-header">
          <h3>Nomor Pesanan #${p.nomor}</h3>
          <span class="status ${p.status.toLowerCase()}">${p.status}</span>
        </div>

<ul class="pesanan-items">
  ${p.items.map(item => `
    <li>
      <strong>${item.nama}</strong> - Rp ${item.harga.toLocaleString('id-ID')}
      ${
        item.kategori === "minuman" && item.opsi
          ? `<br><small>☕ ${item.opsi.suhu || '-'} / 🍬 ${item.opsi.gula || '-'}</small>`
          : ''
      }
    </li>
  `).join('')}
</ul>


        <div class="pesanan-footer">
          <p class="total">Total: Rp ${p.total.toLocaleString('id-ID')}</p>
          <p class="pembayaran">💳 Metode Pembayaran: <strong>${p.metodePembayaran || '-'}</strong></p>

          <div class="pesanan-actions">
            ${p.status === "Menunggu" ? `<button class="btn-panggil" onclick="panggil(${i})">🔊 Panggil</button>` : ""}
            ${p.status !== "Selesai" ? `<button class="btn-selesai" onclick="selesaikan(${i})">✅ Selesai</button>` : ""}
            <button class="btn-hapus" onclick="hapusPesanan(${i})">🗑️ Hapus</button>
          </div>
        </div>
      `;
      pesananList.appendChild(card);
    });
  }

  window.filterPesanan = tampilkanPesanan;

  window.panggil = (index) => {
    alert(`Nomor Pesanan ${daftarPesanan[index].nomor} dipanggil!`);
    daftarPesanan[index].status = "Siap";
    simpanData();
  };

  window.selesaikan = (index) => {
    daftarPesanan[index].status = "Selesai";
    simpanData();
  };

  window.hapusPesanan = (index) => {
    if (confirm("Hapus pesanan ini?")) {
      daftarPesanan.splice(index, 1);
      simpanData();
    }
  };

  function simpanData() {
    localStorage.setItem("pesananData", JSON.stringify(daftarPesanan));
    tampilkanPesanan();
  }

  tampilkanPesanan();
});

  // ===== LOGOUT =====
  window.logout = function () {
    localStorage.clear();
    window.location.href = "/index.html";
  };