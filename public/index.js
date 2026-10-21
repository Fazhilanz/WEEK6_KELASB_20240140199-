
const DaftarProduk = document.querySelector('#DaftarProduk');
const StatusProduk = document.querySelector('#StatusProduk');

console.log(DaftarProduk);
console.log(StatusProduk);

// ===== TUGAS 1: FETCH API =====
async function ambilProduk() {
    StatusProduk.textContent = 'Memuat data produk...';
    StatusProduk.hidden = false;

    try {
        const response = await fetch('https://dummyjson.com/products');

        if (!response.ok) {
            throw new Error('Data gagal dimuat');
        }

        const data = await response.json();

        // DummyJSON menggunakan properti products
        tampilkanProduk(data.products);

        StatusProduk.hidden = true;
    } catch (error) {
        console.error('Error Fetch API:', error);

        StatusProduk.textContent =
            'Gagal memuat data. Periksa koneksi lalu coba lagi.';
        StatusProduk.hidden = false;
    }
}

function tampilkanProduk(daftar) {
    DaftarProduk.textContent = '';

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
const formPesanan = document.querySelector('#formpesanan');
const namaPemesan = document.querySelector('#namapemesan');
const inputProduk = document.querySelector('#inputproduk');
const inputJumlah = document.querySelector('#inputjumlah');

const errorNama = document.querySelector('#errornama');
const errorProduk = document.querySelector('#errorproduk');
const errorJumlah = document.querySelector('#errorjumlah');
const hasilPesanan = document.querySelector('#hasilpesanan');

function validasiForm() {
    let valid = true;

    errorNama.textContent = '';
    errorProduk.textContent = '';
    errorJumlah.textContent = '';

    if (namaPemesan.value.trim().length < 3) {
        errorNama.textContent =
            'Nama pemesan minimal 3 karakter.';
        valid = false;
    }

    if (inputProduk.value.trim().length < 3) {
        errorProduk.textContent =
            'Nama produk minimal 3 karakter.';
        valid = false;
    }

    const jumlah = Number(inputJumlah.value);

    if (
        inputJumlah.value.trim() === '' ||
        !Number.isInteger(jumlah) ||
        jumlah < 1
    ) {
        errorJumlah.textContent =
            'Jumlah harus berupa angka minimal 1.';
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
        'Terima kasih, ' + nama +
        '! Pesanan ' + produk +
        ' sebanyak ' + jumlah +
        ' berhasil dibuat.';

    hasilPesanan.hidden = false;

    formPesanan.reset();
});

// Event: input
namaPemesan.addEventListener('input', function () {
    errorNama.textContent = '';
});

inputProduk.addEventListener('input', function () {
    errorProduk.textContent = '';
});

inputJumlah.addEventListener('input', function () {
    errorJumlah.textContent = '';
});
