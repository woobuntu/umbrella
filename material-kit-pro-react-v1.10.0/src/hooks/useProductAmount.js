import { useState } from "react";

export default function useProductAmount() {
  const [amount, setAmount] = useState(1);
  const setProductAmount = ({ currentTarget: { name } }) => {
    switch (name) {
      case "add":
        setAmount(amount + 1);
        break;
      case "remove":
        if (amount > 1) setAmount(amount - 1);
        break;
      default:
        alert("수량을 늘리거나 줄일 수만 있습니다!");
    }
  };

  return { productAmount: amount, setProductAmount };
}
