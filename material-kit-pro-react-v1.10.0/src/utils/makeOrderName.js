export default function makeOrderName(products) {
  if (products.length === 0) return "";
  const [{ productName, optionName }] = products;

  if (products.length === 1) return `${productName}(${optionName})`;
  return `${productName}(${optionName}) 포함 ${products.length}건`;
}
