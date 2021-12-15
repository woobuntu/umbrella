import { gql } from "@apollo/client";

const PRODUCTS = gql`
  query Query($filterProductsInput: FilterProductsInput) {
    products(filterProductsInput: $filterProductsInput) {
      id
      name
      price
      productFileRelations {
        id
        file {
          id
          name
          path
          type
        }
      }
      productOptionRelations {
        id
        option {
          id
          name
        }
      }
    }
  }
`;

export default PRODUCTS;
