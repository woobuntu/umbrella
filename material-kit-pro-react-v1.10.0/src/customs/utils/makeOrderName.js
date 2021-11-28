export default function makeOrderName(basketData) {
  const basketNames = (basketData ? basketData : []).map(
    ({ catalogOptionRelation: { catalog, option } }) => ({
      catalogName: catalog.name,
      optionName: option.name,
    })
  );

  let orderName = "";
  if (basketNames.length === 1) {
    const [{ catalogName, optionName }] = basketNames;
    orderName = `${catalogName}(${optionName})`;
  } else if (basketNames.length > 1) {
    const [{ catalogName, optionName }] = basketNames;
    orderName = `${catalogName}(${optionName}) 포함 ${basketNames.length}건`;
  }

  return orderName;
}
