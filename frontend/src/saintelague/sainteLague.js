import { rounded } from "../utils";

function sainteLague(arr, jumlahKursi) {
  // variabel menyimpan data array sementara
  let hasilPerhitungan = [];
  let urutanHasilPerhitungan = [];

  // mencari hasil dari pembagian suara partai dengan saintelague
  for (let i = 0; i < arr.length; i++) {
    let temp = [];
    let bagi = [];
    for (let j = 0; j < arr.length; j++) {
      // pembagi sainte lague
      let nilaiBagi = 2 * j + 1;
      if (nilaiBagi < jumlahKursi) {
        bagi.push(nilaiBagi);

        // rumus saintelague membulatkan dengan fungsi rounded
        let hasilSainteLague = rounded(arr[i].total_suara_sah / nilaiBagi);

        // simpan data dalam bentuk object
        let data = {
          nama_parpol: arr[i].nama_parpol,
          suaraSah: arr[i].total_suara_sah,
          hasilSainteLague: hasilSainteLague,
          bagi: bagi,
          [`hasilSainteLagueBagi${nilaiBagi}`]: Number(hasilSainteLague),
        };

        // push data ke variabel temp
        temp.push(data);
      }
    }

    // push temp ke variabel hasilPerhitungan
    hasilPerhitungan.push(temp);

    // push temp dengan spread opertor ke variabel urutanHasilPerhitungan
    // spread opertor agar data yang dimasukan berbentuk object
    urutanHasilPerhitungan.push(...temp);
  }

  // mengurutkan urutanHasilPerhitungan dari terbesar ke terkecil dengan sort
  urutanHasilPerhitungan.sort(
    (a, b) => b.hasilSainteLague - a.hasilSainteLague
  );

  // fungsi menghitung total perolehan kursi
  function perolehanKursi(sortArr, partai, jumlahKursi) {
    let total = 0;
    for (let i = 0; i < sortArr.length; i++) {
      if (i < jumlahKursi) {
        if (sortArr[i].nama_parpol === partai) {
          total++;
        }
      }
    }
    return total;
  }

  // variabel array hasilAkhir
  let hasilAkhir = [];

  // mencari hasilAkhir dengan meringkas hasilPerhitungan
  for (let i = 0; i < hasilPerhitungan.length; i++) {
    let obj = {};

    for (let j = 0; j < hasilPerhitungan[i].length; j++) {
      // menambahkan object dari hasilPerhitungan ke variabel obj
      // agar menghindari duplikasi data
      obj = Object.assign(obj, hasilPerhitungan[i][j]);

      // hapus object hasilSainteLague
      delete obj.hasilSainteLague;
    }

    // menambahkan object perolehan kursi
    obj = Object.assign(obj, {
      perolehanKursi: perolehanKursi(
        urutanHasilPerhitungan,
        hasilPerhitungan[i][0]?.nama_parpol,
        jumlahKursi
      ),
    });

    // push obj ke variabel hasilAkhir
    hasilAkhir.push(obj);
  }

  // jumlah suara urutan terakhir
  let suaraUrutanTerakhir =
    urutanHasilPerhitungan[jumlahKursi - 1]?.hasilSainteLague;

  // total suara sah

  const totalSuaraSah = arr.reduce((prev, curr) => {
    return prev + curr.total_suara_sah;
  }, 0);

  let ambangBatasSuara = totalSuaraSah * (4 / 100);

  return {
    hasilAkhir,
    suaraUrutanTerakhir,
    totalSuaraSah,
    ambangBatasSuara,
    urutanHasilPerhitungan,
  };
}

export default sainteLague;
