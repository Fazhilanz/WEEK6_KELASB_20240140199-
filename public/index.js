const daftarProduk = document.querySelector('#DaftarProduk');
const statusProduk = document.querySelector('#StatusProduk');

async function AmbilProduk() {
    //tamplikan loading
    StatusProduk.textContent = 'Loading...';
    StatusProduk.hidden = false;