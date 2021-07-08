import Head from "next/head";

interface ContainerProps {
  children?: JSX.Element[];
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
  return (
    <div className={`page-wrap ${className}`}>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        {/* <meta property="og:url" content={`https://leerob.io${router.asPath}`} />
      <link rel="canonical" href={`https://leerob.io${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Lee Robinson" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@leeerob" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      {meta.date && (
        <meta property="article:published_time" content={meta.date} />
      )} */}
      </Head>
      {children}
    </div>
  );
}
