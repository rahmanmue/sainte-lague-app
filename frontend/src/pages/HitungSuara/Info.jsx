import { rounded } from "../../utils";
import Accordion from "react-bootstrap/Accordion";

function Info({
  peringkatSuaraPartai,
  jumlahKursi,
  ambangBatasSuara,
  totalSuaraSah,
}) {
  console.log(peringkatSuaraPartai);
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Penjelasan</Accordion.Header>
          <Accordion.Body>
            <small className="text-center">
              Pada dapil ini jumlah alokasi kursi sebanyak {jumlahKursi} kursi
              maka dicari hasil suara terbanyak dengan {jumlahKursi} peringkat
              teratas hasil perhitungan sainte lague adapun ketentuan lain suara
              tersebut harus melebihi dari ambang batas 4% dari total seluruh
              suara sah partai, dimana pada dapil ini total suara sah seluruh
              partai sebanyak
              {` ${totalSuaraSah}`}, dan ambang batas dari 4% total suara sah
              tersebut adalah{` ${ambangBatasSuara}`}. Maka dengan sainte lague
              perolehan kursi dapat dihitung dengan rumus perhitungan (Suara Sah
              Partai / 2n + 1), Untuk 2n+1 sebagai pembagi akan selalu
              menghasilkan nilai ganjil seperti 1,3,5,7,..
            </small>

            <div className="my-4 d-flex justify-content-center">
              <table>
                <thead>
                  <tr>
                    <th colSpan={2} className="ps-2">
                      Partai
                    </th>
                    <th className="text-center">Suara Sah</th>
                    <th className="text-center px-3">Pembagi</th>
                    <th colSpan={2} className="text-center">
                      Hasil
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {peringkatSuaraPartai?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>| {item?.nama_parpol}</td>
                        <td className="px-3">|</td>
                        <td className="text-center"> {item?.suaraSah} </td>
                        <td className="text-center">
                          {item?.bagi?.map((x) =>
                            rounded(item.suaraSah / x) == item.hasilSainteLague
                              ? `/ ${x} `
                              : ""
                          )}
                        </td>
                        <td className="fw-bold">{item?.hasilSainteLague}</td>
                        <td className="px-2">|</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <small className="text-center">
              Maka dari itu diperoleh hasil perhitungan sainte lague diatas
              dengan hasil {jumlahKursi} peringkat teratas perolehan suara,
              partai yang mendapatkan hasil tertinggi akan mendapatkan kursi
              pertama diikuti oleh partai dengan hasil kedua tertinggi dan
              seterusnya, jika terdapat sisa suara setelah pembagian kursi maka
              suara tersebut dapat dihitung kembali dengan pembagi selanjutnya,
              partai dengan hasil tertinggi dalam perhitungan ini akan
              mendapatkan kursi tambahan
            </small>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default Info;
