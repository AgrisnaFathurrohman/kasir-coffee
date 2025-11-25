    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("Akses ditolak!");
      window.location.href = "/index.html";
      return;
    }
    const user = JSON.parse(userData);
    if (user.role !== "admin") {
      alert("Akses ditolak!");
      window.location.href = "/index.html";
    }