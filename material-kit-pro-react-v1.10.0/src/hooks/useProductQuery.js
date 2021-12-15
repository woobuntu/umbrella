import { useQuery } from "@apollo/client";
import { PRODUCT } from "graphql/query";
import { useParams } from "react-router";

export default function useProduct() {
  const { id } = useParams();
  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(PRODUCT, {
    variables: { productId: Number(id) },
  });

  return {
    productLoading,
    productError,
    productData,
  };
}
