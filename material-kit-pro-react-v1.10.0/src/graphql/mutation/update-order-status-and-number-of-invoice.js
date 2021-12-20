import { gql } from "@apollo/client";

const UPDATE_ORDER_STATUS_AND_NUMBER_OF_INVOICE = gql`
  mutation Mutation(
    $updateNumberOfInvoiceInput: UpdateNumberOfInvoiceInput!
    $updatePaymentInput: UpdatePaymentInput!
  ) {
    updateNumberOfInvoice(
      updateNumberOfInvoiceInput: $updateNumberOfInvoiceInput
    ) {
      numberOfInvoice
    }
    updateOrderStatus(updatePaymentInput: $updatePaymentInput) {
      id
    }
  }
`;

export default UPDATE_ORDER_STATUS_AND_NUMBER_OF_INVOICE;
