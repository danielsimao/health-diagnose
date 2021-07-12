import { useRouter } from "next/router";
import { useState } from "react";
import Form from "./Form";

export default function Login({
  onClickChangeMethod,
}: {
  onClickChangeMethod: () => void;
  onLogin: () => void;
}) {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        router.push("/cases");
      } else {
        const error = await res.text();
        setErrorMsg(error);
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
    }
  }

  return (
    <Form
      isLogin
      onClickChangeMethod={onClickChangeMethod}
      onSubmit={handleSubmit}
      errorMessage={errorMsg}
    />
  );
}
