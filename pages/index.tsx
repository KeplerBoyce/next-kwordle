import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Kwordle</title>
        <meta name="description" content="Online 1v1 Wordle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1 className="text-3xl text-red-500 text-center">
          Tailwind test
        </h1>
      </main>
    </>
  )
}
