import bcrypt from "bcryptjs-react";

export function rounded(x) {
  return (Math.round(x * 100) / 100).toFixed(0);
}

export function formatAngka(number) {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
  }).format(number);
}

export function styleWarna(x, ambangBatasSuara, suaraUrutanTerakhir) {
  if (x >= suaraUrutanTerakhir) {
    return "text-dark fw-bold";
  } else if (x < suaraUrutanTerakhir && x > ambangBatasSuara) {
    return "text-warning";
  } else if (x < ambangBatasSuara) {
    return "text-secondary";
  }
}

export const hashStr = (str) => {
  const hash = bcrypt.hashSync(str, 8);
  return hash;
};

export const isRole = (hashRole) => {
  const roles = ["user", "admin"];
  if (!hashRole) {
    return false;
  } else {
    for (let role of roles) {
      if (bcrypt.compareSync(role, hashRole)) {
        return role;
      }
    }
  }
};

export const PROVINSI = [
  {
    id: "11",
    value: "ACEH",
  },
  {
    id: "12",
    value: "SUMATERA UTARA",
  },
  {
    id: "13",
    value: "SUMATERA BARAT",
  },
  {
    id: "14",
    value: "RIAU",
  },
  {
    id: "15",
    value: "JAMBI",
  },
  {
    id: "16",
    value: "SUMATERA SELATAN",
  },
  {
    id: "17",
    value: "BENGKULU",
  },
  {
    id: "18",
    value: "LAMPUNG",
  },
  {
    id: "19",
    value: "KEPULAUAN BANGKA BELITUNG",
  },
  {
    id: "21",
    value: "KEPULAUAN RIAU",
  },
  {
    id: "31",
    value: "DKI JAKARTA",
  },
  {
    id: "32",
    value: "JAWA BARAT",
  },
  {
    id: "33",
    value: "JAWA TENGAH",
  },
  {
    id: "34",
    value: "DAERAH ISTIMEWA YOGYAKARTA",
  },
  {
    id: "35",
    value: "JAWA TIMUR",
  },
  {
    id: "36",
    value: "BANTEN",
  },
  {
    id: "51",
    value: "BALI",
  },
  {
    id: "52",
    value: "NUSA TENGGARA BARAT",
  },
  {
    id: "53",
    value: "NUSA TENGGARA TIMUR",
  },
  {
    id: "61",
    value: "KALIMANTAN BARAT",
  },
  {
    id: "62",
    value: "KALIMANTAN TENGAH",
  },
  {
    id: "63",
    value: "KALIMANTAN SELATAN",
  },
  {
    id: "64",
    value: "KALIMANTAN TIMUR",
  },
  {
    id: "65",
    value: "KALIMANTAN UTARA",
  },
  {
    id: "71",
    value: "SULAWESI UTARA",
  },
  {
    id: "72",
    value: "SULAWESI TENGAH",
  },
  {
    id: "73",
    value: "SULAWESI SELATAN",
  },
  {
    id: "74",
    value: "SULAWESI TENGGARA",
  },
  {
    id: "75",
    value: "GORONTALO",
  },
  {
    id: "76",
    value: "SULAWESI BARAT",
  },
  {
    id: "81",
    value: "MALUKU",
  },
  {
    id: "82",
    value: "MALUKU UTARA",
  },
  {
    id: "91",
    value: "PAPUA",
  },
  {
    id: "92",
    value: "PAPUA BARAT",
  },
  {
    id: "93",
    value: "PAPUA SELATAN",
  },
  {
    id: "94",
    value: "PAPUA TENGAH",
  },
  {
    id: "95",
    value: "PAPUA PEGUNUNGAN",
  },
];

export const getAllYears = () => {
  let currentYear = new Date().getFullYear();
  let earliestYear = 1970;
  const year = [];

  while (currentYear > earliestYear) {
    let yearOption = { value: currentYear };
    year.push(yearOption);
    currentYear -= 1;
  }

  return year;
};
