import sainteLague from "../../saintelague/sainteLague";
import { formatAngka, styleWarna } from "../../utils";
import Info from "./Info";

function Result({ dataSuara, alokasiKursi }) {
  const {
    hasilAkhir,
    suaraUrutanTerakhir,
    totalSuaraSah,
    ambangBatasSuara,
    urutanHasilPerhitungan,
  } = sainteLague(dataSuara, alokasiKursi);

  const peringkatSuaraPartai = urutanHasilPerhitungan.filter(
    (item, i) => i < alokasiKursi
  );

  return (
    <>
      <div className="table-responsive">
        <table className="table  table-hover table-bordered">
          <thead>
            <tr>
              <th className="ps-3 py-4" rowSpan={2}>
                Nama Partai
              </th>
              <th className="text-center py-4" rowSpan={2}>
                Suara Sah
              </th>
              <th colSpan={hasilAkhir[0]?.bagi?.length} className="text-center">
                Bilangan Pembagi
              </th>
              <th className="text-center py-4" rowSpan={2}>
                Perolehan Kursi
              </th>
            </tr>
            <tr>
              {hasilAkhir[0]?.bagi?.map((items, i) => (
                <td key={i} className="text-center">
                  /{items}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {hasilAkhir?.map((item, i) => (
              <tr key={i}>
                <td className="ps-3">{item?.nama_parpol}</td>
                <td className="text-center">{formatAngka(item?.suaraSah)}</td>
                {item?.bagi?.map((x, i) => (
                  <td
                    key={i}
                    className={`text-center ${styleWarna(
                      item[`hasilSainteLagueBagi${x}`],
                      ambangBatasSuara,
                      suaraUrutanTerakhir
                    )} `}
                  >
                    {formatAngka(item[`hasilSainteLagueBagi${x}`])}
                  </td>
                ))}
                <td
                  className={`text-center ${
                    item.perolehanKursi !== 0 ? "fw-bold" : "text-secondary"
                  }`}
                >
                  {item.perolehanKursi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex gap-3 justify-content-end">
        <div className="d-flex align-items-center gap-1 align-items-start">
          <div className="box bg-dark d-inline-block"></div>
          <span className="text-small">Memperoleh Kursi</span>
        </div>
        <div className="d-flex align-items-center gap-1 align-items-start">
          <div className="box bg-warning d-inline-block"></div>
          <span className="text-small">{`Diatas Ambang Batas Suara ( > ${ambangBatasSuara} ) Tapi Tidak Terpilih`}</span>
        </div>
        <div className="d-flex align-items-center gap-1 align-items-start">
          <div className="box bg-secondary d-inline-block"></div>
          <span className="text-small">
            Dibawah Ambang Batas Suara & Tidak Terpilih
          </span>
        </div>
      </div>
      <div className="my-5">
        <Info
          peringkatSuaraPartai={peringkatSuaraPartai}
          jumlahKursi={alokasiKursi}
          totalSuaraSah={totalSuaraSah}
          ambangBatasSuara={ambangBatasSuara}
        />
      </div>
    </>
  );
}

export default Result;
