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
