function logout() {
  localStorage.clear();
  window.location.href = "../../../../index.html";
}
// Fungsi navigasi aman (biar ga error di file local)
function navigate(page) {
  window.location.href = page;
}

// ===== Simpan data pelanggan di localStorage =====
let customers = JSON.parse(localStorage.getItem("customers")) || [];

const customerTableBody = document.getElementById("customerTableBody");
const searchInput = document.getElementById("searchInput");
const addCustomerBtn = document.getElementById("addCustomerBtn");
const customerModal = document.getElementById("customerModal");
const modalTitle = document.getElementById("modalTitle");
const saveCustomer = document.getElementById("saveCustomer");
const cancelCustomer = document.getElementById("cancelCustomer");

const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");
const customerEmail = document.getElementById("customerEmail");
const customerMember = document.getElementById("customerMember");

let editIndex = -1;

// ====== Fungsi Konversi Member ======
function getDiscount(memberType) {
  switch (memberType) {
    case "Silver":
      return "5%";
    case "Gold":
      return "10%";
    case "VIP":
      return "15%";
    default:
      return "0%";
  }
}

// ====== Tampilkan Data ke Tabel ======
function renderTable() {
  customerTableBody.innerHTML = "";

  const searchText = searchInput.value.toLowerCase();

  customers
    .filter((c) => c.name.toLowerCase().includes(searchText))
    .forEach((c, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${c.name}</td>
        <td>${c.phone}</td>
        <td>${c.email || "-"}</td>
        <td>${c.member}</td>
        <td>${getDiscount(c.member)}</td>
        <td>Rp ${c.totalTransaksi?.toLocaleString("id-ID") || "0"}</td>
        <td>
          <button class="edit-btn" onclick="editCustomer(${i})">Edit</button>
          <button class="delete-btn" onclick="deleteCustomer(${i})">Hapus</button>
        </td>
      `;
      customerTableBody.appendChild(row);
    });
}

// ===== Tambah / Edit Pelanggan =====
addCustomerBtn.addEventListener("click", () => {
  modalTitle.textContent = "Tambah Pelanggan";
  editIndex = -1;
  customerName.value = "";
  customerPhone.value = "";
  customerEmail.value = "";
  customerMember.value = "Regular";
  customerModal.style.display = "flex";
});

saveCustomer.addEventListener("click", () => {
  const newCustomer = {
    name: customerName.value.trim(),
    phone: customerPhone.value.trim(),
    email: customerEmail.value.trim(),
    member: customerMember.value,
    totalTransaksi: customers[editIndex]?.totalTransaksi || 0,
  };

  if (!newCustomer.name || !newCustomer.phone) {
    alert("Nama dan nomor telepon wajib diisi!");
    return;
  }

  if (editIndex === -1) {
    customers.push(newCustomer);
  } else {
    customers[editIndex] = newCustomer;
  }

  localStorage.setItem("customers", JSON.stringify(customers));
  customerModal.style.display = "none";
  renderTable();
});

cancelCustomer.addEventListener("click", () => {
  customerModal.style.display = "none";
});

// ===== Edit =====
function editCustomer(index) {
  const c = customers[index];
  modalTitle.textContent = "Edit Pelanggan";
  editIndex = index;
  customerName.value = c.name;
  customerPhone.value = c.phone;
  customerEmail.value = c.email;
  customerMember.value = c.member;
  customerModal.style.display = "flex";
}

// ===== Hapus =====
function deleteCustomer(index) {
  if (confirm("Yakin ingin menghapus pelanggan ini?")) {
    customers.splice(index, 1);
    localStorage.setItem("customers", JSON.stringify(customers));
    renderTable();
  }
}

// ===== Search Real-Time =====
searchInput.addEventListener("keyup", renderTable);

// ===== Inisialisasi Awal =====
renderTable();
