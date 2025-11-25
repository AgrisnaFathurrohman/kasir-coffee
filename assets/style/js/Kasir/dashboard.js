document.addEventListener("DOMContentLoaded", () => {
  // ===== JAM DAN TANGGAL =====
  function updateClock() {
    const now = new Date();
    const jam = now.getHours();

    const time = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const date = now.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    document.getElementById("time").textContent = time;
    document.getElementById("date").textContent = date;

    // Ucapan otomatis
    const greeting = document.getElementById("greeting");
    if (jam < 11) greeting.textContent = "Selamat Pagi, Kasir!";
    else if (jam < 15) greeting.textContent = "Selamat Siang, Kasir!";
    else if (jam < 19) greeting.textContent = "Selamat Sore, Kasir!";
    else greeting.textContent = "Selamat Malam, Kasir!";
  }

  setInterval(updateClock, 1000);
  updateClock();

  // ===== LOGOUT =====
  window.logout = function () {
    localStorage.clear();
    window.location.href = "/index.html";
  };

  // ===== DATA PESANAN =====
  const pesananData = JSON.parse(localStorage.getItem("pesananData")) || [];
  const hariIni = new Date().toLocaleDateString('id-ID');

  let totalPesananSelesai = 0;
  let totalPendapatan = 0;

  pesananData.forEach(p => {
    if (p.status === "Selesai") {
      totalPesananSelesai++;
      totalPendapatan += p.total;
    }
  });

  // ===== TAMPILKAN DATA =====
  document.getElementById('totalTransaksi').textContent = totalPesananSelesai;
  document.getElementById('totalPendapatan').textContent = `Rp ${totalPendapatan.toLocaleString('id-ID')}`;
});
