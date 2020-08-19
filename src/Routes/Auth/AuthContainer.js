import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const inputs = {
    username: useInput(""),
    firstName: useInput(""),
    lastName: useInput(""),
    secret: useInput(""),
    email: useInput(""),
  };
  const { username, firstName, lastName, email, secret } = inputs;
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value },
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret },
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("존재하지 않는 계정입니다. 회원가입을 부탁드려요:)");
            setTimeout(() => setAction("signUp"), 3000);
          } else {
            toast.success("비밀키를 확인 후 입력해주세요");
            setAction("confirm");
          }
        } catch (e) {
          console.log(e);
          toast.error("비밀키를 받을 수 없습니다.");
        }
      } else {
        toast.error("이메일을 입력해주세요.");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("Can't create account");
          } else {
            toast.success("회원가입 완료! 바로 로그인하세요!");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          const message = e.message.substr(14);
          toast.error(message);
        }
      } else {
        toast.error("모든 항목을 채워주세요.");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token },
          } = await confirmSecretMutation();
          if (token !== "" || token !== undefined) {
            localLogInMutation({ variables: { token } });
          }
        } catch {}
      } else {
        toast.error("비밀키를 입력해주세요");
      }
    }
  };
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);
  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      inputs={inputs}
      onSubmit={onSubmit}
    />
  );
};
