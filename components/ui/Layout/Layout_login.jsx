import Head from 'next/head';
export default function LayoutLogin({ pageTitle, children }) {

  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{pageTitle}</title>
      </Head>
      <main>{children}</main>
    </div>
  );
}