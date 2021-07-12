import Head from "next/head";
import { useUser } from "../lib/hooks";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/router";
import UserPopover from "./UserPopover";

interface ContainerProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  onSignIn?: () => void;
  onSignUp?: () => void;
}

export default function Container({
  className,
  children,
  title = "Health Diagnose",
  description,
  onSignIn,
  onSignUp,
}: ContainerProps) {
  const user = useUser();
  const router = useRouter();

  return (
    <div className={`page-wrap ${className}`}>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
      </Head>
      <div className="page-header bg-white">
        <div className="flex flex-row justify-between items-center">
          <Image
            onClick={() => router.push("/")}
            alt="logo"
            width={40}
            height={40}
            layout="fixed"
            className="h-8 w-auto sm:h-10 cursor-pointer"
            src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
          />
          {user && router.pathname === "/cases" && <UserPopover />}
          {router.pathname === "/" && (
            <div className="flex flex-row gap-2">
              <Button onClick={onSignIn} variant="ghost">
                Sign in
              </Button>
              <Button onClick={onSignUp} variant="primary">
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
