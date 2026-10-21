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