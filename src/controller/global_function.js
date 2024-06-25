function formatTanggalPesan(tanggal) {
    const date = new Date(tanggal);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2,'0');
    const minnute = String(date.getMinutes()).padStart(2,'0');
    return `${year}-${month}-${day} ${hours}.${minnute}`;
  }


  module.exports = {
    formatTanggalPesan
  }