let editingRow = null;
let imageData = "";

const productTable = document.getElementById("productTable");
const modal = document.getElementById("productModal");
const addBtn = document.getElementById("addProductBtn");
const cancelBtn = document.getElementById("cancelProduct");
const saveBtn = document.getElementById("saveProduct");
const categorySelect = document.getElementById("productCategory");
const variantSelect = document.getElementById("productVariant");
const searchInput = document.getElementById("search");

// ==== Tampilkan varian sesuai kategori ====
categorySelect.addEventListener("change", () => {
  const kategori = categorySelect.value;
  variantSelect.innerHTML = "";
  variantSelect.disabled = false;

  if (kategori === "Minuman") {
    variantSelect.innerHTML = `
      <option value="Dingin">Dingin</option>
      <option value="Normal">Normal</option>
      <option value="Panas">Panas</option>
    `;
  } else if (kategori === "Makanan") {
    variantSelect.innerHTML = `
      <option value="Normal">Normal</option>
      <option value="Sedang">Sedang</option>
      <option value="Pedas">Pedas</option>
    `;
  } else {
    variantSelect.innerHTML = `<option value="-" selected>-</option>`;
    variantSelect.disabled = true;
  }
});

// ==== Buka modal tambah produk ====
addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  document.getElementById("modalTitle").textContent = "Tambah Produk";
  clearModal();
  editingRow = null;
});

// ==== Tutup modal ====
cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// ==== Ambil gambar ====
// Upload file manual
document.getElementById("productImage").addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => imageData = e.target.result;
    reader.readAsDataURL(file);
  }
});

// Gunakan path gambar dari folder assets/
document.getElementById("productImagePath").addEventListener("input", function() {
  const path = this.value.trim();
  if (path) {
    imageData = path;
  }
});

// ==== Simpan Produk ====
saveBtn.addEventListener("click", () => {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const category = categorySelect.value;
  const variant = variantSelect.value;
  const stock = document.getElementById("productStock").value;

  if (!name || !price || !category || !variant || !stock || !imageData) {
    alert("Harap isi semua data dan pilih/isi gambar!");
    return;
  }

  if (editingRow) {
    editingRow.cells[0].querySelector("img").src = imageData;
    editingRow.cells[1].textContent = name;
    editingRow.cells[2].textContent = `Rp ${Number(price).toLocaleString()}`;
    editingRow.cells[3].textContent = category;
    editingRow.cells[4].textContent = variant;
    editingRow.cells[5].textContent = stock;
  } else {
    const newRow = productTable.insertRow();
    newRow.innerHTML = `
      <td><img src="${imageData}" alt="produk" style="width:60px; height:60px; object-fit:cover; border-radius:8px;"></td>
      <td>${name}</td>
      <td>Rp ${Number(price).toLocaleString()}</td>
      <td>${category}</td>
      <td>${variant}</td>
      <td>${stock}</td>
      <td>
        <button class="edit">✏️ Edit</button>
        <button class="delete">🗑️ Hapus</button>
      </td>
    `;
  }

  attachButtonEvents();
  modal.style.display = "none";
  clearModal();
});


// ==== Fungsi Edit & Hapus ====
function attachButtonEvents() {
  document.querySelectorAll(".edit").forEach(btn => {
    btn.onclick = e => {
      editingRow = e.target.closest("tr");
      const cells = editingRow.cells;
      document.getElementById("modalTitle").textContent = "Edit Produk";
      document.getElementById("productName").value = cells[1].textContent;
      document.getElementById("productPrice").value = cells[2].textContent.replace(/\D/g, "");
      categorySelect.value = cells[3].textContent;
      categorySelect.dispatchEvent(new Event("change"));
      variantSelect.value = cells[4].textContent;
      document.getElementById("productStock").value = cells[5].textContent;
      imageData = cells[0].querySelector("img").src;
      modal.style.display = "flex";
    };
  });

  document.querySelectorAll(".delete").forEach(btn => {
    btn.onclick = e => {
      if (confirm("Yakin ingin menghapus produk ini?")) {
        e.target.closest("tr").remove();
      }
    };
  });
}

// ==== Reset Form ====
function clearModal() {
  document.getElementById("productImage").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  categorySelect.value = "";
  variantSelect.innerHTML = `<option value="" disabled selected>Pilih Varian</option>`;
  variantSelect.disabled = true;
  document.getElementById("productStock").value = "";
  imageData = "";
}

// ==== Contoh Produk Awal ====
const sampleProducts = [
  {name: "Kopi Hitam", price: 15000, category: "Minuman", variant: "Panas", stock: 20, img: "/assets/images/kopi-hitam.jpg"},
  {name: "Cappuccino", price: 20000, category: "Minuman", variant: "Panas", stock: 20, img: "/assets/images/cappucinno.jpg"},
  {name: "Esoresso", price: 18000, category: "Minuman", variant: "Panas", stock: 20, img: "/assets/images/expresso.jpg"},
  {name: "Matcha Latte", price: 25000, category: "Minuman", variant: "Panas", stock: 20, img: "/assets/images/matcha-latte.jpg"},
  {name: "Ikan Bakar", price: 12500, category: "Makanan", variant: "Pedas", stock: 20, img: "/assets/images/ikan-bakar.jpg"},
  {name: "Americano", price: 17000, category: "Minuman", variant: "Panas", stock: 20, img: "/assets/images/americano.jpg"},
  {name: "Mie Goreng", price: 20000, category: "Makanan", variant: "Pedas", stock: 20, img: "/assets/images/mie-goreng.jpg"},
];

sampleProducts.forEach(p => {
  const row = productTable.insertRow();
  row.innerHTML = `
    <td><img src="${p.img}" alt="produk"></td>
    <td>${p.name}</td>
    <td>Rp ${p.price.toLocaleString()}</td>
    <td>${p.category}</td>
    <td>${p.variant}</td>
    <td>${p.stock}</td>
    <td>
      <button class="edit">✏️ Edit</button>
      <button class="delete">🗑️ Hapus</button>
    </td>
  `;
});

attachButtonEvents();

// ==== 🔍 Pencarian Real-Time (Nama Produk Saja) ====
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const rows = productTable.getElementsByTagName("tr");

  for (let row of rows) {
    const name = row.cells[1]?.textContent.toLowerCase(); // hanya kolom nama produk

    if (name && name.includes(query)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

function logout() {
  localStorage.clear();
  window.location.href = "/index.html";
}
