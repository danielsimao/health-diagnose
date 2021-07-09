import Head from "next/head";
import { useUser } from "../lib/hooks";

interface ContainerProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function Container({
  className,
  children,
  title = "Health Review",
  description,
}: ContainerProps) {
  const user = useUser();

  return (
    <div className={`page-wrap ${className}`}>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
      </Head>
      <div className="page-header bg-white">
        <a href="#">
          <span className="sr-only">Workflow</span>
          <img
            className="h-8 w-auto sm:h-10"
            src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
          />
        </a>
        {user && (
          <div>
            <span>Logged in as: {user.name}</span> |
            <a href="/api/logout">Log Out</a>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
