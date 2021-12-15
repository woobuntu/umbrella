import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { isAuthLoadingVar } from "graphql/state";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";
import { SIGN_IN } from "graphql/mutation";
import {
  getSessionItem,
  removeSessionItem,
} from "customs/utils/session-storage";

export default function useSignIn() {
  let { search } = useLocation();
  let history = useHistory();

  const [signIn, { loading, error, client }] = useMutation(SIGN_IN);

  useEffect(() => {
    isAuthLoadingVar(loading);
  }, [loading]);

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  useEffect(() => {
    if (search) {
      const { platform, code, state } = queryString.parse(search);

      const signInInput = {
        platform,
        code: code || "",
        state: state || "",
      };

      const sessionBasket = getSessionItem("basket");

      if (sessionBasket) {
        const { productOptionRelationId, quantity } = sessionBasket;
        signInInput.basketInfo = {
          productOptionRelationId,
          quantity,
        };
      }

      signIn({
        variables: {
          signInInput,
        },
      }).then(
        ({
          data: {
            signIn: { redirectUrl },
          },
        }) => {
          history.push(redirectUrl);
          removeSessionItem("basket");
          client.resetStore();
        }
      );
    }
  }, [search]);
}
