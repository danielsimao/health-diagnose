import { useState } from "react";
import Form from "./Form";

export default function SingUp({
  onClickChangeMethod,
}: {
  onClickChangeMethod: () => void;
}) {
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      name: e.currentTarget._name.value,
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        onClickChangeMethod();
      } else {
        const error = await res.text();
        setErrorMsg(error);
        throw new Error(error);
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
    }
  }

  return (
    <Form
      errorMessage={errorMsg}
      onClickChangeMethod={onClickChangeMethod}
      onSubmit={handleSubmit}
    />
  );
}
