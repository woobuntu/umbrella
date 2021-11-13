import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { isAuthLoadingVar } from "graphql/state";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";
import { SIGN_IN } from "graphql/mutation";

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

      signIn({
        variables: {
          signInInput: {
            platform,
            code: code || "",
            state: code || "",
          },
        },
      }).then(() => {
        history.push("/");
        client.resetStore();
      });
    }
  }, [search]);
}
