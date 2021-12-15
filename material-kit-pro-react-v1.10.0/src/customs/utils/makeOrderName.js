export default function makeOrderName(basketData) {
  const basketNames = (basketData ? basketData : []).map(
    ({ productOptionRelation: { product, option } }) => ({
      productName: product.name,
      optionName: option.name,
    })
  );

  let orderName = "";
  if (basketNames.length === 1) {
    const [{ productName, optionName }] = basketNames;
    orderName = `${productName}(${optionName})`;
  } else if (basketNames.length > 1) {
    const [{ productName, optionName }] = basketNames;
    orderName = `${productName}(${optionName}) 포함 ${basketNames.length}건`;
  }

  return orderName;
}
