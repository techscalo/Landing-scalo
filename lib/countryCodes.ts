export const COUNTRY_CODES = [
  { code: "+54", iso: "ar", name: "Argentina" },
  { code: "+34", iso: "es", name: "España" },
  { code: "+52", iso: "mx", name: "México" },
  { code: "+57", iso: "co", name: "Colombia" },
  { code: "+56", iso: "cl", name: "Chile" },
  { code: "+51", iso: "pe", name: "Perú" },
  { code: "+598", iso: "uy", name: "Uruguay" },
  { code: "+1", iso: "us", name: "EE.UU / Canadá" },
] as const;

export const DEFAULT_COUNTRY_CODE = "+54";

// Numero local: solo digitos/espacios/guiones, 6 a 14 caracteres. Sin el
// codigo de pais (eso lo pone el selector aparte).
export const PHONE_PATTERN = "^[0-9\\s-]{6,14}$";
export const PHONE_TITLE =
  "Ingresá solo el número, sin el 0 ni el 15 (ej: 11 2345 6789)";
