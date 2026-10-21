const daftarProduk = document.querySelector('#daftarProduk');
const statusProduk = document.querySelector('#statusProduk');

async function ambilProduk() {
  // 1. Tampilkan loading
  statusProduk.textContent = 'Memuat data produk...';
  statusProduk.hidden = false;

  try {
    // 2. Kirim request dan tunggu response
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) throw new Error('Data gagal dimuat');

    // 3. Ubah response menjadi objek JavaScript
    const data = await response.json();

    // 4. Tampilkan ke halaman
    tampilkanProduk(data.products);

    // 5. Sembunyikan loading
    statusProduk.hidden = true;
  } catch (error) {
    // 6. Tampilkan pesan error
    statusProduk.textContent = 'Gagal memuat data. Periksa koneksi lalu coba lagi.';
    statusProduk.hidden = false;
  }
}

function tampilkanProduk(daftar) {
  daftarProduk.textContent = '';  // kosongkan dulu

  daftar.forEach(function (produk) {
    const kartu = document.createElement('div');
    kartu.className = 'card-produk';

    const nama = document.createElement('h3');
    nama.textContent = produk.title;

    const harga = document.createElement('p');
    harga.textContent = '$' + produk.price;

    kartu.appendChild(nama);
    kartu.appendChild(harga);
    daftarProduk.appendChild(kartu);
  });
}

ambilProduk();