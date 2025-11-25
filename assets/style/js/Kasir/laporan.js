document.addEventListener("DOMContentLoaded", () => {
  tampilkanLaporan();
});

// ====== AMBIL DATA DARI PESANAN ======
function getDataPesanan() {
  const semuaPesanan = JSON.parse(localStorage.getItem("pesananData")) || [];
  // Hanya ambil pesanan yang statusnya "Selesai"
  return semuaPesanan.filter(p => p.status === "Selesai");
}

// ====== TAMPILKAN LAPORAN ======
function tampilkanLaporan(tanggalFilter = null) {
  const tbody = document.querySelector("#tabelLaporan tbody");
  const dataPesanan = getDataPesanan();

  tbody.innerHTML = "";
  let totalPendapatan = 0;
  let nomorUrut = 1;

  dataPesanan.forEach(p => {
    const tanggal = p.tanggal || new Date().toLocaleDateString("id-ID");

    // Jika filter aktif, lewati yang tidak cocok
    if (tanggalFilter && tanggal !== tanggalFilter) return;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nomorUrut++}</td>
      <td>${tanggal}</td>
      <td>#${p.nomor}</td>
      <td>${p.metodePembayaran || "-"}</td>
      <td>Rp ${p.total.toLocaleString("id-ID")}</td>
    `;
    tbody.appendChild(row);

    totalPendapatan += p.total;
  });

  document.getElementById("totalPendapatan").textContent =
    `Rp ${totalPendapatan.toLocaleString("id-ID")}`;
}

// ====== FILTER TANGGAL ======
function filterLaporan() {
  const input = document.getElementById("filterTanggal").value;
  if (!input) {
    alert("Pilih tanggal terlebih dahulu!");
    return;
  }

  // Ubah format ke format Indonesia agar cocok dengan data
  const tanggalFormatID = new Date(input).toLocaleDateString("id-ID");
  tampilkanLaporan(tanggalFormatID);
}

// ====== RESET FILTER ======
function resetFilter() {
  document.getElementById("filterTanggal").value = "";
  tampilkanLaporan();
}

// ====== LOGOUT ======
function logout() {
  localStorage.clear();
  window.location.href = "/index.html";
}
