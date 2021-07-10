import Head from "next/head";
import { useUser } from "../lib/hooks";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/router";

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
  title = "Health Review",
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
            className="h-8 w-auto sm:h-10"
            src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
          />
          {user && (
            <div className="flex flex-row items-center gap-2">
              <div className="text-gray-800 border-r border-gray pr-6">
                Welcome <span className="font-semibold">{user.name}</span>
              </div>
              <Link passHref href="/api/logout">
                <span>
                  <Button variant="ghost">Log Out</Button>
                </span>
              </Link>
            </div>
          )}
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
