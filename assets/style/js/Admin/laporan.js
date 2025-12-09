function logout() {
  localStorage.clear();
  window.location.href = "/index.html";
}

// ======== Ambil Data Transaksi dari LocalStorage ========
let transaksiData = JSON.parse(localStorage.getItem("transaksi")) || [];

// ======== Elemen DOM ========
const laporanTableBody = document.getElementById("laporanTableBody");
const totalTransaksi = document.getElementById("totalTransaksi");
const totalPendapatan = document.getElementById("totalPendapatan");
const filterDate = document.getElementById("filterDate");
const searchInput = document.getElementById("searchInput");
const resetFilter = document.getElementById("resetFilter");

// ======== Tampilkan Laporan ========
function renderLaporan(data) {
  laporanTableBody.innerHTML = "";
  let total = 0;

  data.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.tanggal}</td>
      <td>${item.nama}</td>
      <td>${item.jumlah}</td>
      <td>Rp ${item.harga.toLocaleString()}</td>
      <td>Rp ${(item.jumlah * item.harga).toLocaleString()}</td>
    `;
    laporanTableBody.appendChild(row);
    total += item.jumlah * item.harga;
  });

  totalTransaksi.textContent = data.length;
  totalPendapatan.textContent = "Rp " + total.toLocaleString();
}

// ======== Filter Berdasarkan Tanggal / Nama Produk ========
function filterData() {
  const selectedDate = filterDate.value;
  const searchTerm = searchInput.value.toLowerCase();

  const filtered = transaksiData.filter(item => {
    const matchDate = selectedDate ? item.tanggal === selectedDate : true;
    const matchName = item.nama.toLowerCase().includes(searchTerm);
    return matchDate && matchName;
  });

  renderLaporan(filtered);
}

// ======== Event Listener ========
filterDate.addEventListener("change", filterData);
searchInput.addEventListener("input", filterData);
resetFilter.addEventListener("click", () => {
  filterDate.value = "";
  searchInput.value = "";
  renderLaporan(transaksiData);
});

// ======== Simulasi Data Awal (jika belum ada) ========
if (transaksiData.length === 0) {
  transaksiData = [
    { tanggal: "2025-10-18", nama: "Kopi Latte", jumlah: 2, harga: 25000 },
    { tanggal: "2025-10-18", nama: "Americano", jumlah: 1, harga: 20000 },
  ];
  localStorage.setItem("transaksi", JSON.stringify(transaksiData));
}

// ======== Tampilkan Data Awal ========
renderLaporan(transaksiData);