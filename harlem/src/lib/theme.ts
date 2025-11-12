export const PALETTE = {
  pink: "#FBD3E9",
  white: "#FFF6F1",
  blue:  "#CDE8F6",
  mint:  "#D9F6EC",
  brown: "#6A4631",
};

export const FONT_STACK = {
  display:
    "'Lemon Milk Light','Quicksand',ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial",
  body:
    "'Quicksand',ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial",
};

export const clp = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);
