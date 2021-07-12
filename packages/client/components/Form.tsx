import { DOMAttributes } from "react";
import Button from "./Button";

export default function Form({
  isLogin,
  onSubmit,
  onClickChangeMethod,
  errorMessage,
}: {
  isLogin?: boolean;
  onSubmit: DOMAttributes<HTMLFormElement>["onSubmit"];
  onClickChangeMethod: () => void;
  errorMessage: string;
}) {
  return (
    <form id="login" onSubmit={onSubmit} className="h-full bg-white">
      <div
        style={{ zIndex: isLogin ? -1 : undefined }}
        className={`mb-4 ${isLogin ? "fixed" : ""}`}
      >
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="_name"
        >
          Name
        </label>
        <input
          defaultValue=""
          required={!isLogin}
          name="_name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="_name"
          type="text"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          defaultValue=""
          required
          name="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="email"
        />
      </div>
      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          defaultValue=""
          required
          name="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
        />
      </div>
      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}

      <div className="flex items-center justify-between">
        <Button
          variant="primary"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </Button>
        <Button type="button" onClick={onClickChangeMethod} variant="ghost">
          {isLogin ? "I don't have an account" : "I have an account"}
        </Button>
      </div>
    </form>
  );
}
