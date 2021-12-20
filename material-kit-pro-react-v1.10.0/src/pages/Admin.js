import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BaseParallax from "atoms/Parallax/BaseParallax";
import { CentralWhitePage } from "atoms/Container";
import usePaymentsQuery from "hooks/usePaymentsQuery";
import PurchaseHistory from "organisms/PurchaseHistory";
import { Profile } from "templates";
import UpdateOrderStatusModal from "organisms/UpdateOrderStatusModal";
import { useMutation } from "@apollo/client";
import { UPDATE_ORDER_STATUS } from "graphql/mutation";
import { PAYMENTS } from "graphql/query";
import { UPDATE_ORDER_STATUS_AND_NUMBER_OF_INVOICE } from "graphql/mutation";

export default function Admin() {
  const payments = usePaymentsQuery();

  const [detailPurchaseId, setDetailPurchaseId] = useState(null);
  const paymentsToBeShown = detailPurchaseId
    ? payments.filter(({ id }) => id == detailPurchaseId)
    : payments;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [targetStatus, setTargetStatus] = useState();
  const [targetPaymentId, setTargetPaymentId] = useState();
  const [numberOfInvoice, setNumberOfInvoice] = useState();

  const onChangeOrderStatus = ({ orderStatus, paymentId }) => {
    openModal();
    setTargetStatus(orderStatus);
    setTargetPaymentId(paymentId);
  };

  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);
  const [updateOrderStatusAndNumberOfInvoice] = useMutation(
    UPDATE_ORDER_STATUS_AND_NUMBER_OF_INVOICE
  );

  return (
    <Profile>
      {paymentsToBeShown.map((payment) => (
        <PurchaseHistory
          key={payment.id}
          payment={payment}
          setDetailPurchaseId={setDetailPurchaseId}
          onChangeOrderStatus={onChangeOrderStatus}
        />
      ))}
      <UpdateOrderStatusModal
        open={isModalOpen}
        onClose={closeModal}
        targetStatus={targetStatus}
        inputProps={{
          value: numberOfInvoice,
          onChange: (e) => setNumberOfInvoice(e.target.value),
          error: numberOfInvoice ? false : true,
        }}
        yesNoButtonsProps={{
          onClickYesButton: () => {
            targetStatus === "배송시작"
              ? updateOrderStatusAndNumberOfInvoice({
                  variables: {
                    updateNumberOfInvoiceInput: {
                      numberOfInvoice,
                      paymentId: targetPaymentId,
                    },
                    updatePaymentInput: {
                      orderStatus: targetStatus,
                      paymentId: targetPaymentId,
                    },
                  },
                }).then(closeModal)
              : updateOrderStatus({
                  variables: {
                    updatePaymentInput: {
                      orderStatus: targetStatus,
                      paymentId: targetPaymentId,
                    },
                  },
                  refetchQueries: [PAYMENTS],
                }).then(closeModal);
          },
          onClickNoButton: closeModal,
        }}
      />
    </Profile>
  );
}
