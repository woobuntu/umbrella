export default function formPrice(price) {
  const stringPrice = price.toString();
  let converted = "";
  for (let i = stringPrice.length - 1; i >= 0; i--) {
    const nth = stringPrice.length - i;
    converted = stringPrice[i] + converted;
    if (nth % 3 == 0 && i !== 0) {
      converted = "," + converted;
    }
  }
  return converted;
}
