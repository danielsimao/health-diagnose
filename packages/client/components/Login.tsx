import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../lib/hooks";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ password: "", username: "" });
  const [errors, setErrors] = useState({ password: false, username: false });
  useUser({ redirectTo: "/cases", redirectIfFound: true });

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!form.password || !form.username) {
      setErrors({ password: !form.password, username: !form.username });
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 200) {
        router.push("/cases");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
    }
  }

  return (
    <form id="login" onSubmit={handleSubmit} className="h-full bg-white">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          required
          onChange={(e) => {
            setErrors((s) => ({ ...s, username: false }));
            setForm((s) => ({ ...s, username: e.target.value }));
          }}
          name="username"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
            errors.username ? "border-red-500" : ""
          }`}
          id="username"
          type="text"
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500 text-xs italic">Please fill username</p>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          required
          onChange={(e) => {
            setErrors((s) => ({ ...s, password: false }));
            setForm((s) => ({ ...s, password: e.target.value }));
          }}
          name="password"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
            errors.password ? "border-red-500" : ""
          }`}
          id="password"
          type="password"
          placeholder="******************"
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">Please fill password.</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
