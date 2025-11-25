    // Grafik Penjualan Mingguan
    const ctx = document.getElementById("salesChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
        datasets: [{
          label: "Penjualan (Rp)",
          data: [500000, 650000, 800000, 720000, 900000, 1200000, 950000],
          backgroundColor: "#6d4c41"
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });