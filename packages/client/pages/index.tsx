import { useTheme } from "@material-ui/core/styles";
import { useState } from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import Dialog from "../components/Dialog";
import Login from "../components/Login";
import SingUp from "../components/SignUp";
import { useUser } from "../lib/hooks";

export default function Home() {
  const [method, setMethod] = useState<"login" | "signup">();
  const [isOpen, setIsOpen] = useState(false);
  useUser({ redirectTo: "/cases", redirectIfFound: true });

  function handleSignIn() {
    setMethod("login");
    setIsOpen(true);
  }

  function handleSignUp() {
    setMethod("signup");
    setIsOpen(true);
  }

  return (
    <Container
      onSignIn={handleSignIn}
      onSignUp={handleSignUp}
      className="relative"
    >
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {method === "login" && (
          <Login
            onLogin={() => setIsOpen(false)}
            onClickChangeMethod={handleSignUp}
          />
        )}
        {method === "signup" && <SingUp onClickChangeMethod={handleSignIn} />}
      </Dialog>

      <div className="pattern h-80 w-56 absolute top-20 right-10 hidden md:block" />
      <div className="pattern h-56 w-56 absolute top-80 left-10 hidden md:block" />
      <div className="page-main z-10 mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Diagnose. Submit.</span>{" "}
          <span className="block text-blue-500 xl:inline">Contribute.</span>
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
          As technology becomes more advance, we must apply these advantages in
          our health systems. Your knowledge is the key for a prosper and more
          advanced future.
        </p>
        <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:justify-center gap-4">
          <Button
            onClick={handleSignIn}
            className="px-10 py-4 text-base font-medium w-full md:w-auto"
            variant="primary"
          >
            Get started
          </Button>
          <Button
            onClick={() => window?.open("http://gyant.com")}
            className="px-10 py-4 text-base font-medium w-full md:w-auto bg-blue-100"
            variant="ghost"
          >
            Contact us
          </Button>
        </div>

        <div className="mx-24 mt-24 sm:mt-40 flex flex-col sm:mx-16 sm:flex-row justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <p className="text-base sm:text-lg text-gray-800">
              Review and diagnose our medical cases
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <p className="text-base sm:text-lg text-gray-800">
              Submit your diagnoses along with thousands of other professionals
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-base sm:text-lg text-gray-800">
              Contribute for a better and prosper future
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
