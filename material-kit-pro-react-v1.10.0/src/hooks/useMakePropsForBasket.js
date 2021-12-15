import { useMutation } from "@apollo/client";
import { DELETE_BASKET } from "graphql/mutation";
import { UPSERT_BASKET } from "graphql/mutation";
import { BASKETS } from "graphql/query";
import { useBasketQuery } from "hooks";
import { useState } from "react";

export default function useMakePropsForBasket() {
  const products = useBasketQuery();

  // modal 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteBasketId, setDeleteBasketId] = useState(null);
  const openModal = (basketId) => {
    setIsModalOpen(true);
    setDeleteBasketId(basketId);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteBasketId(null);
  };

  // 수량 조절 버튼 관련
  const [upsertBasket] = useMutation(UPSERT_BASKET);
  const onClickUpButton = ({ productOptionRelationId, quantity }) =>
    upsertBasket({
      variables: {
        upsertBasketInput: {
          productOptionRelationId,
          quantity: quantity + 1,
        },
      },
    });
  const onClickDownButton = ({ productOptionRelationId, quantity, basketId }) =>
    quantity > 1
      ? upsertBasket({
          variables: {
            upsertBasketInput: {
              productOptionRelationId,
              quantity: quantity - 1,
            },
          },
          // refetch 안해도 왜 반영이 돼죠...?
        })
      : openModal(basketId);
  const quantityControlButtonsProps = {
    onClickUpButton,
    onClickDownButton,
  };

  // 장바구니 상품 제거 모달 관련
  const [deleteBasket] = useMutation(DELETE_BASKET);
  const yesNoButtonsProps = {
    onClickYesButton: () =>
      deleteBasketId &&
      deleteBasket({
        variables: {
          deleteBasketId,
        },
        refetchQueries: [BASKETS],
      })
        .then(() => closeModal())
        .catch((error) => alert(error.message)),
    onClickNoButton: closeModal,
  };
  const deleteBasketModalProps = {
    open: isModalOpen,
    onClose: closeModal,
    yesNoButtonsProps,
  };

  return {
    products,
    quantityControlButtonsProps,
    deleteBasketModalProps,
    onClickRemoveProductButton: openModal,
  };
}
