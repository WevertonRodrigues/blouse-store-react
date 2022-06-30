import numeral from "numeral";
require("numeral/locales/pt-br");

if (numeral.locale() !== "pt-br") {
  numeral.locale("pt-br");
}

export default function useNumeral() {
  return {
    currency,
  };
}

function currency(number: number | string) {
  return `R$ ${numeral(number).format("0,0.00")}`;
}
