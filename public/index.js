const daftarProduk = document.querySelector('#DaftarProduk');
const statusProduk = document.querySelector('#StatusProduk');

async function AmbilProduk() {
    //tamplikan loading
    StatusProduk.textContent = 'Loading...';
    StatusProduk.hidden = false;

    try {
        //mengirim request dan menunggu repons
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
        throw new Error(`Gagal mengambil data:);
        
    