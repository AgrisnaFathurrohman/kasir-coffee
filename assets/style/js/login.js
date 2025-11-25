// ===== Simulasi user (masih frontend-only) =====
const users = [
  { username: "admin", password: "123", role: "admin" },
  { username: "kasir", password: "123", role: "kasir" }
];

// pasang event listener agar bisa tekan Enter
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault(); // mencegah reload halaman
    login();
  });
});

function login() {
  const userInput = document.getElementById("username").value.trim();
  const passInput = document.getElementById("password").value;
  const errorMsg = document.getElementById("error");
  errorMsg.textContent = ""; // reset pesan

  // validasi sederhana
  if (!userInput || !passInput) {
    errorMsg.textContent = "Username dan password wajib diisi.";
    return;
  }

  // cari user (case-sensitive)
  const user = users.find(u => u.username === userInput && u.password === passInput);

  if (user) {
    // simpan data user (hanya untuk demo) -> simpan role + username agar lebih berguna
    localStorage.setItem("user", JSON.stringify({ username: user.username, role: user.role }));

    // redirect sesuai role
    if (user.role === "admin") {
      window.location.href = "/assets/Page/Admin/dashboard.html";
    } else {
      window.location.href = "/assets/Page/Kasir/dashboard.html";
    }
  } else {
    errorMsg.textContent = "Username atau password salah!";
  }
}
