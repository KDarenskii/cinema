const formatter = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0, maximumSignificantDigits: 3 });
export default formatter.format;