const DaftarProduk = document.querySelector('#DaftarProduk');
const StatusProduk = document.querySelector('#StatusProduk');

console.log (DaftarProduk);
console.log (StatusProduk);

async function ambilProduk() {
  // 1. Tampilkan loading
  StatusProduk.textContent = 'Memuat data produk...';
  StatusProduk.hidden = false;

  try {
    // 2. Kirim request dan tunggu response
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) throw new Error('Data gagal dimuat');

    // 3. Ubah response menjadi objek JavaScript
    const data = await response.json();

    // 4. Tampilkan ke halaman
    tampilkanProduk(data.produk);

    // 5. Sembunyikan loading
    StatusProduk.hidden = true;
  } catch (error) {
    // 6. Tampilkan pesan error
    StatusProduk.textContent = 'Gagal memuat data. Periksa koneksi lalu coba lagi.';
    StatusProduk.hidden = false;
  }
}

function tampilkanProduk(daftar) {
  DaftarProduk.textContent = '';  // kosongkan dulu

  daftar.forEach(function (produk) {
    const kartu = document.createElement('div');
    kartu.className = 'card-produk';

    const nama = document.createElement('h3');
    nama.textContent = produk.title;

    const harga = document.createElement('p');
    harga.textContent = '$' + produk.price;

    kartu.appendChild(nama);
    kartu.appendChild(harga);
    DaftarProduk.appendChild(kartu);
  });
}

ambilProduk();

// ===== TUGAS 2: FORM PEMESANAN =====
const formPesanan = document.querySelector('#formPesanan');
const namaPemesan = document.querySelector('#namaPemesan');
const inputProduk = document.querySelector('#inputProduk');
const inputJumlah = document.querySelector('#inputJumlah');
const errorNama = document.querySelector('#errorNama');
const errorProduk = document.querySelector('#errorProduk');
const errorJumlah = document.querySelector('#errorJumlah');
const hasilPesanan = document.querySelector('#hasilPesanan');

function validasiForm() {
  let valid = true;

  // bersihkan pesan error lama
  errorNama.textContent = '';
  errorProduk.textContent = '';
  errorJumlah.textContent = '';

  if (namaPemesan.value.trim().length < 3) {
    errorNama.textContent = 'Nama pemesan minimal 3 karakter.';
    valid = false;
  }

  if (inputProduk.value.trim().length < 3) {
    errorProduk.textContent = 'Nama produk minimal 3 karakter.';
    valid = false;
  }

  const jumlah = Number(inputJumlah.value);
  if (!Number.isInteger(jumlah) || jumlah < 1) {
    errorJumlah.textContent = 'Jumlah harus berupa angka minimal 1.';
    valid = false;
  }

  return valid;
}

// Event: submit
formPesanan.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!validasiForm()) {
    hasilPesanan.hidden = true;
    return;
  }

  const nama = namaPemesan.value.trim();
  const produk = inputProduk.value.trim();
  const jumlah = Number(inputJumlah.value);

  hasilPesanan.textContent =
    'Terima kasih, ' + nama + '! Pesanan ' + jumlah + ' x ' + produk + ' berhasil dibuat.';
  hasilPesanan.hidden = false;

  formPesanan.reset();
});

// Event: input (pesan error hilang saat pengguna mulai memperbaiki)
namaPemesan.addEventListener('input', function () {
  errorNama.textContent = '';
});
inputProduk.addEventListener('input', function () {
  errorProduk.textContent = '';
});
inputJumlah.addEventListener('input', function () {
  errorJumlah.textContent = '';
});